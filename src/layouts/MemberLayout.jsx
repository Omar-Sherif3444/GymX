import { Routes, Route, Navigate } from "react-router-dom";
import MemberNavbar from "../pages/member/member navbar/MemberNavbar";
import MemberHome from "../pages/member/MemberHome";
import MachinesGuide from "../pages/member/MachinesGuide";
import MemberPass from "../pages/member/MemberPass";
import MemberHistory from "../pages/member/MemberHistory";
import Plans from "../pages/member/Plans";
import Store from "../pages/member/Store";
import NotFound from "../pages/public/NotFound";

import { useTheme } from "../context/ThemeContext";
import MachineDescription from "../pages/member/machines/MachineDescription";

const MemberLayout = () => {
  const { lightMode, setLightMode } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
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
    </div>
  );
};

export default MemberLayout;
