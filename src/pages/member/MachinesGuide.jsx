import MachineSearch from "./machines/MachineSearch";
import MembersMachinesHero from "./machines/MembersMachinesHero";

const MachinesGuide = () => {
  return (
    <main className="mx-2.5 mt-6">
      {/* Hero */}
      <MembersMachinesHero />
      {/*Search & Scan Btn*/}
      <MachineSearch />
    </main>
  );
};

export default MachinesGuide;
