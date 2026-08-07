import { useState, useCallback } from 'react';
import { arenaApi } from '../api/arena.api.js';

export function useArena() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

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
        const result = await arenaApi.invokeBattle(trimmed);
        setEntries((prev) =>
          prev.map((e) => (e.id === newEntry.id ? { ...e, data: result, isLoading: false } : e))
        );
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
    [isLoading]
  );

  const clearChat = useCallback(() => {
    setEntries([]);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    entries,
    isLoading,
    toast,
    submitPrompt,
    clearChat,
    dismissToast,
  };
}
