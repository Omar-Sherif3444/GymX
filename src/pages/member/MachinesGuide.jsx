import MembersMachinesHero from "./machines/MembersMachinesHero";

import MachinesLibrary from "./machines/MachinesLibrary";
import { useMachinesData } from "./../../context/MachinesContext";

const MachinesGuide = () => {
  const { machines } = useMachinesData();

  return (
    <main className="mx-auto mt-6 w-full px-5 sm:px-8 mb-10">
      {/* Hero */}
      <MembersMachinesHero machines={machines} />

      {/* Equipment Library */}
      <MachinesLibrary machines={machines} />
    </main>
  );
};

export default MachinesGuide;
