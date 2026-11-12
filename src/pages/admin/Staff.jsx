import { useState } from "react";
import { useStaffData } from "../../context/StaffContext";
import StaffToolbar from "./staff/StaffToolbar";
import StaffTable from "./staff/StaffTable";

const Staff = () => {
  const { staff } = useStaffData();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const filtered = staff.filter((s) => {
    const matchesRole = role === "All" || s.role === role;
    const text = search.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(text) ||
      s.email.toLowerCase().includes(text);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="md:p-8">
      <h1 className="mb-6 font-[Anton] text-3xl uppercase sm:text-4xl">
        Staff
      </h1>
      <StaffToolbar
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />
      <StaffTable staff={filtered} />
    </div>
  );
};

export default Staff;
