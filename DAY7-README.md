# 🚀 Zustand Workshop - Day 7: ประกอบร่าง! สร้าง Mini Wishlist App

## 🎯 เป้าหมาย
นำความรู้ทั้งหมดที่เรียนมาตลอดสัปดาห์มาสร้างเป็นโปรเจกต์สุดท้าย

## 📚 สิ่งที่ใช้จากทุกวัน

### จาก Day 1-6:
- **Day 1**: Basic State + Routing
- **Day 2**: Authentication + Protected Routes
- **Day 3**: Async Actions + API Integration
- **Day 4**: URL Parameters + Dynamic Routing
- **Day 5**: Middleware (persist + devtools)
- **Day 6**: Performance + Selectors

### Day 7 เพิ่มเติม:
- **Wishlist Store**: การจัดการรายการสินค้าที่ชื่นชอบ
- **State Composition**: การใช้หลาย stores ร่วมกัน
- **UI Integration**: การแสดงผลข้อมูลจาก multiple stores

## 🛠️ โครงสร้างไฟล์

```
src/
├── store.js              # 4 Stores: counter, auth, product, wishlist ✨
├── App.jsx               # Navbar + Wishlist count + Routes
└── pages/
    ├── HomePage.jsx      # Dashboard แสดงสถานะทุก store
    ├── AboutPage.jsx     # Counter (Day 1)
    ├── LoginPage.jsx     # Authentication (Day 2)
    ├── ProfilePage.jsx   # Protected Route (Day 2)
    ├── ProductsPage.jsx  # Product List + Wishlist buttons ✨
    ├── ProductDetailPage.jsx # Product Detail + Wishlist button ✨
    └── WishlistPage.jsx  # Wishlist Management (Day 7) ✨
```

## 💖 Wishlist Store Implementation

### 1. Store Definition
```javascript
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
            set({ itemIds: [...currentItems, productId] }, false, 'wishlist/add');
          }
        },

        removeFromWishlist: (productId) => {
          set({ 
            itemIds: get().itemIds.filter(id => id !== productId) 
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

        // Computed values
        isInWishlist: (productId) => get().itemIds.includes(productId),
        getWishlistCount: () => get().itemIds.length,
      }),
      { name: 'wishlist-store' }
    ),
    { 
      name: 'wishlist-storage',
      partialize: (state) => ({ itemIds: state.itemIds })
    }
  )
);
```

### 2. Navbar Integration
```javascript
// App.jsx
const wishlistCount = useWishlistStore(state => state.itemIds.length);

<Link to="/wishlist" style={{ position: 'relative' }}>
  💖 Wishlist
  {wishlistCount > 0 && (
    <span style={{ /* badge styles */ }}>
      {wishlistCount}
    </span>
  )}
</Link>
```

### 3. Product Pages Integration
```javascript
// ProductsPage.jsx & ProductDetailPage.jsx
const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
const isInWishlist = useWishlistStore(state => state.isInWishlist);

<button onClick={() => toggleWishlist(product.id)}>
  {isInWishlist(product.id) ? '💔 ลบออก' : '💖 ชื่นชอบ'}
</button>
```

### 4. Wishlist Page
```javascript
// WishlistPage.jsx
const itemIds = useWishlistStore(state => state.itemIds);
const products = useProductStore(state => state.products);

// ฟิลเตอร์สินค้าที่อยู่ใน wishlist
const wishlistProducts = products.filter(product => 
  itemIds.includes(product.id)
);
```

## 🧪 การทดสอบ Mini Wishlist App

### ทดสอบ Basic Functionality:
1. **ล็อกอิน** เข้าระบบ ✅
2. **ไปหน้า Products** และเลือกสินค้า ✅
3. **กดปุ่ม "💖 ชื่นชอบ"** ✅
4. **ดู count ใน navbar** เปลี่ยนแปลง ✅
5. **ไปหน้า Wishlist** เพื่อดูสินค้า ✅

### ทดสอบ Persistence:
1. **เพิ่มสินค้าใน Wishlist** ✅
2. **กด F5 (Refresh หน้า)** ✅
3. **Wishlist ยังคงอยู่!** ✅
4. **Login state ยังคงอยู่!** ✅

### ทดสอบ Protected Route:
1. **ล็อกเอาต์** ✅
2. **พยายามเข้า /wishlist** ✅
3. **ระบบเด้งไปหน้า Login** ✅

