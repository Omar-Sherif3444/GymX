import { createContext, useContext, useState, useEffect } from "react";
import { machinesData } from "./machineData";

const MachineDataContext = createContext(null);

const MachinesContext = ({ children }) => {
  const [machines, setMachine] = useState(machinesData);
  const [machinesError, setMachineError] = useState(null);
  const [machinesLoading, setMachineLoading] = useState(false);

  // const fetchMachines = async () => {
  //   setMachineLoading(true);
  //   setMachineError(null);

  //   try {
  //     const response = await fetch("");

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch machines");
  //     }

  //     const data = await response.json();

  //     setMachine(data);
  //   } catch (err) {
  //     setMachineError(err.message);
  //     console.log(err);
  //   } finally {
  //     setMachineLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMachines();
  // }, []);

  return (
    <MachineDataContext.Provider
      value={{
        machines,
        setMachine,
        machinesError,
        machinesLoading,
        // fetchMachines,
      }}
    >
      {children}
    </MachineDataContext.Provider>
  );
};

export const useMachinesData = () => useContext(MachineDataContext);

export default MachinesContext;
