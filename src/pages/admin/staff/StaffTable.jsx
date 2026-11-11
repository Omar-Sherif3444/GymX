import StaffRow from "./StaffRow";
import StaffCard from "./StaffCard";

const headers = ["Name", "Role", "Contact", "Permissions", "Status", "Last active", "Actions"];

const StaffTable = ({ staff }) => {
  if (staff.length === 0) {
    return (
      <div className="rounded-md border border-(--gym-line) bg-(--gym-card) p-12 text-center text-(--gym-subtext)">
        No staff found.
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col gap-3 md:hidden">
      {staff.map((member) => (
        <StaffCard key={member.id} member={member} />
      ))}
    </div>
    <div className="hidden overflow-x-auto rounded-md border border-(--gym-line) bg-(--gym-card) md:block">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-(--gym-label)">
          <tr className="border-b border-(--gym-line)">
            {headers.map((h) => (
              <th key={h} className="p-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <StaffRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default StaffTable;
