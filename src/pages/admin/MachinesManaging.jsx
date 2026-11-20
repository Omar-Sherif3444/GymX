import { useState } from "react";
import { useMachinesData } from "../../context/MachinesContext";
import MachineSearch from "../member/machines/MachineSearch";
import { machineFilters } from "../../context/machineData";
import AddButton from "./machines/AddButton";
import EditButton from "./machines/EditButton";
import DeleteButton from "./machines/DeleteButton";
import AdminMachinesCard from "./machines/AdminMachinesCard";
import MachinesCardSkeleton from "../../components/MachinesCardSkeleton";

const MachinesManaging = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { machines, machinesLoading, machinesError } = useMachinesData();

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
    <section className="min-h-screen bg-(--gym-bg) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-[Big_Shoulders_Display] text-4xl font-bold uppercase text-(--gym-text) sm:text-5xl">
            Machines Managing
          </h2>

          <p className="mt-1 font-[Barlow] text-sm text-(--gym-subtext)">
            Manage, edit and monitor your gym machines.
          </p>
        </div>

        {/* Machine Dashboard Control Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <AddButton />
          <EditButton />
          <DeleteButton />
        </div>
      </div>

      {/* Search & Scan */}
      <div className="mb-6">
        <MachineSearch />
      </div>

      {/* Category Filters */}
      <div className="mb-7 flex flex-wrap gap-2">
        {machineFilters.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setActiveFilter(category.value)}
            className={`rounded-full border px-4 py-2.5 font-[Barlow] text-xs font-semibold transition-all duration-200 ${
              activeFilter === category.value
                ? "border-orange bg-orange text-white"
                : "border-(--gym-line) bg-transparent text-(--gym-text) hover:border-orange hover:text-orange"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Machines Count */}
      {!machinesLoading && !machinesError && (
        <div className="mb-4 flex items-center justify-between">
          <p className="font-[Barlow] text-sm text-(--gym-subtext)">
            Showing{" "}
            <span className="font-bold text-(--gym-text)">
              {filteredMachines.length}
            </span>{" "}
            machines
          </p>
        </div>
      )}

      {/* Machines Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {machinesLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <MachinesCardSkeleton key={index} />
          ))
        ) : machinesError ? (
          <div className="col-span-full rounded-xl border border-(--gym-line) bg-(--gym-card) py-12 text-center">
            <p className="font-[Barlow] text-sm text-red-500">
              {machinesError}
            </p>
          </div>
        ) : filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <AdminMachinesCard key={machine.id} machine={machine} />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-(--gym-line) bg-(--gym-card) py-12 text-center">
            <p className="font-[Big_Shoulders_Display] text-2xl font-bold uppercase text-(--gym-text)">
              No machines found
            </p>

            <p className="mt-2 font-[Barlow] text-sm text-(--gym-subtext)">
              There are no machines available in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MachinesManaging;
