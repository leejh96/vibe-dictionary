import type { MessageKey } from '../i18n/messages';
import { useCallback, useEffect, useState, type SetStateAction } from 'react';
import { TECHNIQUES, type TechniqueItem } from '@vibe-dictionary/catalog';

export const PROMPT_CART_STORAGE_KEY = 'vibe-dictionary-prompt-cart';
const STORAGE_ERROR = 'composer.storageError' satisfies MessageKey;

interface PromptCartState {
  cart: TechniqueItem[];
  contextNote: string;
}

function loadPromptCart(): PromptCartState {
  try {
    const raw = localStorage.getItem(PROMPT_CART_STORAGE_KEY);
    if (raw === null) return { cart: [], contextNote: '' };
    const saved: unknown = JSON.parse(raw);
    if (
      !saved || typeof saved !== 'object' ||
      !('cartIds' in saved) || !Array.isArray(saved.cartIds) ||
      !saved.cartIds.every((id: unknown) => typeof id === 'string') ||
      !('contextNote' in saved) || typeof saved.contextNote !== 'string'
    ) {
      return { cart: [], contextNote: '' };
    }

    const itemsById = new Map(TECHNIQUES.map((item) => [item.id, item]));
    const cart = [...new Set<string>(saved.cartIds)]
      .map((id) => itemsById.get(id))
      .filter((item): item is TechniqueItem => item !== undefined);
    return { cart, contextNote: saved.contextNote };
  } catch {
    return { cart: [], contextNote: '' };
  }
}

export function usePromptCart() {
  const [state, setState] = useState(loadPromptCart);
  const [storageError, setStorageError] = useState<typeof STORAGE_ERROR | null>(null);
  const { cart, contextNote } = state;

  useEffect(() => {
    try {
      localStorage.setItem(PROMPT_CART_STORAGE_KEY, JSON.stringify({
        cartIds: cart.map((item) => item.id),
        contextNote,
      }));
      setStorageError(null);
    } catch {
      setStorageError(STORAGE_ERROR);
    }
  }, [cart, contextNote]);

  const setCart = useCallback((update: SetStateAction<TechniqueItem[]>) => {
    setState((prev) => ({
      ...prev,
      cart: typeof update === 'function' ? update(prev.cart) : update,
    }));
  }, []);

  const setContextNote = useCallback((note: string) => {
    setState((prev) => ({ ...prev, contextNote: note }));
  }, []);

  return { cart, contextNote, setCart, setContextNote, storageError };
}
