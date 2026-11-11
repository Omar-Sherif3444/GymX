// highlight = the dark "needs attention" card from the admin design.
const StatCard = ({ label, value, hint, highlight = false }) => (
  <div
    className={`rounded-xl border p-5 ${
      highlight ? "border-[#0F0F12] bg-[#0F0F12] text-[#F4EFEA]" : "border-(--gym-line) bg-(--gym-card)"
    }`}
  >
    <p className={`text-sm ${highlight ? "text-[#C9C2BB]" : "text-(--gym-subtext)"}`}>{label}</p>
    <p className={`mt-1 font-[Anton] text-4xl ${highlight ? "text-[#FF542E]" : ""}`}>{value}</p>
    {hint && <p className={`mt-1 text-xs ${highlight ? "text-[#FFB59E]" : "text-(--gym-subtext)"}`}>{hint}</p>}
  </div>
);

export default StatCard;
