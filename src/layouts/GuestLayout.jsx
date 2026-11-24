import { Routes, Route } from "react-router-dom";
import { landingTokens } from "../components/theme";
import { useLandingTheme } from "../components/useLandingTheme";
import MachinesContext from "../context/MachinesContext";
import MachinesGuide from "../pages/member/MachinesGuide";
import Plans from "../pages/member/Plans";
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


      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route
            path="machines"
            element={
              <MachinesContext>
                <MachinesGuide />
              </MachinesContext>
            }
          />
          <Route path="plans" element={<Plans />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>


    </main>
  );
};

export default GuestLayout;