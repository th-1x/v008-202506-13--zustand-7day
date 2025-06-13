# 🚀 Zustand Workshop - Day 6: Performance และ Best Practices

## 🎯 เป้าหมาย
เขียนโค้ดที่มีประสิทธิภาพ หลีกเลี่ยงการ re-render ที่ไม่จำเป็น และจัดโครงสร้าง Store ให้ดี

## 📚 เนื้อหาที่เรียนรู้

### ปัญหาการ Re-render
- Component ที่ใช้ `useStore()` ทั้งก้อนจะ re-render ทุกครั้งที่ state ส่วนไหนก็ตามเปลี่ยน
- การ destructure ทั้ง store ทำให้เกิด unnecessary re-renders
- ส่งผลต่อ performance ในแอปขนาดใหญ่

### Selector Functions
- เลือกใช้ state แค่บางส่วน: `useStore(state => state.field)`
- Component จะ re-render เฉพาะเมื่อค่าที่เลือกเปลี่ยนแปลง
- ลดการ re-render ที่ไม่จำเป็น

### Store Splitting
- แยก stores ตามโดเมน (domain-driven)
- authStore, productStore, cartStore แยกกัน
- ง่ายต่อการ maintain และ debug

## 🛠️ โครงสร้างไฟล์

```
src/
├── store.js              # ทุก Store แยกตามโดเมน
├── components/           # Performance testing components ✨
│   ├── DisplayUsername.jsx
│   ├── UpdateCounter.jsx
│   └── PerformanceDemo.jsx
├── App.jsx               # ใช้ selectors แทน destructuring
└── pages/
    ├── HomePage.jsx      # เพิ่ม PerformanceDemo + selectors
    └── ... (ไฟล์อื่นๆ ไม่เปลี่ยน)
```

## 🔄 Performance Optimization

### 1. ❌ วิธีที่ไม่ดี (Destructuring)
```javascript
// Component จะ re-render เมื่อ state ใดๆ ใน store เปลี่ยน
function BadComponent() {
  const { isLoggedIn, userProfile, count, products } = useAuthStore();
  
  return <div>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</div>;
  // Component นี้จะ re-render แม้ว่า count หรือ products เปลี่ยน!
}
```

### 2. ✅ วิธีที่ดี (Selector Functions)
```javascript
// Component จะ re-render เฉพาะเมื่อ isLoggedIn เปลี่ยน
function GoodComponent() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  
  return <div>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</div>;
  // Component นี้จะ re-render เฉพาะเมื่อ isLoggedIn เปลี่ยนเท่านั้น!
}
```

### 3. Actions ไม่ทำให้ re-render
```javascript
// Actions ไม่เปลี่ยนแปลง ดังนั้นไม่ทำให้ component re-render
const login = useAuthStore(state => state.login);
const logout = useAuthStore(state => state.logout);
```

## 🧪 Performance Testing Components

### 1. DisplayUsername Component
```javascript
function DisplayUsername() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  // ✅ เลือกเฉพาะ userProfile
  const userProfile = useAuthStore(state => state.userProfile);
  
  return (
    <div>
      <p>User: {userProfile?.name}</p>
      <p>Re-renders: {renderCount.current}</p>
    </div>
  );
}
```

### 2. UpdateCounter Component
```javascript
function UpdateCounter() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  // ✅ เลือกเฉพาะสิ่งที่ต้องการ
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <p>Re-renders: {renderCount.current}</p>
    </div>
  );
}
```

### 3. PerformanceDemo Component
- แสดง re-render count ของ parent component
- มี test buttons สำหรับทดสอบ
- รวม DisplayUsername และ UpdateCounter
- แสดงคำแนะนำการทดสอบ

## 🧪 การทดสอบ Performance

### ทดสอบ Selector Functions:
1. ดู re-render count ใน PerformanceDemo ✅
2. กดปุ่ม "Test Login/Logout" ✅
3. สังเกต: DisplayUsername re-render, UpdateCounter ไม่ re-render ✅
4. กดปุ่ม "Increment Counter" ✅
5. สังเกต: UpdateCounter re-render, DisplayUsername ไม่ re-render ✅

