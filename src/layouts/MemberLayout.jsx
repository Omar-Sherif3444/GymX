import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import MemberNavbar from "../pages/member/member navbar/MemberNavbar";
import MemberHome from "../pages/member/MemberHome";
import MachinesGuide from "../pages/member/MachinesGuide";
import MemberPass from "../pages/member/MemberPass";
import MemberHistory from "../pages/member/MemberHistory";
import Plans from "../pages/member/Plans";
import Store from "../pages/member/Store";
import NotFound from "../pages/public/NotFound";

const MemberLayout = () => {
  const [lightMode, setLightMode] = useState(false);

  const theme = {
    "--gym-bg": lightMode ? "#FFF8F4" : "#0b0d12",
    "--gym-surface": lightMode ? "#FFEFE8" : "#10131A",
    "--gym-card": lightMode ? "#FFFFFF" : "#151821",
    "--gym-text": lightMode ? "#1A0B08" : "#F4EFEA",
    "--gym-subtext": lightMode ? "#5C4A44" : "#C9C2BB",
    "--gym-line": lightMode ? "rgba(255,143,163,0.4)" : "#ff8fa338",
    "--gym-label": lightMode ? "#D9411A" : "#FFB59E",
  };

  return (
    <div
      style={theme}
      className="flex min-h-screen flex-col bg-(--gym-bg) text-(--gym-text) transition-colors duration-300"
    >
      <MemberNavbar lightMode={lightMode} setLightMode={setLightMode} />

      <div className="flex-1 bg-(--gym-bg)">
        <Routes>
          <Route index element={<Navigate to="member-home" replace />} />

          <Route path="member-home" element={<MemberHome />} />

          <Route
            path="machines-guide"
            element={<MachinesGuide lightMode={lightMode} />}
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
