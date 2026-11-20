import { useLandingTheme } from "./useLandingTheme";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

export default function Footer() {
  const { theme } = useLandingTheme();

  return (
    <footer className="flex justify-between gap-2.5 border-t border-(--lp-line) px-7 py-5.5 text-xs text-(--lp-sub)">
      <img
        src={theme === "dark" ? logoDark : logoLight}
        alt="GYM X"
        height={28}
        className="block h-7 w-auto"
      />
      <span>Your gym, connected.</span>
    </footer>
  );
}
