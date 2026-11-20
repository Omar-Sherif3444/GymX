import { Link, useLocation } from "react-router-dom";
import ButtonLink from "./ButtonLink";
import { useLandingTheme } from "./useLandingTheme";
import { NAV_ITEMS } from "../data/landingData";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

export default function LandingNavbar() {
  const { theme, toggleTheme } = useLandingTheme();
  const { pathname, hash } = useLocation();

  // A section link is "active" when we're on the landing page and the URL hash matches it.
  const isActive = (item) => pathname === "/" && item.activeFor.includes(hash);

  return (
    <header className="text-shadow:(--lp-nav-shadow) sticky top-0 z-50 -mb-15.5 flex items-center justify-between gap-3 px-7 py-3.5 text-(--lp-nav) backdrop-blur-sm">
      <Link to="/">
        <img
          src={theme === "dark" ? logoDark : logoLight}
          alt="GYM X"
          height={36}
          className="block h-9 w-auto"
        />
      </Link>

      <nav className="hidden gap-6.5 text-[13px] font-medium md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={`/${item.hash}`}
            className={`border-b-2 py-1.5 ${isActive(item) ? "border-(--lp-orange)" : "border-transparent"}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3.5 text-[13px] font-semibold">
        <button
          type="button"
          onClick={toggleTheme}
          className="cursor-pointer rounded-md border border-(--lp-line) px-3 py-1.25 text-xs font-medium text-(--lp-sub)"
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <Link to="/login">Log in</Link>
        <ButtonLink to="/register">Join your gym</ButtonLink>
      </div>
    </header>
  );
}
