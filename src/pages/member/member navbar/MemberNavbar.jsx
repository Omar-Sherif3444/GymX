import { useState } from "react";

const MemberNavbar = () => {
  const [lightMode, setLightMode] = useState(false);

  const navLinks = [
    "Home",
    "Equipment",
    "plans",
    "store",
    "history",
    "QR pass",
  ];

  return (
    <nav
      className={`w-full px-6 md:px-12 py-4 flex items-center justify-between
      transition-colors  ${
        lightMode ? "bg-white text-gray-900" : "bg-[#0b0d11] text-white"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="gymx-crossbells-detailed.svg" width={"45px"} />

        <h1 className="text-2xl font-black font-[Anton]">GYMX</h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
            className="relative text-sm font-medium
            after:content-[''] after:absolute
            after:left-0 after:-bottom-3
            after:w-full after:h-px
            after:bg-[#ff542e]
            after:scale-x-0 hover:after:scale-x-100
            after:transition-transform
            hover:text-[#ff542e] transition-colors
            font-[Barlow] 
            "
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 md:gap-8">
        {/* Theme Toggle */}
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

          <span className="hidden sm:block text-xs font-bold tracking-wide">
            {lightMode ? "DARK MODE" : "LIGHT MODE"}
          </span>
        </button>

        {/* Avatar*/}
        <div className="avatar avatar-placeholder">
          <div className=" sm:min-w-2.5 max-w-10 text-neutral-content w-12 rounded-full bg-gray-800">
            <span>SY</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MemberNavbar;
