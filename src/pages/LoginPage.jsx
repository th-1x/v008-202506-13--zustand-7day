// src/pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../zudtand/store';

function LoginPage() {
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // 1. สมมติว่าล็อกอินสำเร็จและได้ข้อมูล profile กลับมา
    const userProfile = { name: 'John Doe', email: 'john.doe@example.com' };
    
    // 2. เรียก action เพื่ออัปเดต global state
    loginAction(userProfile);
    
    // 3. ใช้ navigate เพื่อเปลี่ยนหน้า
    navigate('/profile');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>Please click the button to log in.</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;