import { useState, useCallback, useEffect } from 'react';
import { arenaApi } from '../api/arena.api.js';

const STORAGE_KEY_ENTRIES = 'dualmind_arena_entries';
const STORAGE_KEY_ACTIVE_ID = 'dualmind_arena_active_id';

export function useArena() {
  const [entries, setEntries] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [toast, setToast] = useState(null);

  // Clear any leftover cache from previous version
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_ENTRIES);
      localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
    } catch {
      // ignore
    }
  }, []);

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

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const submitPrompt = useCallback(
    async (query) => {
      const trimmed = query?.trim();
      if (!trimmed || isLoading) return;

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

        if (result?.sessionId) {
          setActiveHistoryId(result.sessionId);
        }

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
          setEntries((prev) =>
            prev.map((e) => (e.id === newEntry.id ? { ...e, data: result, isLoading: false } : e))
          );
        }

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

  const selectHistoryItem = useCallback((item) => {
    if (!item) return;
    setActiveHistoryId(item._id);

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

  const deleteHistoryItem = useCallback(
    async (id, e) => {
      if (e) e.stopPropagation();
      try {
        await arenaApi.deleteHistory(id);
        setHistory((prev) => prev.filter((item) => item._id !== id));

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

  const clearChat = useCallback(() => {
    setEntries([]);
    setActiveHistoryId(null);
  }, []);

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
