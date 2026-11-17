import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { landingTokens } from "../components/theme";
import { useLandingTheme } from "../components/useLandingTheme";

import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";

const GuestLayout = () => {
  const { theme } = useLandingTheme();

  return (
    <main
      style={landingTokens(theme)}
      className="flex min-h-screen flex-col font-(family-name:--lp-font-body) leading-normal text-(--lp-ink)"
    >
      <Navbar />

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