### ทดสอบ State Management:
1. **เปิด Redux DevTools** ✅
2. **ดู 4 stores**: counter, auth, product, wishlist ✅
3. **ดู actions**: wishlist/add, wishlist/remove ✅
4. **ดู localStorage**: auth-storage, wishlist-storage ✅

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Features

### 1. Multi-Store Architecture
```javascript
// 4 independent stores working together
const count = useCounterStore(state => state.count);
const isLoggedIn = useAuthStore(state => state.isLoggedIn);
const products = useProductStore(state => state.products);
const wishlistCount = useWishlistStore(state => state.itemIds.length);
```

### 2. Persistent State
- **Auth State**: Login ไม่หายเมื่อ refresh
- **Wishlist State**: Wishlist ไม่หายเมื่อ refresh
- **localStorage Keys**: auth-storage, wishlist-storage

### 3. Protected Routes
```javascript
// WishlistPage.jsx
if (!isLoggedIn) {
  return <Navigate to="/login" replace />;
}
```

### 4. Dynamic UI Updates
- **Navbar Badge**: แสดง wishlist count
- **Button States**: เปลี่ยนสีตาม wishlist status
- **Real-time Updates**: UI อัปเดตทันทีเมื่อ state เปลี่ยน

## 🎓 สิ่งที่เรียนรู้

### 1. State Composition
- การใช้หลาย stores ในแอปเดียว
- การแชร์ข้อมูลระหว่าง stores
- การจัดการ state ที่ซับซ้อน

### 2. Real-world Patterns
- **Wishlist/Favorites** functionality
- **Shopping cart** patterns
- **User preferences** management

### 3. Performance Optimization
- ใช้ selectors อย่างถูกต้อง
- หลีกเลี่ยง unnecessary re-renders
- Component isolation

### 4. Developer Experience
- Redux DevTools integration
- State persistence
- Action naming conventions

## 🔥 Advanced Features

### 1. Computed Values
```javascript
// ใน store
get totalPrice() {
  const products = useProductStore.getState().products;
  return get().itemIds
    .map(id => products.find(p => p.id === id))
    .reduce((sum, product) => sum + (product?.price || 0), 0);
}
```

### 2. Cross-Store Actions
```javascript
// Action ที่ใช้ข้อมูลจากหลาย stores
clearUserData: () => {
  useAuthStore.getState().logout();
  useWishlistStore.getState().clearWishlist();
}
```

### 3. Middleware Composition
```javascript
// ใช้หลาย middleware ร่วมกัน
persist(
  devtools(
    immer((set) => ({ /* store definition */ })),
    { name: 'store-name' }
  ),
  { name: 'storage-key' }
)
```

## 📊 App Statistics

### Stores: 4
- **Counter Store**: Basic state management
- **Auth Store**: User authentication + persistence
- **Product Store**: API data + async actions
- **Wishlist Store**: User preferences + persistence

### Pages: 7
- **HomePage**: Dashboard + performance demo
- **AboutPage**: Counter functionality
- **LoginPage**: Authentication flow
- **ProfilePage**: Protected route
- **ProductsPage**: Product listing + wishlist
- **ProductDetailPage**: Product details + wishlist
- **WishlistPage**: Wishlist management

### Features:
- ✅ **Authentication Flow**
- ✅ **Protected Routes**
- ✅ **API Integration**
- ✅ **URL Synchronization**
- ✅ **State Persistence**
- ✅ **Performance Optimization**
- ✅ **Wishlist Management**

## 🎉 Workshop Completion

**🎊 ยินดีด้วย! คุณได้เรียนจบ Zustand Workshop ครบทั้ง 7 วันแล้ว! 🎊**

### Skills Mastered:
- ✅ **Global State Management** with Zustand
- ✅ **Authentication Patterns** with protected routes
- ✅ **Async Data Handling** with loading/error states
- ✅ **URL State Synchronization** with React Router
- ✅ **Developer Tools Integration** with middleware
- ✅ **Performance Optimization** with selectors
- ✅ **Real-world Application** with Mini Wishlist App

### Ready for Production:
คุณพร้อมสร้าง React applications ระดับ production ด้วย:
- **Zustand** สำหรับ state management
- **React Router** สำหรับ navigation
- **Best Practices** สำหรับ performance
- **Modern Patterns** สำหรับ maintainability

**ขอให้โชคดีในการพัฒนา React applications ต่อไป! 🚀**
