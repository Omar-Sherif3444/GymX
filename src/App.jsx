import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateLayout from "./layouts/PrivateLayout";
import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  return (
    <main>
      <ThemeProvider>
        <Routes>
          <Route element={<PrivateLayout />}>
            <Route path="/member/*" element={<MemberLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
          </Route>
          <Route path="/*" element={<GuestLayout />} />
        </Routes>
      </ThemeProvider>
    </main>
  );
};

export default App;
