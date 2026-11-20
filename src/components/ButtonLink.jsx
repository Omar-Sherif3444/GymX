import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const VARIANTS = {
  primary: "bg-[linear-gradient(135deg,#ff7a1a_0%,#ff3d2e_55%,#e5214a_100%)] text-white",
  outline: "border border-(--lp-rose) text-(--lp-label)",
  dark: "bg-[#1A0B08] text-[#FFB59E]",
};

/**
 * Router-based button (renders a <Link>, never a raw anchor).
 * - variant: primary | outline | dark
 * - arrow:   show the ↗ icon
 * - full:    stretch to the card width with the label left / arrow right (pricing cards)
 */
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
