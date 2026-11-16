const MemberStats = ({ stats }) => {
  return (
    <section className="grid grid-cols-2 gap-3 ">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-(--gym-card) border border-(--gym-line) rounded-xl p-4 sm:p-5"
        >
          <h3 className="text-3xl sm:text-4xl font-bold font-['Big_Shoulders_Display'] text-(--gym-text)">
            {stat.value}
          </h3>

          <p className="text-xs sm:text-sm font-semibold font-['Barlow'] text-(--gym-subtext) uppercase tracking-wide mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
};

export default MemberStats;
