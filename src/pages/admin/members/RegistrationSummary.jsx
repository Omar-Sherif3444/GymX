import { getPlan, addMonths, formatDate, formatEGP } from "./membersApi";

const RegistrationSummary = ({ form, submitting, onCancel }) => {
  const plan = getPlan(form.planId);
  const rows = [
    ["Member", form.name.trim()],
    ["Plan", plan?.name],
    ["Start date", form.startDate && formatDate(form.startDate)],
    ["End date", plan && form.startDate && formatDate(addMonths(form.startDate, plan.months))],
    ["Payment", form.paymentMethod],
  ];

  return (
    <aside className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5 lg:sticky lg:top-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-(--gym-label)">Summary</h2>

      <dl className="mt-4 space-y-3 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-(--gym-subtext)">{label}</dt>
            <dd className="text-right font-semibold">{value || "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-end justify-between border-t border-(--gym-line) pt-4">
        <span className="text-sm text-(--gym-subtext)">Total due</span>
        <span className="font-[Anton] text-3xl text-[#FF542E]">{plan ? formatEGP(plan.price) : "—"}</span>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#FF542E] text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {submitting && <span className="loading loading-spinner loading-sm" />}
          {submitting ? "Registering…" : "Register member"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="h-12 rounded-md border border-(--gym-line) text-sm font-semibold hover:bg-(--gym-surface) disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </aside>
  );
};

export default RegistrationSummary;
