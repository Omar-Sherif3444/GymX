import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";
import Landing from "./pages/public/Landing";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateLayout from "./layouts/PrivateLayout";
import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route path="/member/*" element={<MemberLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/guest/*" element={<GuestLayout />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
