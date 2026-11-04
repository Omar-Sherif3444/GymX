import { Routes, Route } from "react-router-dom";

import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/member/*" element={<MemberLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/*" element={<GuestLayout />} />
    </Routes>
  );
};

export default App;
