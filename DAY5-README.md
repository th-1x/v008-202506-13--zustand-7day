# 🚀 Zustand Workshop - Day 5: ยกระดับ Store ด้วย Middleware

## 🎯 เป้าหมาย
รู้จักและใช้งาน Middleware ของ Zustand เพื่อเพิ่มความสามารถให้ Store

## 📚 เนื้อหาที่เรียนรู้

### devtools Middleware
- เชื่อมต่อ Zustand store กับ Redux DevTools
- ดู state changes และ action history
- Debug state ได้ง่ายขึ้น
- ตั้งชื่อ action สำหรับ tracking

### persist Middleware
- บันทึก state ลงใน localStorage อัตโนมัติ
- State ไม่หายเมื่อ refresh หน้า
- เลือกเฉพาะ state ที่ต้องการ persist
- กำหนด storage key ที่ไม่ซ้ำ

### Middleware Composition
- ใช้หลาย middleware ร่วมกัน
- ลำดับการ wrap middleware สำคัญ
- persist(devtools(...)) pattern

## 🛠️ โครงสร้างไฟล์

```
src/
├── store.js              # ทุก Store ใช้ middleware
├── App.jsx               # ไม่เปลี่ยนแปลง
└── pages/
    ├── HomePage.jsx      # เพิ่มข้อมูล middleware
    ├── AboutPage.jsx     # ไม่เปลี่ยนแปลง
    ├── LoginPage.jsx     # ไม่เปลี่ยนแปลง
    ├── ProfilePage.jsx   # ไม่เปลี่ยนแปลง
    ├── ProductsPage.jsx  # ไม่เปลี่ยนแปลง
    └── ProductDetailPage.jsx # ไม่เปลี่ยนแปลง
```

## 🔧 Middleware Implementation

### 1. Import Middleware
```javascript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
```

### 2. Counter Store with devtools
```javascript
export const useCounterStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'counter/increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'counter/decrement'),
      reset: () => set({ count: 0 }, false, 'counter/reset'),
    }),
    { name: 'counter-store' }
  )
);
```

### 3. Auth Store with persist + devtools
```javascript
export const useAuthStore = create(
  persist(
    devtools(
      (set) => ({
        isLoggedIn: false,
        userProfile: null,
        login: (profile) => set({ 
          isLoggedIn: true, 
          userProfile: profile 
        }, false, 'auth/login'),
        logout: () => set({ 
          isLoggedIn: false, 
          userProfile: null 
        }, false, 'auth/logout'),
      }),
      { name: 'auth-store' }
    ),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isLoggedIn: state.isLoggedIn, 
        userProfile: state.userProfile 
      }),
    }
  )
);
```

### 4. Product Store with devtools
```javascript
export const useProductStore = create(
  devtools(
    (set) => ({
      products: [],
      loading: false,
      error: null,
      
      fetchProducts: async () => {
        set({ loading: true }, false, 'products/fetchStart');
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          set({ products: data, loading: false }, false, 'products/fetchSuccess');
        } catch (error) {
          set({ error: error.message, loading: false }, false, 'products/fetchError');
        }
      },
    }),
    { name: 'product-store' }
  )
);
```

## 🧪 การทดสอบ Middleware

### ทดสอบ Redux DevTools:
1. ติดตั้ง Redux DevTools Extension
2. เปิด Browser DevTools (F12)
3. ไปที่แท็บ "Redux"
4. ดู stores: counter-store, auth-store, product-store ✅
5. กดปุ่มต่างๆ และดู action history ✅
6. ดู state tree และ diff ✅

### ทดสอบ Persist:
1. ล็อกอินในระบบ ✅
2. กด F5 (Refresh หน้า) ✅
3. ยังคงล็อกอินอยู่! ✅
4. เปิด DevTools → Application → Local Storage ✅
5. ดู key "auth-storage" ✅
6. ล็อกเอาต์แล้ว refresh → ข้อมูลหายจาก localStorage ✅

### ทดสอบ Action Names:
1. เปิด Redux DevTools
2. กดปุ่ม increment → เห็น "counter/increment" ✅
3. ล็อกอิน → เห็น "auth/login" ✅
4. ดึงข้อมูลสินค้า → เห็น "products/fetchStart", "products/fetchSuccess" ✅

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Concepts

### 1. devtools Middleware
```javascript
// Syntax
devtools(storeFunction, { name: 'store-name' })

// Action naming
set(newState, false, 'action/name')
```

### 2. persist Middleware
```javascript
// Syntax
persist(storeFunction, {
  name: 'storage-key',
  partialize: (state) => ({ /* selected fields */ })
})
```

### 3. Middleware Order
```javascript
// ✅ ถูกต้อง
persist(devtools(store), persistOptions)

// ❌ ผิด
devtools(persist(store), devtoolsOptions)
```

### 4. Action Naming Convention
```javascript
// Pattern: 'domain/action'
'counter/increment'
'auth/login'
'products/fetchStart'
'product/fetchByIdSuccess'
```

## 🎓 สิ่งที่ควรจำ

1. **devtools** ช่วย debug state ได้ง่าย
2. **persist** ทำให้ state ไม่หายเมื่อ refresh
3. **Action names** ช่วยใน debugging
4. **Middleware order** สำคัญ (persist ก่อน devtools)
5. **partialize** เลือกเฉพาะ state ที่ต้องการ persist
6. **Storage key** ต้องไม่ซ้ำกันระหว่าง stores
7. **Redux DevTools** ใช้ได้กับ Zustand

## 🔧 Redux DevTools Installation

### Chrome:
1. ไปที่ Chrome Web Store
2. ค้นหา "Redux DevTools"
3. กด "Add to Chrome"

### Firefox:
1. ไปที่ Firefox Add-ons
2. ค้นหา "Redux DevTools"
3. กด "Add to Firefox"

## 💾 localStorage Structure

```javascript
// Key: "auth-storage"
{
  "state": {
    "isLoggedIn": true,
    "userProfile": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Developer"
    }
  },
  "version": 0
}
```

## 🎨 DevTools Features

- **State Tree**: ดู state ปัจจุบัน
- **Action History**: ดู action ที่เกิดขึ้น
- **Time Travel**: กลับไปดู state ในอดีต
- **Diff View**: ดูการเปลี่ยนแปลง state
- **Export/Import**: ส่งออก/นำเข้า state

## 🔥 Advanced Tips

1. **Custom Storage**: ใช้ sessionStorage แทน localStorage
2. **Encryption**: เข้ารหัสข้อมูลใน storage
3. **Migration**: จัดการ version ของ persisted state
4. **Selective Persist**: persist เฉพาะบาง field
5. **Multiple Stores**: แต่ละ store มี storage key ต่างกัน

---

**Congratulations!** คุณได้เรียนรู้ Zustand ครบทั้ง 5 วันแล้ว! 🎉

**Workshop Summary:**
- Day 1: Basic State + Routing
- Day 2: Authentication Flow
- Day 3: Async Actions
- Day 4: URL Synchronization  
- Day 5: Middleware Enhancement ✨
