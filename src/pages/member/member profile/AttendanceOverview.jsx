import AttendanceCalendar from "./AttendanceCalendar";

const AttendanceOverview = ({ attendance }) => {
  const percentage = Math.min(
    (attendance.visits / attendance.target) * 100,
    100,
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] border border-(--gym-line) rounded-xl overflow-hidden bg-(--gym-card)">
      {/* Attendance information */}
      <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-(--gym-line)">
        <p className="text-sm font-bold font-['Barlow'] text-(--gym-label) uppercase tracking-wide">
          Attendance
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold font-['Anton'] text-(--gym-text) mt-2">
          <span className="text-[#FF503C]">{attendance.visits}</span> VISITS IN{" "}
          {attendance.month.toUpperCase()}
        </h2>

        <span className="inline-block text-xs sm:text-sm font-medium font-['DM_Sans'] mt-3 px-3 py-1.5 rounded-full bg-(--gym-surface) text-(--gym-label)">
          Monthly attendance
        </span>

        {/* Progress */}
        <div className="mt-7">
          <div className="flex justify-between text-sm font-['DM_Sans'] text-(--gym-subtext) mb-2">
            <span>Monthly goal</span>
            <span>{Math.round(percentage)}%</span>
          </div>

          <div className="h-2 rounded-full bg-(--gym-surface) overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#FF7A1A] to-[#FF3D4A] transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="mt-6">
          <p className="text-sm font-['DM_Sans'] text-(--gym-subtext)">
            Last check-in
          </p>

          <button
            type="button"
            className="mt-3 bg-[#FF503C] text-white text-sm font-bold font-['Barlow'] px-4 py-2.5 rounded-md hover:opacity-90 transition"
          >
            Check in now / Show QR
          </button>
        </div>
      </div>

      {/* Calendar */}
      <AttendanceCalendar attendance={attendance} />
    </section>
  );
};

export default AttendanceOverview;
