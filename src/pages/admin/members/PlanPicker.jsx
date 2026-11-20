import { FiCheck } from "react-icons/fi";
import { PLANS, formatEGP } from "./membersApi";

const PlanPicker = ({ value, onChange, error }) => (
  <div
    id="planId"
    tabIndex={-1}
    role="radiogroup"
    aria-label="Membership plan"
    aria-describedby={error ? "planId-error" : undefined}
    className="grid grid-cols-1 gap-3 outline-none sm:grid-cols-2"
  >
    {PLANS.map((plan) => {
      const selected = value === plan.id;
      return (
        <label
          key={plan.id}
          className={`relative cursor-pointer rounded-xl border p-4 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-[#FF542E] ${
            selected ? "border-[#FF542E] bg-[#FF542E]/10" : error ? "border-red-500" : "border-(--gym-line) hover:bg-(--gym-surface)"
          }`}
        >
          <input
            type="radio"
            name="plan"
            value={plan.id}
            checked={selected}
            onChange={() => onChange(plan.id)}
            className="sr-only"
          />
          <span className="block text-sm font-semibold">{plan.name}</span>
          <span className="mt-1 block font-[Anton] text-2xl">{formatEGP(plan.price)}</span>
          <span className="block text-xs text-(--gym-subtext)">
            {plan.months} month{plan.months > 1 ? "s" : ""} · {formatEGP(Math.round(plan.price / plan.months))}/month
          </span>
          {selected && <FiCheck className="absolute right-4 top-4 text-lg text-[#FF542E]" />}
        </label>
      );
    })}
  </div>
);

export default PlanPicker;
