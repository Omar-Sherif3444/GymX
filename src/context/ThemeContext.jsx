import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);

  const theme = {
    "--gym-bg": lightMode ? "#FFF8F4" : "#0b0d12",
    "--gym-surface": lightMode ? "#FFEFE8" : "#10131A",
    "--gym-card": lightMode ? "#FFFFFF" : "#151821",
    "--gym-text": lightMode ? "#1A0B08" : "#F4EFEA",
    "--gym-subtext": lightMode ? "#5C4A44" : "#C9C2BB",
    "--gym-line": lightMode ? "rgba(255,143,163,0.4)" : "#ff8fa338",
    "--gym-label": lightMode ? "#D9411A" : "#FFB59E",
  };

  return (
    <ThemeContext.Provider value={{ lightMode, setLightMode }}>
      <div
        style={theme}
        className="min-h-screen bg-(--gym-bg) text-(--gym-text) transition-colors duration-300"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
