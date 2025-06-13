// src/store.js - Day 5: Middleware (devtools + persist)
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// สร้าง Counter Store สำหรับ Day 1 Workshop + Day 5 Middleware
export const useCounterStore = create(
  devtools(
    (set) => ({
      // State
      count: 0,

      // Actions
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'counter/increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'counter/decrement'),
      reset: () => set({ count: 0 }, false, 'counter/reset'),
    }),
    {
      name: 'counter-store', // ชื่อใน Redux DevTools
    }
  )
);

// สร้าง Auth Store สำหรับ Day 2 Workshop + Day 5 Middleware (persist + devtools)
export const useAuthStore = create(
  persist(
    devtools(
      (set) => ({
        // State
        isLoggedIn: false,
        userProfile: null,

        // Actions
        login: (profile) => set({
          isLoggedIn: true,
          userProfile: profile
        }, false, 'auth/login'),

        logout: () => set({
          isLoggedIn: false,
          userProfile: null
        }, false, 'auth/logout'),
      }),
      {
        name: 'auth-store', // ชื่อใน Redux DevTools
      }
    ),
    {
      name: 'auth-storage', // ชื่อ key ใน localStorage
      // เลือกเฉพาะ state ที่ต้องการ persist
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userProfile: state.userProfile
      }),
    }
  )
);

// สร้าง Product Store สำหรับ Day 3-4 Workshop + Day 5 Middleware
export const useProductStore = create(
  devtools(
    (set) => ({
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
        set({ loading: true, error: null }, false, 'products/fetchStart');

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
          }, false, 'products/fetchSuccess');

        } catch (error) {
          // 6. จัดการ Error
          set({
            products: [],
            loading: false,
            error: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล'
          }, false, 'products/fetchError');
        }
      },

      // Async Action - ดึงสินค้าชิ้นเดียวตาม ID (Day 4)
      fetchProductById: async (productId) => {
        // 1. เริ่มต้น loading สำหรับสินค้าชิ้นเดียว
        set({ productLoading: true, productError: null }, false, 'product/fetchByIdStart');

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
          }, false, 'product/fetchByIdSuccess');

        } catch (error) {
          // 6. จัดการ Error
          set({
            currentProduct: null,
            productLoading: false,
            productError: error.message || 'ไม่พบสินค้าที่ต้องการ'
          }, false, 'product/fetchByIdError');
        }
      },

      // Action เพื่อล้างข้อมูลสินค้าทั้งหมด
      clearProducts: () => set({
        products: [],
        loading: false,
        error: null
      }, false, 'products/clear'),

      // Action เพื่อล้างข้อมูลสินค้าชิ้นเดียว (Day 4)
      clearCurrentProduct: () => set({
        currentProduct: null,
        productLoading: false,
        productError: null
      }, false, 'product/clearCurrent'),
    }),
    {
      name: 'product-store', // ชื่อใน Redux DevTools
    }
  )
);

// สร้าง Wishlist Store สำหรับ Day 7 Workshop
export const useWishlistStore = create(
  persist(
    devtools(
      (set, get) => ({
        // State
        itemIds: [], // array ของ product IDs

        // Actions
        addToWishlist: (productId) => {
          const currentItems = get().itemIds;
          if (!currentItems.includes(productId)) {
            set({
              itemIds: [...currentItems, productId]
            }, false, 'wishlist/add');
          }
        },

        removeFromWishlist: (productId) => {
          const currentItems = get().itemIds;
          set({
            itemIds: currentItems.filter(id => id !== productId)
          }, false, 'wishlist/remove');
        },

        toggleWishlist: (productId) => {
          const currentItems = get().itemIds;
          if (currentItems.includes(productId)) {
            get().removeFromWishlist(productId);
          } else {
            get().addToWishlist(productId);
          }
        },

        clearWishlist: () => set({
          itemIds: []
        }, false, 'wishlist/clear'),

        // Computed values
        isInWishlist: (productId) => {
          return get().itemIds.includes(productId);
        },

        getWishlistCount: () => {
          return get().itemIds.length;
        },
      }),
      {
        name: 'wishlist-store', // ชื่อใน Redux DevTools
      }
    ),
    {
      name: 'wishlist-storage', // ชื่อ key ใน localStorage
      partialize: (state) => ({
        itemIds: state.itemIds
      }),
    }
  )
);
