import { useState } from "react";
import AnnouncementsToolbar from "./announcements/AnnouncementsToolbar";
import AnnouncementsTable from "./announcements/AnnouncementsTable";

const announcementsData = [
  { id: 1, title: "New cardio machines arrived", audience: "All members", author: "Omar Sherif", publishDate: "Nov 5, 2026", expiry: "Dec 5, 2026", status: "Published" },
  { id: 2, title: "Gym closed on Friday for maintenance", audience: "All members", author: "Sara Adel", publishDate: "Nov 12, 2026", expiry: "Nov 14, 2026", status: "Draft" },
  { id: 3, title: "Free PT session for Premium members", audience: "Premium plan", author: "Omar Sherif", publishDate: "Oct 1, 2026", expiry: "Oct 31, 2026", status: "Expired" },
  { id: 4, title: "Staff meeting on Sunday", audience: "Staff", author: "Omar Sherif", publishDate: "Nov 8, 2026", expiry: "Nov 10, 2026", status: "Published" },
];

const Announcements = () => {
  const [status, setStatus] = useState("All");
  const [audience, setAudience] = useState("All");

  const filtered = announcementsData.filter(
    (a) =>
      (status === "All" || a.status === status) &&
      (audience === "All" || a.audience === audience)
  );

  return (
    <div className="md:p-8">
      <h1 className="mb-6 font-[Anton] text-3xl uppercase sm:text-4xl">Announcements</h1>
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
