const AdminMachinesTableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-(--gym-line) bg-(--gym-card) animate-pulse">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-(--gym-line) px-5 py-5">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-md bg-(--gym-surface)" />
          <div className="h-4 w-64 max-w-full rounded-md bg-(--gym-surface)" />
        </div>

        <div className="h-4 w-20 rounded-md bg-(--gym-surface)" />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-212.5 border-collapse text-left">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-(--gym-line) bg-(--gym-surface)">
              {[
                "Machine",
                "Category",
                "Body Type",
                "Difficulty",
                "Actions",
              ].map((heading) => (
                <th key={heading} className="px-5 py-4">
                  <div className="h-3 w-16 rounded bg-(--gym-card)" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Skeleton Rows */}
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-(--gym-line) last:border-0"
              >
                {/* Machine */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-22 w-22 shrink-0 rounded-xl bg-(--gym-surface)" />

                    <div className="space-y-2">
                      <div className="h-4 w-28 rounded bg-(--gym-surface)" />
                      <div className="h-3 w-16 rounded bg-(--gym-surface)" />
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-5">
                  <div className="h-6 w-14 rounded-md bg-(--gym-surface)" />
                </td>

                {/* Body Type */}
                <td className="px-5 py-5">
                  <div className="h-4 w-24 rounded bg-(--gym-surface)" />
                </td>

                {/* Difficulty */}
                <td className="px-5 py-5">
                  <div className="h-4 w-20 rounded bg-(--gym-surface)" />
                </td>

                {/* Actions */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-20 rounded-lg bg-(--gym-surface)" />
                    <div className="h-10 w-20 rounded-lg bg-(--gym-surface)" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMachinesTableSkeleton;
