import { FiHeart, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const MachinesCard = ({ machine }) => {
  const status = {
    working: {
      label: "Available",
      color: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    "under maintenance": {
      label: "Under maintenance",
      color: "text-red-400",
      dot: "bg-red-400",
    },
    "in use": {
      label: "In use",
      color: "text-[#FF5A1F]",
      dot: "bg-[#FF5A1F]",
    },
  };

  const currentStatus = status[machine.state] || status.working;

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-md border border-(--gym-line) bg-(--gym-card) transition-colors hover:border-[#FF5A1F]/60">
      {/* Card Header */}
      <div className="flex h-14 items-center justify-between border-b border-(--gym-line) px-5">
        <span className="font-[Barlow] text-xs font-semibold tracking-wider text-(--gym-subtext)">
          {String(machine.id).padStart(2, "0")}
        </span>
      </div>

      {/* Machine Image */}
      <div className="relative flex h-28 items-center justify-center overflow-hidden border-b border-(--gym-line) bg-(--gym-surface)">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(var(--gym-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--gym-line) 1px, transparent 1px)
            `,
            backgroundSize: "16px 16px",
          }}
        />

        <img
          src={machine.image}
          alt={machine.name}
          className="relative z-10 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Machine Information */}
      <div className="flex flex-1 flex-col px-5 py-5">
        {/* Status & Machine ID */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <span
            className={`flex items-center gap-2 font-[Barlow] text-[11px] font-bold uppercase tracking-wider ${currentStatus.color}`}
          >
            <span className={`h-2 w-2 rounded-full ${currentStatus.dot}`} />
            {currentStatus.label}
          </span>

          <span className="font-[Barlow] text-[10px] font-semibold tracking-wider text-(--gym-subtext)">
            M-{String(machine.id).padStart(2, "0")}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-['Big_Shoulders_Display'] text-2xl font-bold uppercase leading-none text-(--gym-text)">
          {machine.name}
        </h3>

        {/* Target Muscles */}
        <p className="mt-2 font-[DM_Sans] text-xs capitalize text-(--gym-subtext)">
          {Array.isArray(machine.muscle)
            ? machine.muscle.join(" · ")
            : machine.muscle}
        </p>

        {/* Difficulty & Zone */}
        <div className="mt-5 flex flex-wrap items-center gap-2 font-[DM_Sans] text-[10px] text-(--gym-subtext)">
          <span>{machine.bodyType}</span>
          <span>·</span>
          <span className="capitalize">{machine.difficulty || "Unknown"}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-(--gym-line)">
        {machine.state === "under maintenance" ? (
          <div className="flex h-14 items-center justify-between px-5 text-xs font-bold text-(--gym-subtext)">
            <span>Currently unavailable</span>
          </div>
        ) : (
          <Link
            to={`/member/machines-guide/${machine.id}`}
            className="flex h-14 items-center justify-between px-5 font-[DM_Sans] text-xs font-bold text-[#FF5A1F] transition-colors hover:bg-[#FF5A1F]/10"
          >
            <span>View Details</span>
            <FiArrowUpRight className="text-lg" />
          </Link>
        )}
      </div>
    </article>
  );
};

export default MachinesCard;
