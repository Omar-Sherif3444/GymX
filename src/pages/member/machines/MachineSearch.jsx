import { IoMdSearch } from "react-icons/io";
import { LuScanBarcode } from "react-icons/lu";

const MachineSearch = () => {
  return (
    <section className="my-5 flex w-full ">
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        {" "}
        {/* Search input */}
        <div className="relative flex-1">
          <IoMdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-(--gym-subtext)" />

          <input
            type="text"
            placeholder="Search by machine or muscle group"
            className="h-12 w-full rounded-md border border-(--gym-line) bg-(--gym-card) pl-14 pr-4 font-[DM_Sans] text-sm text-(--gym-text) outline-none placeholder:text-(--gym-subtext) transition-colors focus:border-[#FF542E] sm:h-15"
          />
        </div>
        {/* Scan button */}
        <button
          type="button"
          className="flex h-12 w-full shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-md border border-[#FF542E] bg-(--gym-surface) px-6 font-[DM_Sans] text-xs font-semibold text-[#FF542E] transition-colors hover:bg-[#FF542E] hover:text-white sm:h-15 sm:w-auto"
        >
          <LuScanBarcode className="text-xl" />
          Scan machine code
        </button>
      </div>
    </section>
  );
};

export default MachineSearch;
