import { Outlet } from "react-router-dom";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

// data-theme on this wrapper drives the CSS variables in index.css (no DOM code needed).
function ThemedShell() {
  const { theme } = useTheme();

  return (
    <div data-theme={theme} className="min-h-screen bg-bg font-body leading-normal text-ink">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function MainLayout() {
  return (
    <ThemeProvider>
      <ThemedShell />
    </ThemeProvider>
  );
}
