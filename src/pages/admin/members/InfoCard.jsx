// rows: [label, value][] — falsy rows are skipped.
const InfoCard = ({ title, rows }) => (
  <section className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
    <h2 className="mb-3 text-lg font-bold">{title}</h2>
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      {rows.filter(Boolean).map(([label, value]) => (
        <div key={label}>
          <dt className="text-(--gym-subtext)">{label}</dt>
          <dd className="font-semibold break-words">{value || "—"}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default InfoCard;
