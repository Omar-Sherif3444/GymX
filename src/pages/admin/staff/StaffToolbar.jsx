import { IoMdSearch } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

const roles = ["All", "Manager", "Trainer", "Reception"];

const StaffToolbar = ({ search, setSearch, role, setRole }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-(--gym-subtext)" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search staff by name or email"
          className="h-12 w-full rounded-md border border-(--gym-line) bg-(--gym-card) pl-12 pr-4 text-sm text-(--gym-text) outline-none focus:border-[#FF542E]"
        />
      </div>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="h-12 rounded-md border border-(--gym-line) bg-(--gym-card) px-4 text-sm text-(--gym-text) outline-none"
      >
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#FF542E] px-6 text-sm font-semibold text-white hover:opacity-90">
        <FiPlus /> Add staff
      </button>
    </div>
  );
};

export default StaffToolbar;
