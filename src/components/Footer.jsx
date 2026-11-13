import { useTheme } from "../context/ThemeContext";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="flex justify-between gap-2.5 border-t border-line px-7 py-[22px] text-xs text-sub">
      <img src={theme === "dark" ? logoDark : logoLight} alt="GYM X" height={28} className="block h-7 w-auto" />
      <span>Your gym, connected.</span>
    </footer>
  );
}
