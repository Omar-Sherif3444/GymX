import { createContext, useContext, useState } from "react";
import { leadsSeed } from "./leadsData";

const LeadsDataContext = createContext(null);

const LeadsContext = ({ children }) => {
  const [leads, setLeads] = useState(leadsSeed);

  const moveLead = (id, stage) => {
    setLeads((list) => list.map((lead) => (lead.id === id ? { ...lead, stage } : lead)));
  };

  const addLead = (lead) => {
    setLeads((list) => [
      {
        id: `l${Date.now()}`,
        followUp: "Today",
        stage: "New",
        attention: true,
        ...lead,
      },
      ...list,
    ]);
  };

  return (
    <LeadsDataContext.Provider value={{ leads, moveLead, addLead }}>
      {children}
    </LeadsDataContext.Provider>
  );
};

export const useLeadsData = () => useContext(LeadsDataContext);
export default LeadsContext;
