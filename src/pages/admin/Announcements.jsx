import { useState } from "react";
import { useAnnouncementsData } from "../../context/AnnouncementsContext";
import AnnouncementsToolbar from "./announcements/AnnouncementsToolbar";
import AnnouncementsTable from "./announcements/AnnouncementsTable";

const Announcements = () => {
  const { announcements } = useAnnouncementsData();
  const [status, setStatus] = useState("All");
  const [audience, setAudience] = useState("All");

  const filtered = announcements.filter(
    (a) =>
      (status === "All" || a.status === status) &&
      (audience === "All" || a.audience === audience),
  );

  return (
    <div className="md:p-8">
      <h1 className="mb-6 font-[Anton] text-3xl uppercase sm:text-4xl">
        Announcements
      </h1>
      <AnnouncementsToolbar
        status={status}
        setStatus={setStatus}
        audience={audience}
        setAudience={setAudience}
      />
      <AnnouncementsTable announcements={filtered} />
    </div>
  );
};

export default Announcements;
