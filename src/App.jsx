import { Routes, Route } from "react-router-dom";

import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/member/*" element={<MemberLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<GuestLayout />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
