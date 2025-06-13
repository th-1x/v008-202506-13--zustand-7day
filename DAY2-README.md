# 🚀 Zustand Workshop - Day 2: การจัดการสถานะผู้ใช้ (Authentication Flow)

## 🎯 เป้าหมาย
สร้างระบบ Login/Logout ปลอมๆ และเรียนรู้วิธีป้องกันการเข้าถึงหน้า (Protected Route)

## 📚 เนื้อหาที่เรียนรู้

### Conditional Rendering
- ใช้ State จาก Store ในการแสดงเนื้อหาแบบมีเงื่อนไข
- แสดง "Login" หรือ "Profile" ตามสถานะการล็อกอิน

### useNavigate
- เปลี่ยนหน้าหลังจากทำ Action เสร็จ
- ใช้ใน Login flow และ Logout flow

### Protected Route
- ป้องกันการเข้าถึงหน้าสำคัญ
- ใช้ `<Navigate>` component เพื่อ redirect

## 🛠️ โครงสร้างไฟล์

```
src/
├── store.js              # Counter Store + Auth Store
├── App.jsx               # Routes + Conditional Navbar
└── pages/
    ├── HomePage.jsx      # แสดงสถานะ Auth + Counter
    ├── AboutPage.jsx     # Counter (จาก Day 1)
    ├── LoginPage.jsx     # หน้าล็อกอิน + Mock Users
    └── ProfilePage.jsx   # Protected Route + User Info
```

## 🔐 Authentication Flow

### 1. Login Process
```javascript
// 1. เลือก Mock User
const userProfile = { name: 'John Doe', email: 'john@example.com', role: 'Developer' };

// 2. เรียก Action
login(userProfile);

// 3. Navigate ไปหน้า Profile
navigate('/profile');
```

### 2. Logout Process
```javascript
// 1. เรียก Action
logout();

// 2. Navigate กลับหน้าแรก
navigate('/');
```

### 3. Protected Route
```javascript
// ใน ProfilePage.jsx
if (!isLoggedIn) {
  return <Navigate to="/login" replace />;
}
```

## 🧪 การทดสอบ Authentication

### ทดสอบ Login Flow:
1. ไปหน้า Login
2. เลือก Mock User
3. กดปุ่ม "เข้าสู่ระบบ"
4. ระบบจะพาไปหน้า Profile ✅
5. Navbar จะเปลี่ยนแปลง ✅

### ทดสอบ Protected Route:
1. กด Logout
2. พิมพ์ URL `/profile` โดยตรง
3. ระบบจะเด้งไปหน้า Login ✅

### ทดสอบ Global State:
1. ล็อกอินที่หน้า Login
2. ไปหน้า Home
3. ดูสถานะการล็อกอิน ✅
4. ไปหน้า About
5. กลับมาหน้า Profile
6. ข้อมูล User ยังคงอยู่ ✅

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Concepts

### 1. Multiple Stores
```javascript
// ใช้หลาย Store ในแอปเดียว
const { count } = useCounterStore();
const { isLoggedIn } = useAuthStore();
```

### 2. Conditional Rendering
```javascript
{isLoggedIn ? (
  <Link to="/profile">Profile</Link>
) : (
  <Link to="/login">Login</Link>
)}
```

### 3. useNavigate Hook
```javascript
const navigate = useNavigate();
navigate('/profile'); // เปลี่ยนหน้า
```

### 4. Protected Route Pattern
```javascript
if (!isLoggedIn) {
  return <Navigate to="/login" replace />;
}
```

## 🎓 สิ่งที่ควรจำ

1. **Auth Store** มี `isLoggedIn` และ `userProfile`
2. **Conditional Rendering** ใช้ state เพื่อแสดงเนื้อหา
3. **useNavigate** เปลี่ยนหน้าหลัง action
4. **Protected Route** เช็ค auth ก่อนแสดงหน้า
5. **Multiple Stores** สามารถใช้ร่วมกันได้
6. **Global State** คงอยู่ข้ามหน้าและ refresh

## 🔥 Mock Users สำหรับทดสอบ

- **John Doe** - Developer
- **Jane Smith** - Designer  
- **Admin User** - Administrator

---

**Next:** Day 3 - การจัดการ State ที่ซับซ้อนขึ้น และ Async Operations 🚀
