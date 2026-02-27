"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Manages focus and keyboard behavior for modal dialogs:
 * - Moves focus to `initialFocusRef` on open; restores previous focus on close
 * - Closes the modal on Escape
 * - Traps Tab / Shift+Tab within the dialog container
 *
 * Returns a ref to attach to the dialog root element.
 */
export function useModalFocus(
  isOpen: boolean,
  onClose: () => void,
  initialFocusRef: { current: HTMLElement | null }
): RefObject<HTMLDivElement> {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      initialFocusRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]); // initialFocusRef is a stable ref object, omitted intentionally

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return dialogRef;
}
