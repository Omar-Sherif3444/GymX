import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ButtonLink from "./ButtonLink";
import { useLandingTheme } from "./useLandingTheme";
import { NAV_ITEMS } from "../data/landingData";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

export default function LandingNavbar() {
  const { theme, toggleTheme } = useLandingTheme();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Items with "to" (Machines, Plans) are active when we're on their own page.
  // The other items are active when we're on the landing page and the URL hash matches.
  const isActive = (item) =>
    item.to
      ? pathname === item.to
      : pathname === "/" && item.activeFor.includes(hash);

  const hrefFor = (item) => item.to ?? `/${item.hash}`;

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer rounded-md border border-(--lp-line) px-3 py-[5px] text-xs font-medium text-(--lp-sub)"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );

  return (
    <header className="[text-shadow:var(--lp-nav-shadow)] sticky top-0 z-50 -mb-[62px] text-(--lp-nav) backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-7">
        <Link to="/" onClick={closeMenu}>
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="GYM X"
            height={36}
            className="block h-9 w-auto"
          />
        </Link>

        {/* Desktop links (large screens only) */}
        <nav className="hidden gap-[26px] text-[13px] font-medium lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={hrefFor(item)}
              className={`border-b-2 py-1.5 ${isActive(item) ? "border-(--lp-orange)" : "border-transparent"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions (large screens only) */}
        <div className="hidden items-center gap-3.5 text-[13px] font-semibold lg:flex">
          {themeButton}
          <Link to="/login">Log in</Link>
          <ButtonLink to="/register">Join your gym</ButtonLink>
        </div>

        {/* Menu button (phones and tablets) */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="cursor-pointer rounded-md border border-(--lp-line) p-2 text-2xl leading-none lg:hidden"
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu: opens under the bar and covers the page without moving it */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex flex-col border-b border-(--lp-line) bg-(--lp-card) px-4 pb-5 pt-2 text-(--lp-ink) [text-shadow:none] sm:px-7 lg:hidden"
        >
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={hrefFor(item)}
                onClick={closeMenu}
                className={`border-l-2 px-3 py-3 text-[15px] font-medium ${isActive(item)
                  ? "border-(--lp-orange) text-(--lp-orange)"
                  : "border-transparent"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-3 border-t border-(--lp-line) pt-4 text-[13px] font-semibold">
            <div className="flex items-center justify-between gap-3">
              <Link to="/login" onClick={closeMenu} className="py-2 text-[15px]">
                Log in
              </Link>
              {themeButton}
            </div>
            <div onClick={closeMenu}>
              <ButtonLink to="/register" full arrow>
                Join your gym
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}