### ทดสอบ Store Splitting:
1. แต่ละ store ทำงานอิสระกัน ✅
2. การเปลี่ยน auth state ไม่กระทบ product state ✅
3. การเปลี่ยน counter state ไม่กระทบ auth state ✅

### ทดสอบ Redux DevTools:
1. เปิด Redux DevTools ✅
2. ดู action ที่เกิดขึ้นเมื่อกดปุ่ม ✅
3. ดู state changes ในแต่ละ store ✅

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Concepts

### 1. Selector Pattern
```javascript
// ❌ ไม่ดี
const { field1, field2, field3 } = useStore();

// ✅ ดี
const field1 = useStore(state => state.field1);
const field2 = useStore(state => state.field2);
```

### 2. Re-render Tracking
```javascript
const renderCount = useRef(0);
renderCount.current += 1;
```

### 3. Store Splitting
```javascript
// แยกตามโดเมน
const useAuthStore = create(...);
const useProductStore = create(...);
const useCartStore = create(...);
```

### 4. Action Optimization
```javascript
// Actions ไม่ทำให้ re-render
const action = useStore(state => state.action);
```

## 🎓 Best Practices

### 1. ใช้ Selector Functions
- เลือกเฉพาะ state ที่ component ต้องการ
- หลีกเลี่ยงการ destructure ทั้ง store
- ลด unnecessary re-renders

### 2. แยก Stores ตามโดเมน
- authStore สำหรับ authentication
- productStore สำหรับ products
- cartStore สำหรับ shopping cart
- ง่ายต่อการ maintain

### 3. Monitor Performance
- ใช้ useRef เพื่อนับ re-renders
- ใช้ React DevTools Profiler
- ใช้ Redux DevTools เพื่อ debug

### 4. Optimize Actions
- Actions ไม่ทำให้ component re-render
- สามารถ extract actions แยกต่างหาก
- ใช้ useCallback ถ้าจำเป็น

## 🔥 Advanced Patterns

### 1. Computed Values
```javascript
const useStore = create((set, get) => ({
  items: [],
  get totalPrice() {
    return get().items.reduce((sum, item) => sum + item.price, 0);
  }
}));
```

### 2. Shallow Comparison
```javascript
import { shallow } from 'zustand/shallow';

const { field1, field2 } = useStore(
  state => ({ field1: state.field1, field2: state.field2 }),
  shallow
);
```

### 3. Subscribe Outside Components
```javascript
const unsubscribe = useStore.subscribe(
  state => state.count,
  count => console.log('Count changed:', count)
);
```

## 📊 Performance Metrics

### Re-render Comparison:
- **Without Selectors**: Component re-renders on ANY state change
- **With Selectors**: Component re-renders only when selected state changes
- **Performance Gain**: 50-90% reduction in unnecessary re-renders

### Memory Usage:
- **Store Splitting**: Better memory management
- **Selective Subscriptions**: Lower memory footprint
- **Garbage Collection**: More efficient cleanup

## 🎉 Workshop Completion

**Congratulations!** คุณได้เรียนรู้ Zustand ครบทั้ง 6 วันแล้ว! 🎊

### Workshop Summary:
- **Day 1**: Basic State + Routing ✅
- **Day 2**: Authentication Flow ✅
- **Day 3**: Async Actions ✅
- **Day 4**: URL Synchronization ✅
- **Day 5**: Middleware Enhancement ✅
- **Day 6**: Performance Optimization ✅

### Skills Acquired:
- ✅ Global State Management
- ✅ Authentication Patterns
- ✅ Async Data Handling
- ✅ URL State Synchronization
- ✅ Developer Tools Integration
- ✅ Performance Optimization
- ✅ Production-Ready Patterns

**คุณพร้อมสร้าง React applications ด้วย Zustand แล้ว!** 🚀
