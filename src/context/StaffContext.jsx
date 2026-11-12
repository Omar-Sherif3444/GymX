import { createContext, useContext, useState } from "react";
import { staffData } from "./staffData";

const StaffDataContext = createContext(staffData);

const StaffContext = ({ children }) => {
  const [staff, setStaff] = useState(staffData);
  return (
    <StaffDataContext.Provider value={{ staff, setStaff }}>
      {children}
    </StaffDataContext.Provider>
  );
};

export const useStaffData = () => useContext(StaffDataContext);
export default StaffContext;
