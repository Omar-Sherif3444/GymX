import { createContext, useContext, useState } from "react";
import { checkInsData } from "./checkInsData";

const CheckInsDataContext = createContext(checkInsData);

const CheckInsContext = ({ children }) => {
  const [checkIns, setCheckIns] = useState(checkInsData);
  return (
    <CheckInsDataContext.Provider value={{ checkIns, setCheckIns }}>
      {children}
    </CheckInsDataContext.Provider>
  );
};

export const useCheckInsData = () => useContext(CheckInsDataContext);
export default CheckInsContext;
