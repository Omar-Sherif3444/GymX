import { useTheme } from "../context/ThemeContext"; // the TEAM's context, used as-is

/**
 * Bridge between the team's ThemeContext ({ lightMode, setLightMode })
 * and the landing components ({ theme, toggleTheme }).
 * The team's ThemeContext is never modified.
 */
export function useLandingTheme() {
  const ctx = useTheme();
  if (!ctx) throw new Error("LandingPage must be rendered inside the team's <ThemeProvider>");

  const { lightMode, setLightMode } = ctx;
  return {
    theme: lightMode ? "light" : "dark",
    toggleTheme: () => setLightMode((value) => !value),
  };
}
