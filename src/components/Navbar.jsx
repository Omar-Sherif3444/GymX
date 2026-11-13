import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { NAV_ITEMS } from "../data/landing";
import ButtonLink from "./ButtonLink";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { pathname, hash } = useLocation();

    // A section link is "active" when we're on the landing page and the URL hash matches it.
    const isActive = (item) => pathname === "/" && item.activeFor.includes(hash);

    return (
        <header className="nav-shadow sticky top-0 z-50 -mb-[62px] flex items-center justify-between gap-3 px-7 py-3.5 text-nav backdrop-blur-sm">
            <Link to="/">
                <img src={theme === "dark" ? logoDark : logoLight} alt="GYM X" height={36} className="block h-9 w-auto" />
            </Link>

            <nav className="hidden gap-[26px] text-[13px] font-medium md:flex">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        to={`/${item.hash}`}
                        className={`border-b-2 py-1.5 ${isActive(item) ? "border-orange" : "border-transparent"}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-3.5 text-[13px] font-semibold">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="cursor-pointer rounded-md border border-line px-3 py-[5px] text-xs font-medium text-sub"
                >
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
                <Link to="/login">Log in</Link>
                <ButtonLink to="/register">Join your gym</ButtonLink>
            </div>
        </header>
    );
}
