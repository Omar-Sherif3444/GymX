import { useState } from "react";
import { machineFilters } from "../../../context/machineData";
import MachinesCard from "./MachinesCard";
import MachineSearch from "./MachineSearch";
import MachinesCardSkeleton from "../../../components/MachinesCardSkeleton";

const MachinesLibrary = ({ machines = [], machinesLoading, machinesError }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Find the selected filter
  const filter = machineFilters.find((item) => item.value === activeFilter);

  // Filter machines based on selected category
  const filteredMachines = machines.filter((machine) => {
    if (!filter || filter.type === "all") return true;

    if (filter.type === "bodyType") {
      return machine.bodyType === filter.value;
    }

    if (filter.type === "categories") {
      return machine.categories?.includes(filter.value);
    }

    return true;
  });

  return (
    <section className="mt-16 w-full">
      {/* Heading & Results */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-[Barlow] text-xs font-bold uppercase tracking-[0.2em] text-(--gym-label)">
            Equipment Library
          </p>

          <h2 className="font-[Big_Shoulders_Display] text-5xl font-black uppercase leading-[0.9] tracking-tight text-(--gym-text) sm:text-6xl md:text-7xl">
            Find Your Station
          </h2>

          <p className="max-w-md font-[Barlow] text-sm leading-relaxed text-(--gym-subtext)">
            Explore available gym equipment and find the right machines for your
            training routine.
          </p>
        </div>

        {!machinesLoading && !machinesError && (
          <div className="flex items-center gap-2 sm:mb-1">
            <span className="font-[Anton] text-3xl text-orange">
              {filteredMachines.length}
            </span>
            <span className="font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-subtext)">
              {filteredMachines.length === 1 ? "Result" : "Results"}
            </span>
          </div>
        )}
      </div>

      {/* Search & Scan */}
      <div className="mb-7">
        <MachineSearch />
      </div>

      {/* Category Filters */}
      <div className="mb-7">
        <p className="mb-3 font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-subtext)">
          Filter by category
        </p>

        <div className="flex flex-wrap gap-2">
          {machineFilters.map((category) => (
            <button
              key={category.value}
              type="button"
              aria-pressed={activeFilter === category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`rounded-full border px-4 py-2.5 font-[Barlow] text-xs font-bold uppercase tracking-wide transition-all duration-200 active:scale-95 ${
                activeFilter === category.value
                  ? "border-orange bg-orange text-white shadow-md shadow-orange/20"
                  : "border-(--gym-line) bg-(--gym-card) text-(--gym-text) hover:border-orange hover:text-orange"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Machines Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {machinesLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <MachinesCardSkeleton key={index} />
          ))
        ) : machinesError ? (
          <div className="col-span-full rounded-xl border border-(--gym-line) bg-(--gym-card) px-5 py-12 text-center">
            <p className="font-[Barlow] text-sm font-semibold text-red-500">
              {machinesError}
            </p>
          </div>
        ) : filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <MachinesCard key={machine.id} machine={machine} />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-(--gym-line) bg-(--gym-card) px-5 py-14 text-center">
            <p className="font-[Big_Shoulders_Display] text-3xl font-bold uppercase text-(--gym-text)">
              No Machines Found
            </p>

            <p className="mt-2 font-[Barlow] text-sm text-(--gym-subtext)">
              Try selecting another category to find available equipment.
            </p>

            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-5 rounded-full bg-orange px-5 py-2.5 font-[Barlow] text-xs font-bold uppercase tracking-wide text-white transition-all hover:brightness-110 active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MachinesLibrary;
