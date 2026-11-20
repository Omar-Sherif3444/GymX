import { Routes, Route, Navigate, Link } from "react-router-dom";
import MemberNavbar from "../pages/member/member navbar/MemberNavbar";
import MemberHome from "../pages/member/MemberHome";
import MachinesGuide from "../pages/member/MachinesGuide";
import MemberPass from "../pages/member/MemberPass";
import MemberHistory from "../pages/member/MemberHistory";
import Plans from "../pages/member/Plans";
import Store from "../pages/member/Store";
import NotFound from "../pages/public/NotFound";
import { IoQrCodeSharp } from "react-icons/io5";

import { useTheme } from "../context/ThemeContext";
import MachineDescription from "../pages/member/machines/MachineDescription";

const MemberLayout = () => {
  const { lightMode, setLightMode } = useTheme();

  return (
    <div className="flex min-h-screen flex-col relative">
      <MemberNavbar lightMode={lightMode} setLightMode={setLightMode} />

      <div className="flex-1 bg-(--gym-bg)">
        <Routes>
          <Route index element={<Navigate to="member-home" replace />} />

          <Route path="member-home" element={<MemberHome />} />
          <Route path="machines-guide" element={<MachinesGuide />} />
          <Route
            path="machines-guide/:machineId"
            element={<MachineDescription />}
          />
          <Route path="pass" element={<MemberPass />} />
          <Route path="history" element={<MemberHistory />} />
          <Route path="plans" element={<Plans />} />
          <Route path="member-pass" element={<MemberPass />} />
          <Route path="store" element={<Store />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Link
        to="/member/member-pass"
        aria-label="Open QR Pass"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-orange p-4 text-white shadow-lg shadow-[#FF5A1F]/30 transition-all duration-300 hover:scale-105 hover:bg-(--gym-label) active:scale-95 sm:bottom-6 sm:right-6 sm:gap-3 sm:px-5 sm:py-3.5"
      >
        <IoQrCodeSharp size={24} />
        <span className="hidden font-[Barlow] text-sm font-bold uppercase tracking-wider sm:inline">
          Pass
        </span>
      </Link>
    </div>
  );
};

export default MemberLayout;
