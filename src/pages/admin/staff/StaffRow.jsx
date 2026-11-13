import { FiEdit2, FiTrash2 } from "react-icons/fi";

const StaffRow = ({ member }) => {
  const isActive = member.status === "Active";

  return (
    <tr className="border-b border-(--gym-line) hover:bg-(--gym-surface)">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF542E] font-bold text-white">
            {member.name.charAt(0)}
          </div>
          <span className="font-semibold">{member.name}</span>
        </div>
      </td>
      <td className="p-4">{member.role}</td>
      <td className="p-4 text-(--gym-subtext)">
        <div>{member.phone}</div>
        <div className="text-xs">{member.email}</div>
      </td>
      <td className="p-4 text-(--gym-subtext)">{member.permissions}</td>
      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isActive ? "bg-green-500/15 text-green-500" : "bg-gray-500/15 text-gray-400"
          }`}
        >
          {member.status}
        </span>
      </td>
      <td className="p-4 text-(--gym-subtext)">{member.lastActive}</td>
      <td className="p-4">
        <div className="flex gap-3 text-(--gym-subtext)">
          <button className="hover:text-[#FF542E]"><FiEdit2 /></button>
          <button className="hover:text-red-500"><FiTrash2 /></button>
        </div>
      </td>
    </tr>
  );
};

export default StaffRow;
