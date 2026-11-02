import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/home", label: "Member" },
  { to: "/machines", label: "Machines" },
  { to: "/pass", label: "Pass" },
];

const Header = () => {
  return (
    <header className="navbar bg-base-200 px-6 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          GYM<span className="text-orange-500">X</span>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              isActive ? "font-semibold text-orange-500" : "hover:text-orange-500"
            }
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/login" className="btn btn-sm btn-primary">
          Log in
        </Link>
      </nav>
    </header>
  );
};

export default Header;
