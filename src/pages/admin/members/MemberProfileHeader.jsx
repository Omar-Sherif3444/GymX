import { FiRefreshCw, FiPauseCircle, FiPlayCircle, FiKey, FiEdit2 } from "react-icons/fi";
import MemberAvatar from "./MemberAvatar";
import StatusBadge from "./StatusBadge";
import { getPlan, getStatus, daysBetween, formatDate, todayISO } from "./membersApi";

const banners = {
  Expiring: "border-amber-500/40 bg-amber-500/10 text-amber-500",
  Expired: "border-red-500/40 bg-red-500/10 text-red-500",
  Frozen: "border-sky-500/40 bg-sky-500/10 text-sky-400",
};

const bannerText = (status, member, daysLeft) =>
  ({
    Expiring: `Membership ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"} (${formatDate(member.endDate)}). Renew to avoid blocked check-ins.`,
    Expired: `Membership expired on ${formatDate(member.endDate)}. Check-ins are blocked until it's renewed.`,
    Frozen: `Membership is frozen until ${formatDate(member.frozenUntil)}. Check-ins are blocked while frozen.`,
  })[status];

const secondaryButton =
  "flex h-11 items-center gap-2 rounded-md border border-(--gym-line) bg-(--gym-card) px-4 text-sm font-semibold hover:bg-(--gym-surface)";

const MemberProfileHeader = ({ member, onAction }) => {
  const status = getStatus(member);
  const daysLeft = Math.max(0, daysBetween(todayISO(), member.endDate));
  const frozen = status === "Frozen";

  return (
    <section className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <MemberAvatar member={member} size="h-20 w-20 text-2xl" />
          <div>
            <h1 className="font-[Anton] text-3xl uppercase sm:text-4xl">{member.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-(--gym-subtext)">
              <span>{member.id}</span>
              <span aria-hidden="true">·</span>
              <span>{getPlan(member.planId).name} plan</span>
              <StatusBadge status={status} />
            </div>
            {status !== "Expired" && (
              <p className="mt-1 text-sm">
                <b className="font-[Anton] text-xl text-[#FF542E]">{daysLeft}</b>{" "}
                <span className="text-(--gym-subtext)">days left</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => onAction("renew")} className="flex h-11 items-center gap-2 rounded-md bg-[#FF542E] px-4 text-sm font-semibold text-white hover:opacity-90">
            <FiRefreshCw /> Renew
          </button>
          <button onClick={() => onAction(frozen ? "unfreeze" : "freeze")} className={secondaryButton}>
            {frozen ? <FiPlayCircle /> : <FiPauseCircle />} {frozen ? "Unfreeze" : "Freeze"}
          </button>
          <button onClick={() => onAction("reset")} className={secondaryButton}>
            <FiKey /> Reset password
          </button>
          <button onClick={() => onAction("edit")} className={secondaryButton}>
            <FiEdit2 /> Edit
          </button>
        </div>
      </div>

      {banners[status] && (
        <p role="status" className={`mt-5 rounded-md border p-3 text-sm font-semibold ${banners[status]}`}>
          {bannerText(status, member, daysLeft)}
        </p>
      )}
    </section>
  );
};

export default MemberProfileHeader;
