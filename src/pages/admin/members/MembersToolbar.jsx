import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { STATUS_TABS } from "./membersApi";

const MembersToolbar = ({ tab, onTabChange, counts, search, onSearchChange }) => (
  <div className="mb-6 flex flex-col gap-4">
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-(--gym-subtext)" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, phone, email or member ID"
          aria-label="Search members"
          className="h-12 w-full rounded-md border border-(--gym-line) bg-(--gym-card) pl-12 pr-4 text-sm text-(--gym-text) outline-none focus:border-[#FF542E]"
        />
      </div>
      <Link
        to="/admin/members/new"
        className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#FF542E] px-6 text-sm font-semibold text-white hover:opacity-90"
      >
        <FiPlus /> New member
      </Link>
    </div>

    <div role="tablist" aria-label="Filter by status" className="flex w-0 min-w-full gap-2 overflow-x-auto pb-1">
      {STATUS_TABS.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          onClick={() => onTabChange(t)}
          className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            tab === t
              ? "border-[#FF542E] bg-[#FF542E] text-white"
              : "border-(--gym-line) bg-(--gym-card) text-(--gym-subtext) hover:text-(--gym-text)"
          }`}
        >
          {t}
          <span className={`rounded-full px-2 text-xs ${tab === t ? "bg-white/25" : "bg-(--gym-surface)"}`}>{counts[t]}</span>
        </button>
      ))}
    </div>
  </div>
);

export default MembersToolbar;
