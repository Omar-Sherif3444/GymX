import { useState } from "react";
import StaffToolbar from "./staff/StaffToolbar";
import StaffTable from "./staff/StaffTable";

const staffData = [
  { id: 1, name: "Omar Sherif", role: "Manager", phone: "010 1234 5678", email: "omar@gymx.com", permissions: "Full access", status: "Active", lastActive: "2 min ago" },
  { id: 2, name: "Sara Adel", role: "Trainer", phone: "011 2345 6789", email: "sara@gymx.com", permissions: "Members, Machines", status: "Active", lastActive: "1 hour ago" },
  { id: 3, name: "Mohamed Ali", role: "Reception", phone: "012 3456 7890", email: "mohamed@gymx.com", permissions: "Check-in, Store", status: "Active", lastActive: "Today" },
  { id: 4, name: "Nour Hassan", role: "Trainer", phone: "015 4567 8901", email: "nour@gymx.com", permissions: "Members", status: "Inactive", lastActive: "3 weeks ago" },
];

const Staff = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const filtered = staffData.filter((s) => {
    const matchesRole = role === "All" || s.role === role;
    const text = search.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(text) || s.email.toLowerCase().includes(text);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-8">
      <h1 className="mb-6 font-[Anton] text-4xl uppercase">Staff</h1>
      <StaffToolbar search={search} setSearch={setSearch} role={role} setRole={setRole} />
      <StaffTable staff={filtered} />
    </div>
  );
};

export default Staff;
