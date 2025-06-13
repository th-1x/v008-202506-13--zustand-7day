# 🚀 Zustand Workshop - Day 1: ปูพื้นฐาน State และ Route

## 🎯 เป้าหมาย
เข้าใจแนวคิดพื้นฐานของ Global State และ Client-side Routing และทำให้มันทำงานร่วมกันแบบง่ายที่สุด

## 📚 เนื้อหาที่เรียนรู้

### React Router
- **BrowserRouter**: ครอบ App เพื่อเปิดใช้งาน routing
- **Routes & Route**: กำหนดเส้นทางและ component ที่จะแสดง
- **Link**: สร้างลิงก์ที่ไม่ reload หน้า (แทน `<a>` tag)

### Zustand
- **Global State**: State ที่แชร์กันระหว่าง component ต่างๆ
- **create()**: ฟังก์ชันสร้าง store
- **useStore**: Hook เพื่อเข้าถึง state และ actions

## 🛠️ โครงสร้างไฟล์

```
src/
├── main.jsx          # ครอบ App ด้วย BrowserRouter
├── App.jsx           # Routes และ Navigation
├── store.js          # Counter Store (Global State)
└── pages/
    ├── HomePage.jsx  # หน้าแรก + Counter
    └── AboutPage.jsx # หน้า About + Counter
```

## 🧪 การทดสอบ Global State

1. เปิดหน้า Home
2. กดปุ่มเพิ่มค่า Counter
3. ไปหน้า About
4. ดูว่าค่า Counter ยังคงเดิม ✅
5. กดเพิ่มค่าที่หน้า About
6. กลับไปหน้า Home
7. ค่า Counter ควรเป็นค่าล่าสุด ✅

**นี่คือหัวใจของ Global State!** 🎉

## 🚀 วิธีรัน

```bash
npm run dev
```

## 💡 Key Concepts

### 1. ทำไมต้องใช้ React Router?
- ไม่ต้อง reload หน้าเว็บ (SPA)
- จัดการ URL และ history
- Component-based routing

### 2. ทำไมต้องใช้ Global State?
- แชร์ข้อมูลระหว่าง component
- ไม่ต้องส่ง props ลึกๆ (prop drilling)
- จัดการ state ที่ซับซ้อน

### 3. ทำไม Zustand?
- เรียนรู้ง่าย
- Boilerplate น้อย
- Performance ดี
- TypeScript support

## 🎓 สิ่งที่ควรจำ

1. **BrowserRouter** ต้องครอบ App ใน main.jsx
2. **Link** ใช้แทน `<a>` tag
3. **create()** สร้าง store
4. **State และ Actions** อยู่ใน store เดียวกัน
5. **Global State** คงอยู่เมื่อเปลี่ยนหน้า

---

**Next:** Day 2 - การจัดการ State ที่ซับซ้อนขึ้น 🔥
