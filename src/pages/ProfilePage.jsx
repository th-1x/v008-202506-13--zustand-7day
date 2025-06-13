// src/pages/ProfilePage.jsx
import { useAuthStore } from "../zudtand/store";
import { Navigate } from "react-router-dom";

function ProfilePage() {
  const { isLoggedIn, userProfile } = useAuthStore();

  // ถ้ายังไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {userProfile?.name}!</p>
      <p>Email: {userProfile?.email}</p>
    </div>
  );
}

export default ProfilePage;
