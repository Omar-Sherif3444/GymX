import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./../pages/admin/AdminDashboard";
import { useTheme } from "../context/ThemeContext";

const AdminLayout = () => {
  const { lightMode, setLightMode } = useTheme();

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
