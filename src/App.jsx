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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
