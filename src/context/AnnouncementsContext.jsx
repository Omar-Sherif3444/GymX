import { createContext, useContext, useState } from "react";
import { announcementsData } from "./announcementsData";

const AnnouncementsDataContext = createContext(announcementsData);

const AnnouncementsContext = ({ children }) => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  return (
    <AnnouncementsDataContext.Provider
      value={{ announcements, setAnnouncements }}
    >
      {children}
    </AnnouncementsDataContext.Provider>
  );
};

export const useAnnouncementsData = () => useContext(AnnouncementsDataContext);
export default AnnouncementsContext;
