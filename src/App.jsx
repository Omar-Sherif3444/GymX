import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import NotFound from "./pages/public/NotFound";

// Member
import MemberHome from "./pages/member/MemberHome";
import MachinesGuide from "./pages/member/MachinesGuide";
import MemberPass from "./pages/member/MemberPass";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Reports from "./pages/admin/Reports";
import ReportDetails from "./pages/admin/ReportDetails";
import MembersDirectory from "./pages/admin/MembersDirectory";
import MemberDetails from "./pages/admin/MemberDetails";
import NewMember from "./pages/admin/NewMember";
import RegistrationSuccess from "./pages/admin/RegistrationSuccess";
import Machines from "./pages/admin/Machines";
import MachineDetails from "./pages/admin/MachineDetails";
import CheckIn from "./pages/admin/CheckIn";
import Staff from "./pages/admin/Staff";
import Announcements from "./pages/admin/Announcements";
import AnnouncementEditor from "./pages/admin/AnnouncementEditor";
import Store from "./pages/admin/Store";
import OrderDetails from "./pages/admin/OrderDetails";
import Leads from "./pages/admin/Leads";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Member */}
          <Route path="/home" element={<MemberHome />} />
          <Route path="/machines" element={<MachinesGuide />} />
          <Route path="/pass" element={<MemberPass />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/reports/:id" element={<ReportDetails />} />
          <Route path="/admin/members" element={<MembersDirectory />} />
          <Route path="/admin/members/new" element={<NewMember />} />
          <Route path="/admin/members/success" element={<RegistrationSuccess />} />
          <Route path="/admin/members/:id" element={<MemberDetails />} />
          <Route path="/admin/machines" element={<Machines />} />
          <Route path="/admin/machines/:id" element={<MachineDetails />} />
          <Route path="/admin/check-in" element={<CheckIn />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="/admin/announcements" element={<Announcements />} />
          <Route path="/admin/announcements/new" element={<AnnouncementEditor />} />
          <Route path="/admin/announcements/:id/edit" element={<AnnouncementEditor />} />
          <Route path="/admin/store" element={<Store />} />
          <Route path="/admin/store/orders/:id" element={<OrderDetails />} />
          <Route path="/admin/leads" element={<Leads />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
