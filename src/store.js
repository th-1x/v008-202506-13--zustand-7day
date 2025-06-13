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

// สร้าง Product Store สำหรับ Day 3-4 Workshop
export const useProductStore = create((set) => ({
  // State
  products: [],
  currentProduct: null, // Day 4: สำหรับเก็บข้อมูลสินค้าชิ้นเดียว
  loading: false,
  productLoading: false, // Day 4: loading สำหรับสินค้าชิ้นเดียว
  error: null,
  productError: null, // Day 4: error สำหรับสินค้าชิ้นเดียว

  // Async Action - ดึงสินค้าทั้งหมด (Day 3)
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

  // Async Action - ดึงสินค้าชิ้นเดียวตาม ID (Day 4)
  fetchProductById: async (productId) => {
    // 1. เริ่มต้น loading สำหรับสินค้าชิ้นเดียว
    set({ productLoading: true, productError: null });

    try {
      // 2. ดึงข้อมูลจาก API ตาม ID
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

      // 3. เช็คว่า response สำเร็จหรือไม่
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 4. แปลงข้อมูลเป็น JSON
      const data = await response.json();

      // 5. อัปเดต state เมื่อสำเร็จ
      set({
        currentProduct: data,
        productLoading: false,
        productError: null
      });

    } catch (error) {
      // 6. จัดการ Error
      set({
        currentProduct: null,
        productLoading: false,
        productError: error.message || 'ไม่พบสินค้าที่ต้องการ'
      });
    }
  },

  // Action เพื่อล้างข้อมูลสินค้าทั้งหมด
  clearProducts: () => set({
    products: [],
    loading: false,
    error: null
  }),

  // Action เพื่อล้างข้อมูลสินค้าชิ้นเดียว (Day 4)
  clearCurrentProduct: () => set({
    currentProduct: null,
    productLoading: false,
    productError: null
  }),
}));
