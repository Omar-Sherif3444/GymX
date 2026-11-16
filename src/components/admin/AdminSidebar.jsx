import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuUsers,
  LuScanLine,
  LuDumbbell,
  LuShoppingBag,
  LuFilter,
  LuFileText,
  LuChartNoAxesColumnIncreasing,
  LuUser,
} from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";
import logoDark from "../../assets/logo-dark.png";
import logoLight from "../../assets/logo-light.png";

const base = "/admin";

const links = [
  { to: "", label: "Dashboard", icon: LuLayoutDashboard },
  { to: "/members", label: "Members", icon: LuUsers },
  { to: "/check-in", label: "Check-in", icon: LuScanLine },
  { to: "/machines", label: "Machines", icon: LuDumbbell },
  { to: "/store", label: "Store", icon: LuShoppingBag },
  { to: "/leads", label: "Leads", icon: LuFilter },
  { to: "/announcements", label: "Announcements", icon: LuFileText },
  { to: "/reports", label: "Reports", icon: LuChartNoAxesColumnIncreasing },
  { to: "/staff", label: "Staff", icon: LuUser },
];

export default function AdminSidebar() {
  const { lightMode } = useTheme();

  return (
    <aside className="sticky top-0 flex h-screen w-16 shrink-0 flex-col border-r border-line bg-bg p-2 lg:w-60 lg:p-3">

      <div className="flex items-center justify-center gap-3 py-4 lg:justify-start lg:px-3">
        <img
          src={lightMode ? logoLight : logoDark}
          alt="GymX"
          className="h-15 w-15 shrink-0 object-contain lg:h-14 lg:w-auto"
        />
      </div>

     
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={base + to}
            end={to === ""}
            className={({ isActive }) =>
              `flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm transition lg:justify-start ${
                isActive
                  ? "bg-orange/15 text-orange"
                  : "text-sub hover:bg-bg2 hover:text-ink"
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      
      <div className="flex items-center justify-center gap-3 border-t border-line pt-4 lg:justify-start lg:px-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bg2 text-xs font-bold text-ink">
          A
        </span>
        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-ink">Admin</p>
          <p className="text-xs text-sub">Staff</p>
        </div>
      </div>
    </aside>
  );
}
