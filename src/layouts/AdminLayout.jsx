import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./../pages/admin/AdminDashboard";
import Staff from "./../pages/admin/Staff";
import Announcements from "./../pages/admin/Announcements";
import { useTheme } from "../context/ThemeContext";
import MembersDirectory from "./../pages/admin/MembersDirectory";
import NewMember from "./../pages/admin/NewMember";
import MemberDetails from "./../pages/admin/MemberDetails";
import RegistrationSuccess from "./../pages/admin/RegistrationSuccess";

const AdminLayout = () => {
  const { lightMode, setLightMode } = useTheme();

  return (
    <div className="flex min-h-screen">
      <main className="min-w-0 flex-1 p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/members" element={<MembersDirectory />} />
          <Route path="/members/new" element={<NewMember />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route
            path="/members/:id/registered"
            element={<RegistrationSuccess />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
