import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const VARIANTS = {
  primary: "bg-grad text-white",
  outline: "border border-rose text-label",
  dark: "bg-[#1A0B08] text-[#FFB59E]",
};

export default function ButtonLink({ to, variant = "primary", arrow = false, full = false, children }) {
  const layout = full
    ? "flex w-full items-center justify-between px-[18px] py-3.5"
    : `inline-flex items-center gap-1 ${variant === "dark" ? "px-5 py-3" : "px-[18px] py-[11px]"}`;

  return (
    <Link to={to} className={`${layout} ${VARIANTS[variant]} rounded-[5px] text-[13px] font-semibold`}>
      <span>{children}</span>
      {arrow && <FiArrowUpRight aria-hidden="true" />}
    </Link>
  );
}
