import { useState } from "react";
import { NavLink } from "react-router-dom";

const memberNavLinks = [
  { name: "Home", to: "/member/member-home" },
  { name: "Machines", to: "/member/machines-guide" },
  { name: "Plans", to: "/member/plans" },
  { name: "Store", to: "/member/store" },
  { name: "History", to: "/member/history" },
  { name: "Qr Pass", to: "/member/member-pass" },
  { name: "Logout", to: "/" },
];

const MemberNavbar = ({ setLightMode, lightMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const desktopLinkClass = ({ isActive }) =>
    `relative text-sm font-medium font-[Barlow] transition-colors
    hover:text-[#FF5A1F]
    after:content-[''] after:absolute after:left-0 after:-bottom-3
    after:w-full after:h-px after:bg-[#FF5A1F] after:transition-transform
    ${
      isActive
        ? "text-[#FF5A1F] after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-6 py-3 text-sm font-medium font-[Barlow] transition-colors
    hover:text-[#FF5A1F]
    ${isActive ? "text-[#FF5A1F]" : "text-(--gym-text)"}`;

  return (
    <header>
      <nav className="relative z-50 w-full border-b border-(--gym-line) bg-(--gym-surface) text-(--gym-text) transition-colors duration-300">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-12 transition-colors">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={`${lightMode ? "/gymx-crossbells-light-inverted.svg" : "/gymx-crossbells-detailed.svg"}`}
              width="40"
              alt="GYMX logo"
            />
            <h1 className="font-[Anton] text-2xl font-normal tracking-wide">
              GYMX
            </h1>
          </div>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 lg:flex">
            {memberNavLinks.map(({ name, to }) => (
              <NavLink key={to} to={to} className={desktopLinkClass}>
                {name}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
            {/* Theme toggle */}
            <button
              onClick={() => setLightMode(!lightMode)}
              className="flex items-center gap-2"
              aria-label="Toggle theme"
            >
              <div
                className={`flex h-4 w-8 items-center rounded-full p-0.5 ${
                  lightMode ? "bg-[#FFEFE8]" : "bg-[#20242B]"
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-full bg-orange transition-transform duration-300 ${
                    lightMode ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>

              <span className="hidden text-xs font-bold tracking-wide md:block">
                {lightMode ? "DARK MODE" : "LIGHT MODE"}
              </span>
            </button>

            {/* Avatar */}
            <div className="avatar avatar-placeholder">
              <div className="w-10 rounded-full bg-(--gym-card) text-(--gym-text)">
                <span>SY</span>
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 top-full z-50 w-full border-t border-(--gym-line) bg-(--gym-surface) text-(--gym-text) shadow-lg transition-colors duration-300 lg:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {memberNavLinks.map(({ name, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              {name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default MemberNavbar;
