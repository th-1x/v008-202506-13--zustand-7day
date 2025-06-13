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

// สร้าง Auth Store สำหรับ Day 2 Workshop
export const useAuthStore = create((set) => ({
  // State
  isLoggedIn: false,
  userProfile: null,

  // Actions
  login: (profile) => set({
    isLoggedIn: true,
    userProfile: profile
  }),

  logout: () => set({
    isLoggedIn: false,
    userProfile: null
  }),
}));

// สร้าง Product Store สำหรับ Day 3 Workshop
export const useProductStore = create((set) => ({
  // State
  products: [],
  loading: false,
  error: null,

  // Async Action
  fetchProducts: async () => {
    // 1. เริ่มต้น loading
    set({ loading: true, error: null });

    try {
      // 2. ดึงข้อมูลจาก API
      const response = await fetch('https://fakestoreapi.com/products');

      // 3. เช็คว่า response สำเร็จหรือไม่
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 4. แปลงข้อมูลเป็น JSON
      const data = await response.json();

      // 5. อัปเดต state เมื่อสำเร็จ
      set({
        products: data,
        loading: false,
        error: null
      });

    } catch (error) {
      // 6. จัดการ Error
      set({
        products: [],
        loading: false,
        error: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล'
      });
    }
  },

  // Action เพื่อล้างข้อมูล
  clearProducts: () => set({
    products: [],
    loading: false,
    error: null
  }),
}));
