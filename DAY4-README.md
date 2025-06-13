# 🚀 Zustand Workshop - Day 4: ซิงค์ State กับ URL (Route Params)

## 🎯 เป้าหมาย
ทำให้ URL เป็นส่วนหนึ่งของ State โดยการดึงข้อมูลตาม ID ที่อยู่ใน URL

## 📚 เนื้อหาที่เรียนรู้

### useParams Hook
- ดึงค่า dynamic จาก URL parameters
- ใช้กับ route pattern เช่น `/products/:productId`
- ค่าที่ได้เป็น string เสมอ

### useEffect Dependency Array
- re-fetch ข้อมูลเมื่อ URL parameters เปลี่ยน
- dependency array ที่มี `productId`
- cleanup function สำหรับล้างข้อมูล

### URL as State
- URL กลายเป็นส่วนหนึ่งของ application state
- การเปลี่ยน URL → การเปลี่ยน state
- Deep linking และ bookmarking

## 🛠️ โครงสร้างไฟล์

```
src/
├── store.js                  # Counter + Auth + Product Stores (เพิ่ม currentProduct)
├── App.jsx                   # เพิ่ม /products/:productId route
└── pages/
    ├── HomePage.jsx          # แสดงสถานะทั้ง 4 stores
    ├── AboutPage.jsx         # Counter (Day 1)
    ├── LoginPage.jsx         # Authentication (Day 2)
    ├── ProfilePage.jsx       # Protected Route (Day 2)
    ├── ProductsPage.jsx      # Product List + Links (Day 3-4)
    └── ProductDetailPage.jsx # Product Detail (Day 4) ✨
```

## 🔄 URL Sync Flow

### 1. Route Configuration
```javascript
// App.jsx
<Routes>
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/products/:productId" element={<ProductDetailPage />} />
</Routes>
```

### 2. Product Store Updates
```javascript
export const useProductStore = create((set) => ({
  // เพิ่ม state สำหรับสินค้าชิ้นเดียว
  currentProduct: null,
  productLoading: false,
  productError: null,

  // เพิ่ม action สำหรับดึงสินค้าตาม ID
  fetchProductById: async (productId) => {
    set({ productLoading: true, productError: null });
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      set({ currentProduct: data, productLoading: false });
    } catch (error) {
      set({ productError: error.message, productLoading: false });
    }
  }
}));
```

### 3. Component Implementation
```javascript
// ProductDetailPage.jsx
function ProductDetailPage() {
  const { productId } = useParams(); // ดึง ID จาก URL
  const { currentProduct, fetchProductById } = useProductStore();

  useEffect(() => {
    fetchProductById(productId); // เรียกเมื่อ productId เปลี่ยน
  }, [productId, fetchProductById]);

  return <div>{currentProduct?.title}</div>;
}
```

### 4. Navigation Links
```javascript
// ProductsPage.jsx
{products.map(product => (
  <Link to={`/products/${product.id}`}>
    {product.title}
  </Link>
))}
```

## 🧪 การทดสอบ URL Sync

### ทดสอบ Dynamic Routes:
1. ไปหน้า Products (/products)
2. คลิกชื่อสินค้าหรือปุ่ม "ดูรายละเอียด"
3. URL เปลี่ยนเป็น /products/1 ✅
4. หน้ารายละเอียดแสดงข้อมูลสินค้า ID 1 ✅

### ทดสอบ URL Parameters:
1. พิมพ์ URL โดยตรง: /products/5
2. หน้าจะโหลดข้อมูลสินค้า ID 5 ✅
3. เปลี่ยน URL เป็น /products/10
4. useEffect จะทำงานและดึงข้อมูลใหม่ ✅

### ทดสอบ Navigation:
1. อยู่ที่หน้ารายละเอียดสินค้า
2. กดปุ่ม "กลับ" (useNavigate(-1))
3. กลับไปหน้าก่อนหน้า ✅
4. กดปุ่ม "ดูสินค้าทั้งหมด"
5. ไปหน้า Products ✅

### ทดสอบ Error Handling:
1. พิมพ์ URL: /products/999 (ID ที่ไม่มี)
2. แสดงข้อความ Error ✅
3. กดปุ่ม "ลองใหม่" ✅
4. กดปุ่ม "กลับไปดูสินค้าทั้งหมด" ✅

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Concepts

### 1. useParams Pattern
```javascript
// URL: /products/123
const { productId } = useParams(); // productId = "123"
```

### 2. Dynamic Route Definition
```javascript
<Route path="/products/:productId" element={<Component />} />
```

### 3. useEffect with URL Dependency
```javascript
useEffect(() => {
  fetchData(productId);
}, [productId]); // re-run เมื่อ productId เปลี่ยน
```

### 4. Navigation Patterns
```javascript
// Link to dynamic route
<Link to={`/products/${product.id}`}>

// Programmatic navigation
const navigate = useNavigate();
navigate(-1); // กลับหน้าก่อนหน้า
navigate('/products'); // ไปหน้าเฉพาะ
```

## 🎓 สิ่งที่ควรจำ

1. **useParams** ดึงค่าจาก URL parameters
2. **Dynamic Routes** ใช้ `:paramName` ใน route path
3. **URL Sync** URL เปลี่ยน → useEffect ทำงาน → State เปลี่ยน
4. **Dependency Array** ใส่ params ใน useEffect dependency
5. **Cleanup Function** ล้างข้อมูลเมื่อออกจากหน้า
6. **Error Handling** จัดการกรณี ID ไม่มีในระบบ
7. **Navigation** ใช้ useNavigate สำหรับกลับหน้า

## 🌐 API Endpoints

- **All Products**: https://fakestoreapi.com/products
- **Single Product**: https://fakestoreapi.com/products/{id}
- **Valid IDs**: 1-20 (Fake Store API มี 20 สินค้า)

## 🎨 UI Features

- **Product Grid**: รายการสินค้าพร้อมลิงก์
- **Clickable Titles**: คลิกชื่อสินค้าเพื่อดูรายละเอียด
- **Detail Buttons**: ปุ่ม "ดูรายละเอียด" ในแต่ละการ์ด
- **Product Detail**: หน้ารายละเอียดแบบเต็ม
- **Navigation Buttons**: ปุ่มกลับและไปหน้าอื่น
- **Loading States**: แยก loading สำหรับ list และ detail
- **Error Handling**: ข้อความ error และปุ่มลองใหม่

## 🔗 URL Examples

- `/products` - รายการสินค้าทั้งหมด
- `/products/1` - รายละเอียดสินค้า ID 1
- `/products/15` - รายละเอียดสินค้า ID 15
- `/products/999` - Error (ไม่มีสินค้า ID 999)

---

**Challenge:** ลองเปลี่ยน URL ในแถบที่อยู่โดยตรงและดูว่า useEffect ทำงานอย่างไร! 🔥
