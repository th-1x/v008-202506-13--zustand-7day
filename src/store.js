// src/store.js
import { create } from 'zustand';

// สร้าง Counter Store สำหรับ Day 1 Workshop
export const useCounterStore = create((set) => ({
  // State
  count: 0,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
