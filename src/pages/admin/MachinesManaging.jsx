import { useState } from "react";
import { useMachinesData } from "../../context/MachinesContext";
import MachineSearch from "../member/machines/MachineSearch";
import { machineFilters } from "../../context/machineData";
import AddButton from "./machines/AddButton";
import MachinesCardSkeleton from "../../components/MachinesCardSkeleton";
import AdminMachinesTable from "./machines/AdminMachinesTable";
import AdminMachinesTableSkeleton from "./machines/AdminMachinesTableSkeleton";

const MachinesManaging = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { machines = [], machinesLoading, machinesError } = useMachinesData();

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
    <section className="min-h-screen min-w-0 w-full max-w-full overflow-x-hidden bg-(--gym-bg) px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 font-[Barlow] text-sm font-bold uppercase tracking-widest text-(--gym-label)">
            Equipment Management
          </p>

          <h2 className="font-[Big_Shoulders_Display] text-4xl font-bold uppercase leading-none text-(--gym-text) sm:text-5xl">
            Machines
          </h2>

          {!machinesLoading && !machinesError && (
            <p className="mt-2 font-[Barlow] text-base font-semibold text-(--gym-subtext)">
              {machines.length} machines in your inventory
            </p>
          )}
        </div>

        <div className="shrink-0">
          <AddButton />
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="mb-6 grid min-w-0 grid-cols-1 gap-4 rounded-xl border border-(--gym-line) bg-(--gym-card) p-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        {/* Search */}
        <div className="min-w-0">
          <MachineSearch />
        </div>

        {/* Category Filter */}
        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="machine-category"
            className="font-[Barlow] text-sm font-bold text-(--gym-text)"
          >
            Filter by Category
          </label>

          <select
            id="machine-category"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-(--gym-line) bg-(--gym-surface) px-3 py-3 font-[Barlow] text-base font-semibold text-(--gym-text) outline-none transition-colors focus:border-orange"
          >
            {machineFilters.map((category) => (
              <option
                key={category.value}
                value={category.value}
                className="bg-(--gym-card) text-(--gym-text)"
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      {!machinesLoading && !machinesError && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-[Barlow] text-sm font-semibold text-(--gym-subtext)">
            Showing{" "}
            <span className="font-bold text-(--gym-text)">
              {filteredMachines.length}
            </span>{" "}
            of {machines.length} machines
          </p>

          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="font-[Barlow] text-sm font-bold text-orange transition-colors hover:text-(--gym-label)"
            >
              Clear Filter
            </button>
          )}
        </div>
      )}

      {/* Machines Table */}
      <div className="min-w-0 w-full">
        {machinesLoading ? (
          <AdminMachinesTableSkeleton rows={5} />
        ) : machinesError ? (
          <div className="rounded-xl border border-red-500/20 bg-(--gym-card) px-5 py-14 text-center">
            <p className="font-[Barlow] text-base font-semibold text-red-500">
              {machinesError}
            </p>
          </div>
        ) : (
          <AdminMachinesTable machines={filteredMachines} />
        )}
      </div>
    </section>
  );
};

export default MachinesManaging;
