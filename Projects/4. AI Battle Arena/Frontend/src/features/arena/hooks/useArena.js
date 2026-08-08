import { useState, useCallback, useEffect } from 'react';
import { arenaApi } from '../api/arena.api.js';

// Keys for caching current session in local storage
const STORAGE_KEY_ENTRIES = 'dualmind_arena_entries';
const STORAGE_KEY_ACTIVE_ID = 'dualmind_arena_active_id';

export function useArena() {
  // Restore current chat turns from local storage on reload
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENTRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // History list displayed in sidebar
  const [history, setHistory] = useState([]);

  // Restore active chat session ID from local storage
  const [activeHistoryId, setActiveHistoryId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ACTIVE_ID) || null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [toast, setToast] = useState(null);

  // Keep chat feed saved in local storage (stripping out temporary loading flags)
  useEffect(() => {
    try {
      if (entries && entries.length > 0) {
        const cleaned = entries.map((e) => ({ ...e, isLoading: false }));
        localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(cleaned));
      } else {
        localStorage.removeItem(STORAGE_KEY_ENTRIES);
      }
    } catch (err) {
      console.warn('localStorage error on saving entries:', err);
    }
  }, [entries]);

  // Keep active session ID saved in local storage
  useEffect(() => {
    try {
      if (activeHistoryId) {
        localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeHistoryId);
      } else {
        localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
      }
    } catch (err) {
      console.warn('localStorage error on saving activeHistoryId:', err);
    }
  }, [activeHistoryId]);

  // Fetch past sessions from MongoDB
  const fetchHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const items = await arenaApi.getHistory();
      setHistory(items || []);
    } catch (err) {
      console.warn('[useArena.fetchHistory]:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Fetch history on initial page load
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Submit a new question (sends activeHistoryId so backend appends turn to current chat)
  const submitPrompt = useCallback(
    async (query) => {
      const trimmed = query?.trim();
      if (!trimmed || isLoading) return;

      // Add optimistic pending entry to feed
      const newEntry = {
        id: Date.now(),
        prompt: trimmed,
        data: null,
        isLoading: true,
      };

      setEntries((prev) => [...prev, newEntry]);
      setIsLoading(true);

      try {
        const result = await arenaApi.invokeBattle(trimmed, activeHistoryId);

        // Store session ID returned from backend
        if (result?.sessionId) {
          setActiveHistoryId(result.sessionId);
        }

        // If backend returned full updated turns list, display all turns
        if (result?.entries && Array.isArray(result.entries) && result.entries.length > 0) {
          const updatedEntries = result.entries.map((turn, index) => ({
            id: turn._id || turn.id || index + 1,
            prompt: turn.prompt,
            data: {
              solution_1: turn.solution_1,
              solution_2: turn.solution_2,
              judge: turn.judge,
            },
            isLoading: false,
          }));
          setEntries(updatedEntries);
        } else {
          // Fallback: replace loading state with result
          setEntries((prev) =>
            prev.map((e) => (e.id === newEntry.id ? { ...e, data: result, isLoading: false } : e))
          );
        }

        // Refresh sidebar history list
        fetchHistory();
      } catch (err) {
        console.error('[useArena Error]:', err);
        setEntries((prev) =>
          prev.map((e) => (e.id === newEntry.id ? { ...e, isLoading: false } : e))
        );
        setToast('Something went wrong connecting to the backend. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, activeHistoryId, fetchHistory]
  );

  // Load a session from the sidebar into main chat view
  const selectHistoryItem = useCallback((item) => {
    if (!item) return;
    setActiveHistoryId(item._id);

    // Populate all turn exchanges in the session
    if (item.entries && Array.isArray(item.entries) && item.entries.length > 0) {
      setEntries(
        item.entries.map((turn, idx) => ({
          id: turn._id || turn.id || `${item._id}_${idx}`,
          prompt: turn.prompt,
          data: {
            solution_1: turn.solution_1,
            solution_2: turn.solution_2,
            judge: turn.judge,
          },
          isLoading: false,
        }))
      );
    } else {
      // Fallback for single-turn legacy history items
      setEntries([
        {
          id: item._id,
          prompt: item.prompt,
          data: {
            solution_1: item.solution_1,
            solution_2: item.solution_2,
            judge: item.judge,
          },
          isLoading: false,
        },
      ]);
    }
  }, []);

  // Delete session from sidebar
  const deleteHistoryItem = useCallback(
    async (id, e) => {
      if (e) e.stopPropagation();
      try {
        await arenaApi.deleteHistory(id);
        setHistory((prev) => prev.filter((item) => item._id !== id));

        // If currently viewing deleted session, clear main chat view
        if (activeHistoryId === id) {
          setEntries([]);
          setActiveHistoryId(null);
        }
      } catch (err) {
        console.error('[useArena.deleteHistoryItem Error]:', err);
        setToast('Failed to delete history item');
      }
    },
    [activeHistoryId]
  );

  // Start a fresh chat session
  const clearChat = useCallback(() => {
    setEntries([]);
    setActiveHistoryId(null);
    try {
      localStorage.removeItem(STORAGE_KEY_ENTRIES);
      localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
    } catch {}
  }, []);

  // Dismiss toast banner
  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    entries,
    history,
    activeHistoryId,
    isLoading,
    isLoadingHistory,
    toast,
    submitPrompt,
    selectHistoryItem,
    deleteHistoryItem,
    clearChat,
    dismissToast,
    refreshHistory: fetchHistory,
  };
}
