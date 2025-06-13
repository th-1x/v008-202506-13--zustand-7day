# 🚀 Zustand Workshop - Day 3: การดึงข้อมูลจากภายนอก (Async Actions)

## 🎯 เป้าหมาย
เรียนรู้วิธีจัดการกับ Asynchronous actions ใน Zustand เพื่อดึงข้อมูลจาก API

## 📚 เนื้อหาที่เรียนรู้

### Async Actions
- การสร้าง async function ใน Zustand store
- การจัดการ Promise และ async/await

### Loading & Error States
- จัดการสถานะการโหลดข้อมูล
- จัดการข้อผิดพลาดจาก API calls
- UX ที่ดีสำหรับผู้ใช้

### API Integration
- การเชื่อมต่อกับ External API
- การใช้ fetch() สำหรับดึงข้อมูล
- การจัดการ HTTP responses

## 🛠️ โครงสร้างไฟล์

```
src/
├── store.js              # Counter + Auth + Product Stores
├── App.jsx               # เพิ่ม Products route
└── pages/
    ├── HomePage.jsx      # แสดงสถานะทั้ง 3 stores
    ├── AboutPage.jsx     # Counter (Day 1)
    ├── LoginPage.jsx     # Authentication (Day 2)
    ├── ProfilePage.jsx   # Protected Route (Day 2)
    └── ProductsPage.jsx  # Async Data Fetching (Day 3) ✨
```

## 🔄 Async Action Flow

### 1. Product Store Structure
```javascript
export const useProductStore = create((set) => ({
  // State
  products: [],
  loading: false,
  error: null,

  // Async Action
  fetchProducts: async () => {
    // 1. เริ่ม loading
    set({ loading: true, error: null });
    
    try {
      // 2. API call
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      
      // 3. Success
      set({ products: data, loading: false });
    } catch (error) {
      // 4. Error handling
      set({ error: error.message, loading: false });
    }
  }
}));
```

### 2. Component Usage
```javascript
function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(); // เรียกเมื่อ component โหลด
  }, [fetchProducts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

## 🧪 การทดสอบ Async Actions

### ทดสอบ Loading State:
1. ไปหน้า Products
2. ดู Loading spinner ขณะรอข้อมูล ✅
3. ข้อมูลแสดงหลังโหลดเสร็จ ✅

### ทดสอบ Error Handling:
1. ปิด Internet connection
2. กดปุ่ม "รีเฟรชข้อมูล"
3. ดูข้อความ Error ✅
4. เปิด Internet กลับ
5. กดปุ่ม "ลองใหม่" ✅

### ทดสอบ Multiple Stores:
1. ดูสถานะสินค้าที่หน้า Home ✅
2. เปลี่ยนค่า Counter ✅
3. ล็อกอิน/ล็อกเอาต์ ✅
4. ทุก Store ทำงานอิสระกัน ✅

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Concepts

### 1. Async Actions Pattern
```javascript
// ✅ ถูกต้อง
fetchData: async () => {
  set({ loading: true });
  try {
    const data = await api.getData();
    set({ data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
}
```

### 2. Loading States
- **loading: true** - กำลังดึงข้อมูล
- **loading: false** - เสร็จแล้ว (สำเร็จหรือผิดพลาด)

### 3. Error Handling
- จับ error ด้วย try/catch
- แสดงข้อความที่เข้าใจง่าย
- ให้ปุ่ม "ลองใหม่"

### 4. useEffect Integration
```javascript
useEffect(() => {
  fetchProducts();
  
  return () => {
    clearProducts(); // cleanup
  };
}, [fetchProducts]);
```

## 🎓 สิ่งที่ควรจำ

1. **Async Actions** ใช้ async/await ใน Zustand ได้
2. **Loading State** สำคัญสำหรับ UX ที่ดี
3. **Error Handling** ต้องมี try/catch เสมอ
4. **useEffect** เรียก async action เมื่อ component โหลด
5. **Multiple Stores** สามารถใช้ร่วมกันได้
6. **API Integration** ใช้ fetch() หรือ axios
7. **Cleanup** ล้างข้อมูลเมื่อออกจากหน้า

## 🌐 API ที่ใช้

- **Fake Store API**: https://fakestoreapi.com/products
- ข้อมูลสินค้าปลอมสำหรับทดสอบ
- ไม่ต้อง authentication
- Response time ประมาณ 1-2 วินาที

## 🎨 UI Features

- **Loading Spinner**: แสดงขณะรอข้อมูล
- **Error Message**: แสดงเมื่อเกิดข้อผิดพลาด
- **Retry Button**: ปุ่มลองใหม่เมื่อ error
- **Product Grid**: แสดงสินค้าแบบ responsive
- **Product Cards**: รูปภาพ, ชื่อ, ราคา, รีวิว

---

**Next:** Day 4 - การจัดการ State ที่ซับซ้อนขึ้น และ Persistence 🔥
