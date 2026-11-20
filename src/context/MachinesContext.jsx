import { createContext, useContext, useState } from "react";
import { machinesData } from "./machineData";

const MachineDataContext = createContext(machinesData);

const MachinesContext = ({ children }) => {
  const [machines, setMachine] = useState(machinesData);
  const [machinesError, setMachineError] = useState(null);
  const [machinesLoading, setMachineLoading] = useState(false);
  return (
    <MachineDataContext.Provider value={{ machines, setMachine }}>
      {children}
    </MachineDataContext.Provider>
  );
};

export const useMachinesData = () => useContext(MachineDataContext);
export default MachinesContext;
