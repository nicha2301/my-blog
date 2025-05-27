"use client";

import { create } from 'zustand';

type LoadingState = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  resetLoading: () => void;
};

// Keep track of the timeout ID to clear it when needed
let safetyTimeoutId: NodeJS.Timeout | null = null;
const SAFETY_TIMEOUT = 5000; // 5 seconds max loading time

// Create loading store with Zustand
export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  startLoading: () => {
    // Clear any existing safety timeout
    if (safetyTimeoutId) {
      clearTimeout(safetyTimeoutId);
    }
    
    // Set a new safety timeout to prevent endless loading
    safetyTimeoutId = setTimeout(() => {
      set({ isLoading: false });
      console.warn('Loading state was automatically reset after timeout');
      safetyTimeoutId = null;
    }, SAFETY_TIMEOUT);
    
    set({ isLoading: true });
  },
  stopLoading: () => {
    // Clear safety timeout when loading stops normally
    if (safetyTimeoutId) {
      clearTimeout(safetyTimeoutId);
      safetyTimeoutId = null;
    }
    set({ isLoading: false });
  },
  resetLoading: () => {
    // Force reset loading state and clear timeout
    if (safetyTimeoutId) {
      clearTimeout(safetyTimeoutId);
      safetyTimeoutId = null;
    }
    set({ isLoading: false });
  }
}));

// Helper functions to use outside of React components
export const startPageLoading = () => {
  useLoadingStore.getState().startLoading();
};

export const stopPageLoading = () => {
  useLoadingStore.getState().stopLoading();
};

export const resetPageLoading = () => {
  useLoadingStore.getState().resetLoading();
}; 