import { useState } from "react";
import { machineFilters } from "../../../context/machineData";
import MachinesCard from "./MachinesCard";
import MachineSearch from "./MachineSearch";

const MachinesLibrary = ({ machines }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter machines based on selected category
  const filteredMachines = machines.filter((machine) => {
    const filter = machineFilters.find((item) => item.value === activeFilter);

    if (!filter || filter.type === "all") return true;

    if (filter.type === "bodyType") {
      return machine.bodyType === filter.value;
    }

    if (filter.type === "categories") {
      return machine.categories.includes(filter.value);
    }

    return true;
  });
  return (
    <section className="mt-16">
      {/* Heading & Results */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-label)">
            Equipment library
          </p>

          <h2 className="font-['Big_Shoulders_Display'] text-5xl font-black uppercase leading-[0.85] tracking-tight text-(--gym-text) sm:text-6xl md:text-7xl">
            Find your station
          </h2>
        </div>

        <span className="mb-1 whitespace-nowrap font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-label)">
          {filteredMachines.length} Results
        </span>
      </div>
      {/* Search & Scan */}
      <MachineSearch />

      {/* Category Filters */}
      <div className="mt-7 flex flex-wrap gap-2">
        {machineFilters.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setActiveFilter(category.value)}
            className={`rounded-full border px-4 py-2.5 font-[DM_Sans] text-xs font-semibold transition-colors ${
              activeFilter === category.value
                ? "border-[#FF5A1F] bg-[#FF5A1F] text-white"
                : "border-(--gym-line) bg-transparent text-(--gym-text) hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Machines Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <MachinesCard key={machine.id} machine={machine} />
          ))
        ) : (
          <p className="col-span-full py-10 text-center font-[Barlow] text-(--gym-subtext)">
            No machines found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default MachinesLibrary;
