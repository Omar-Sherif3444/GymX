import { FiPlus } from "react-icons/fi";

const statuses = ["All", "Draft", "Published", "Expired"];
const audiences = ["All", "All members", "Premium plan", "Staff"];

const selectClass =
  "h-12 flex-1 sm:flex-none rounded-md border border-(--gym-line) bg-(--gym-card) px-4 text-sm text-(--gym-text) outline-none";

const AnnouncementsToolbar = ({ status, setStatus, audience, setAudience }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="flex items-center justify-between gap-2 text-sm text-(--gym-subtext)">
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="flex items-center justify-between gap-2 text-sm text-(--gym-subtext)">
        Audience
        <select value={audience} onChange={(e) => setAudience(e.target.value)} className={selectClass}>
          {audiences.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>

      <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#FF542E] px-6 text-sm font-semibold text-white hover:opacity-90 sm:ml-auto">
        <FiPlus /> New announcement
      </button>
    </div>
  );
};

export default AnnouncementsToolbar;
