// src/store.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // State
  isLoggedIn: false,
  userProfile: null,

  // Actions
  login: (profile) => set({ isLoggedIn: true, userProfile: profile }),
  logout: () => set({ isLoggedIn: false, userProfile: null }),
}));