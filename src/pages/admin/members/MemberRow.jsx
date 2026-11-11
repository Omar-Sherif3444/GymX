import { Link } from "react-router-dom";
import { FiEye, FiRefreshCw, FiPauseCircle, FiPlayCircle, FiKey } from "react-icons/fi";
import MemberAvatar from "./MemberAvatar";
import StatusBadge from "./StatusBadge";
import { getPlan, getStatus, formatDate } from "./membersApi";

const iconButton = "rounded-md p-2 text-base text-(--gym-subtext) hover:bg-(--gym-surface)";

const MemberRow = ({ member, onAction }) => {
  const status = getStatus(member);
  const frozen = status === "Frozen";

  return (
    <tr className="border-b border-(--gym-line) hover:bg-(--gym-surface)">
      <td className="p-4">
        <Link to={`/admin/members/${member.id}`} className="flex items-center gap-3 hover:text-[#FF542E]">
          <MemberAvatar member={member} />
          <div>
            <div className="font-semibold">{member.name}</div>
            <div className="text-xs text-(--gym-subtext)">{member.id}</div>
          </div>
        </Link>
      </td>
      <td className="whitespace-nowrap p-4 text-(--gym-subtext)">{member.phone}</td>
      <td className="p-4">{getPlan(member.planId).name}</td>
      <td className="p-4">
        <StatusBadge status={status} />
      </td>
      <td className="whitespace-nowrap p-4 text-(--gym-subtext)">{formatDate(member.joinDate)}</td>
      <td className="whitespace-nowrap p-4 text-(--gym-subtext)">{formatDate(member.endDate)}</td>
      <td className="p-4">
        <div className="flex gap-1">
          <Link to={`/admin/members/${member.id}`} title="View profile" aria-label={`View ${member.name}`} className={`${iconButton} hover:text-[#FF542E]`}>
            <FiEye />
          </Link>
          <button onClick={() => onAction("renew", member)} title="Renew" aria-label={`Renew ${member.name}`} className={`${iconButton} hover:text-green-500`}>
            <FiRefreshCw />
          </button>
          <button
            onClick={() => onAction(frozen ? "unfreeze" : "freeze", member)}
            title={frozen ? "Unfreeze" : "Freeze"}
            aria-label={`${frozen ? "Unfreeze" : "Freeze"} ${member.name}`}
            className={`${iconButton} hover:text-sky-400`}
          >
            {frozen ? <FiPlayCircle /> : <FiPauseCircle />}
          </button>
          <button
            onClick={() => onAction("reset", member)}
            title="Reset password"
            aria-label={`Reset password for ${member.name}`}
            className={`${iconButton} hover:text-amber-500`}
          >
            <FiKey />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MemberRow;
