import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./../pages/admin/AdminDashboard";
import Staff from "./../pages/admin/Staff";
import Announcements from "./../pages/admin/Announcements";
import { useTheme } from "../context/ThemeContext";

const AdminLayout = () => {
  const { lightMode, setLightMode } = useTheme();

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
