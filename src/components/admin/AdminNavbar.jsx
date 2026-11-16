import { useState } from "react";
import { Link } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";

export default function AdminNavbar() {
  const { lightMode: isLight, setLightMode } = useTheme();
  const toggleTheme = () => setLightMode((v) => !v);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const outlineBtn =
    "rounded-lg border border-line px-3 py-2 text-xs text-start font-semibold text-ink transition hover:bg-bg2";

  
  const actions = (
    <>
      <Link to="/admin/check-in" onClick={closeMenu} className={outlineBtn}>
        Scan check-in
      </Link>
      <Link
        to="/admin/announcements"
        onClick={closeMenu}
        className={outlineBtn}
      >
        + Announcement
      </Link>
      <Link
        to="/admin/members/new"
        onClick={closeMenu}
        className="rounded-lg bg-orange px-3 py-2 text-xs font-bold text-black transition hover:brightness-110"
      >
        + New member
      </Link>

      <button className={outlineBtn} onClick={toggleTheme}>
        {isLight ? "Dark" : "Light"}
      </button>

      <span className="grid size-8 place-items-center rounded-full bg-bg2 text-xs font-bold text-ink">
        A
      </span>
    </>
  );

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
     
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <input
          placeholder="Search name, phone, or membership no."
          className="min-w-0 max-w-md flex-1 rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink outline-none placeholder:text-sub focus:border-line"
        />

        
        <div className="ml-auto hidden items-center gap-2 md:flex">
          {actions}
        </div>

        {/* Mobile menu button */}
        <button
          className={`${outlineBtn} ml-auto md:hidden`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? <LuX size={18} /> : <LuMenu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="flex flex-col justify-start gap-2 border-t border-line bg-bg px-4 py-3 md:hidden">
          {actions}
        </div>
      )}
    </header>
  );
}
