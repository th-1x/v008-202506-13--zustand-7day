// src/productStore.js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  product: null,
  loading: false,
  error: null,

  // ... เพิ่ม action นี้เข้าไป
  clearProduct: () => set({ product: null, loading: false, error: null }),

  fetchProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      // Add timeout for better UX
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(
        `https://api.example.com/products/${productId}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const data = await response.json();
      set({ product: data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Unknown error', loading: false });
    }
  },
}));
