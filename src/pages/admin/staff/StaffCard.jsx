import { FiEdit2, FiTrash2 } from "react-icons/fi";

const StaffCard = ({ member }) => {
  const isActive = member.status === "Active";

  return (
    <div className="rounded-md border border-(--gym-line) bg-(--gym-card) p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF542E] font-bold text-white">
            {member.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="truncate font-semibold">{member.name}</div>
            <div className="text-xs text-(--gym-subtext)">{member.role}</div>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            isActive ? "bg-green-500/15 text-green-500" : "bg-gray-500/15 text-gray-400"
          }`}
        >
          {member.status}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-(--gym-subtext)">
        <div>{member.phone}</div>
        <div className="break-all text-xs">{member.email}</div>
        <div className="text-xs">{member.permissions}</div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-(--gym-line) pt-3">
        <span className="text-xs text-(--gym-subtext)">Last active: {member.lastActive}</span>
        <div className="flex gap-4 text-base text-(--gym-subtext)">
          <button className="hover:text-[#FF542E]"><FiEdit2 /></button>
          <button className="hover:text-red-500"><FiTrash2 /></button>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
