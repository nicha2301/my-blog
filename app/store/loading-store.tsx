"use client";

import { create } from 'zustand';

type LoadingState = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

// Create loading store with Zustand
export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));

// Helper functions to use outside of React components
export const startPageLoading = () => {
  useLoadingStore.getState().startLoading();
};

export const stopPageLoading = () => {
  useLoadingStore.getState().stopLoading();
}; 