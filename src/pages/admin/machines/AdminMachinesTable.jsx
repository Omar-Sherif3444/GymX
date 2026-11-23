import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const AdminMachinesTable = ({ machines = [] }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-(--gym-line) bg-(--gym-card)">
      {/* Table Header */}
      <div className="flex flex-col gap-1 border-b border-(--gym-line) px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-[Big_Shoulders_Display] text-2xl font-bold uppercase text-(--gym-text)">
            Equipment Inventory
          </h3>

          <p className="mt-1 font-[Barlow] text-sm text-(--gym-subtext)">
            Manage and monitor your gym equipment.
          </p>
        </div>

        <span className="font-[Barlow] text-xs font-semibold uppercase tracking-wider text-(--gym-label)">
          {machines.length} Machines
        </span>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-212.5 border-collapse text-left">
          <thead>
            <tr className="border-b border-(--gym-line) bg-(--gym-surface)">
              {[
                "Machine",
                "Category",
                "Body Type",
                "Difficulty",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-4 font-[Barlow] text-xs font-bold uppercase tracking-wider text-(--gym-subtext)"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {machines.map((machine) => (
              <tr
                key={machine.id}
                className="border-b border-(--gym-line) last:border-0 transition-colors hover:bg-(--gym-surface)"
              >
                {/* Machine */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-22 w-22 shrink-0 overflow-hidden rounded-xl border border-(--gym-line) bg-(--gym-surface)">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-[Barlow] text-base font-bold text-(--gym-text)">
                        {machine.name}
                      </p>

                      <p className="mt-1 font-[Barlow] text-sm text-(--gym-subtext)">
                        ID: #{machine.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {(machine.categories || []).map((category) => (
                      <span
                        key={category}
                        className="rounded-md border border-(--gym-line) bg-(--gym-surface) px-2 py-1 font-[Barlow] text-xs capitalize text-(--gym-text)"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Body Type */}
                <td className="px-5 py-5">
                  <span className="font-[Barlow] text-sm capitalize text-(--gym-subtext)">
                    {machine.bodyType || "—"}
                  </span>
                </td>

                {/* Difficulty */}
                <td className="px-5 py-5">
                  <span className="font-[Barlow] text-sm capitalize text-(--gym-subtext)">
                    {machine.difficulty || "—"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-5">
                  <div className="flex items-center gap-2">
                    <EditButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>
            ))}

            {machines.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center">
                  <p className="font-[Big_Shoulders_Display] text-2xl font-bold uppercase text-(--gym-text)">
                    No Machines Found
                  </p>

                  <p className="mt-2 font-[Barlow] text-sm text-(--gym-subtext)">
                    No equipment is available to display.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMachinesTable;
