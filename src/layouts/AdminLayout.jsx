import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./../pages/admin/AdminDashboard";
import Staff from "./../pages/admin/Staff";
import Announcements from "./../pages/admin/Announcements";
import AnnouncementEditor from "./../pages/admin/AnnouncementEditor";
import { useTheme } from "../context/ThemeContext";
import StaffContext from "../context/StaffContext";
import AnnouncementsContext from "../context/AnnouncementsContext";
import CheckInsContext from "../context/CheckInsContext";
import CheckIn from "./../pages/admin/CheckIn";
import MembersDirectory from "./../pages/admin/MembersDirectory";
import NewMember from "./../pages/admin/NewMember";
import MemberDetails from "./../pages/admin/MemberDetails";
import RegistrationSuccess from "./../pages/admin/RegistrationSuccess";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import Reports from "../pages/admin/Reports";
import Store from "../pages/admin/Store";
import OrderDetails from "../pages/admin/OrderDetails";
import Leads from "../pages/admin/Leads";
import StoreContext from "../context/StoreContext";
import LeadsContext from "../context/LeadsContext";

const AdminLayout = () => {
  const { lightMode } = useTheme();

  return (
    <StaffContext>
      <AnnouncementsContext>
        <CheckInsContext>
        <StoreContext>
        <LeadsContext>
        <div
          data-theme={lightMode ? "light" : "dark"}
          className="flex min-h-screen bg-bg text-ink"
        >
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminNavbar />

            <main className="min-w-0 flex-1 p-4 sm:p-6">
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="check-in" element={<CheckIn />} />
                <Route path="staff" element={<Staff />} />
                <Route path="announcements" element={<Announcements />} />
                <Route
                  path="announcements/new"
                  element={<AnnouncementEditor />}
                />
                <Route
                  path="announcements/:id/edit"
                  element={<AnnouncementEditor />}
                />
                <Route path="members" element={<MembersDirectory />} />
                <Route path="members/new" element={<NewMember />} />
                <Route path="members/:id" element={<MemberDetails />} />
                <Route
                  path="members/:id/registered"
                  element={<RegistrationSuccess />}
                />
                <Route path="/reports" element={<Reports />} />
                <Route path="store" element={<Store />} />
                <Route path="store/orders/:id" element={<OrderDetails />} />
                <Route path="leads" element={<Leads />} />
              </Routes>
            </main>
          </div>
        </div>
        </LeadsContext>
        </StoreContext>
        </CheckInsContext>
      </AnnouncementsContext>
    </StaffContext>
  );
};

export default AdminLayout;
