import { Routes, Route, Navigate } from "react-router-dom";
import MemberNavbar from "../pages/member/member navbar/MemberNavbar";

import MemberHome from "../pages/member/MemberHome";
import MachinesGuide from "../pages/member/MachinesGuide";
import MemberPass from "../pages/member/MemberPass";
import MemberHistory from "../pages/member/MemberHistory";
import Plans from "../pages/member/Plans";
import Store from "../pages/member/Store";
import NotFound from "../pages/public/NotFound";

const MemberLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <MemberNavbar />

      <div className="flex-1">
        <Routes>
          <Route index element={<Navigate to="member-home" replace />} />
          <Route path="member-home" element={<MemberHome />} />
          <Route path="machines-guide" element={<MachinesGuide />} />
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
