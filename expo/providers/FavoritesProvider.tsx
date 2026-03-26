import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

const FAVORITES_KEY = 'bayou_favorites';

export const [FavoritesProvider, useFavorites] = createContextHook(() => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('[FavoritesProvider] Loading favorites from storage...');
    void AsyncStorage.getItem(FAVORITES_KEY).then((stored) => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as string[];
          console.log('[FavoritesProvider] Loaded favorites:', parsed.length);
          setFavoriteIds(parsed);
        } catch {
          console.log('[FavoritesProvider] Failed to parse favorites');
        }
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((ids: string[]) => {
    console.log('[FavoritesProvider] Persisting favorites:', ids.length);
    void AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids)).catch(() => {
      console.log('[FavoritesProvider] Failed to persist favorites');
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      console.log('[FavoritesProvider] Toggled favorite:', id, 'Now:', next.length);
      persist(next);
      return next;
    });
  }, [persist]);

  const isFavorite = useCallback((id: string) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  return useMemo(() => ({ favoriteIds, toggleFavorite, isFavorite, loaded }), [favoriteIds, toggleFavorite, isFavorite, loaded]);
});
