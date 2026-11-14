const RecentVisits = ({ visits }) => {
  return (
    <section className="bg-(--gym-card) border border-(--gym-line) rounded-xl p-4 sm:p-5">
      <p className="text-sm font-bold font-['Barlow'] text-(--gym-label) uppercase tracking-wide mb-4">
        Recent visits
      </p>

      <div className="space-y-3">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="flex justify-between items-center gap-3 border-b border-(--gym-line) pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm font-medium font-['DM_Sans'] text-(--gym-text)">
              {visit.date}
            </span>

            <span className="text-sm font-['DM_Sans'] text-(--gym-subtext) whitespace-nowrap">
              {visit.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentVisits;
