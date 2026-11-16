const AttendanceCalendar = ({ attendance }) => {
  const { month, year, attendedDays } = attendance;

  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

  const firstDay = new Date(year, monthIndex, 1).getDay();

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex-1 min-w-0 p-4 sm:p-5">
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold font-['Barlow'] text-(--gym-text)">
          {month} {year}
        </h3>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-xs sm:text-sm font-semibold font-['Barlow'] text-center text-(--gym-subtext) py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((day, index) => {
          const attended = attendedDays.includes(day);

          return (
            <div
              key={index}
              className={`aspect-square rounded-md flex items-center justify-center text-xs sm:text-sm font-semibold font-['DM_Sans'] transition-colors
                ${
                  day === null
                    ? "invisible"
                    : attended
                      ? "bg-linear-to-br from-[#FF7434] to-[#FF3D4A] text-white"
                      : "bg-(--gym-surface) text-(--gym-subtext)"
                }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs sm:text-sm font-['DM_Sans'] text-(--gym-subtext)">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF503C]" />
          Attended
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-(--gym-surface)" />
          No visit
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
