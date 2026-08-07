import { useState, useCallback, useEffect } from 'react';
import { arenaApi } from '../api/arena.api.js';

export function useArena() {
  const [entries, setEntries] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [toast, setToast] = useState(null);

  // Load history from MongoDB
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

  // Fetch history on initial mount
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
      setActiveHistoryId(null);

      try {
        const result = await arenaApi.invokeBattle(trimmed);
        setEntries((prev) =>
          prev.map((e) => (e.id === newEntry.id ? { ...e, data: result, isLoading: false } : e))
        );
        // Refresh history list so the new battle appears in the sidebar
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
    [isLoading, fetchHistory]
  );

  // Load a past comparison session from history into the main arena feed
  const selectHistoryItem = useCallback((item) => {
    if (!item) return;
    setActiveHistoryId(item._id);
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
  }, []);

  // Delete a history item
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
