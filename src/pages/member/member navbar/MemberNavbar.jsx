import { useState } from "react";
import { NavLink } from "react-router-dom";

const memberNavLinks = [
  { name: "Home", to: "/member/member-home" },
  { name: "Machines", to: "/member/machines-guide" },
  { name: "Plans", to: "/member/plans" },
  { name: "Store", to: "/member/store" },
  { name: "History", to: "/member/history" },
  { name: "Qr Pass", to: "/member/member-pass" },
  { name: "logout", to: "/" },
];

const MemberNavbar = () => {
  const [lightMode, setLightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const themeClasses = lightMode
    ? "bg-white text-gray-900"
    : "bg-[#0b0d11] text-white";

  // Desktop link: underline animation + highlight when active
  const desktopLinkClass = ({ isActive }) =>
    `relative text-sm font-medium font-[Barlow] transition-colors hover:text-[#ff542e]
    after:content-[''] after:absolute after:left-0 after:-bottom-3
    after:w-full after:h-px after:bg-[#ff542e] after:transition-transform
    ${
      isActive
        ? "text-[#ff542e] after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  // Mobile link: full-width row
  const mobileLinkClass = ({ isActive }) =>
    `block px-6 py-3 text-sm font-medium font-[Barlow] transition-colors hover:text-[#ff542e]
    ${isActive ? "text-[#ff542e]" : ""}`;

  return (
    <nav className={`relative w-full transition-colors ${themeClasses}`}>
      <div className="px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/gymx-crossbells-detailed.svg" width="40" alt="GYMX logo" />
          <h1 className="text-2xl font-normal tracking-wide font-[Anton]">
            GYMX
          </h1>{" "}
        </div>

        {/* Desktop links (lg and up) */}
        <div className="hidden lg:flex items-center gap-10">
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
              className={`w-8 h-4 rounded-full flex items-center p-0.5
              ${lightMode ? "bg-gray-300" : "bg-[#20242b]"}`}
            >
              <span
                className={`w-3 h-3 rounded-full bg-[#ff542e]
                transition-transform duration-300 ${
                  lightMode ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>

            <span className="hidden md:block text-xs font-bold tracking-wide">
              {lightMode ? "DARK MODE" : "LIGHT MODE"}
            </span>
          </button>

          {/* Avatar */}
          <div className="avatar avatar-placeholder">
            <div className="w-10 rounded-full bg-gray-800 text-neutral-content">
              <span>SY</span>
            </div>
          </div>

          {/* Hamburger (below lg) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1"
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

      {/* Mobile menu (below lg) */}
      <div
        className={`lg:hidden absolute left-0 top-full z-50 w-full border-t border-white/10 shadow-lg
        ${themeClasses} ${menuOpen ? "block" : "hidden"}`}
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
  );
};

export default MemberNavbar;
