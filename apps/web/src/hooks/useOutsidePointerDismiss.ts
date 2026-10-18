import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useOutsidePointerDismiss<T extends HTMLElement>(open: boolean, root: RefObject<T>, onDismiss: () => void) {
  useEffect(() => {
    if (!open || typeof document === 'undefined') return;
    const dismissOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onDismiss();
    };
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [open, root, onDismiss]);
}
