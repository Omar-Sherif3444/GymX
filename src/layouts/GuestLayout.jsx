import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const GuestLayout = () => {
  const { lightMode, setLightMode } = useTheme();

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar lightMode={lightMode} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </main>
  );
};

export default GuestLayout;
