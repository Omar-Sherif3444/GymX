import { useState } from "react";
import { LuScanLine } from "react-icons/lu";
import { useCheckInsData } from "../../context/CheckInsContext";
import { checkInMembers, gymCapacity } from "../../context/checkInsData";
import ScanResult from "./checkin/ScanResult";
import OccupancyMeter from "./checkin/OccupancyMeter";
import RecentCheckIns from "./checkin/RecentCheckIns";

const inputClass =
  "h-12 w-full rounded-md border border-(--gym-line) bg-(--gym-card) px-4 text-sm text-(--gym-text) outline-none focus:border-[#FF542E]";

const now = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const CheckIn = () => {
  const { checkIns, setCheckIns } = useCheckInsData();
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState("");
  const [result, setResult] = useState({ state: "ready", message: "Scan a member QR code or check in manually." });

  const insideIds = checkIns.filter((c) => c.status === "Success").map((c) => c.memberId);

  // Shared by QR scan and manual check-in.
  const checkIn = (member, method, note = "") => {
    let status = "Success";
    let state = "success";
    let message = `${member?.name} · ${member?.plan} plan`;

    if (!member) {
      [status, state, message] = ["Invalid", "invalid", "This code doesn't match any member."];
    } else if (member.status === "Expired") {
      [status, state, message] = ["Expired", "expired", `${member.name}'s membership has expired. Renew before entry.`];
    } else if (insideIds.includes(member.id)) {
      setResult({ state: "invalid", message: `${member.name} is already checked in.` });
      return;
    }

    setCheckIns([
      { id: Date.now(), memberId: member?.id ?? null, name: member?.name ?? "Unknown code", time: now(), method, status, note },
      ...checkIns,
    ]);
    setResult({ state, message });
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    checkIn(checkInMembers.find((m) => m.code.toLowerCase() === code.trim().toLowerCase()), "QR");
    setCode("");
  };

  const handleManual = (e) => {
    e.preventDefault();
    if (!selected || !reason.trim()) return;
    checkIn(selected, "Manual", reason.trim());
    setSelected(null);
    setSearch("");
    setReason("");
  };

  const text = search.toLowerCase();
  const matches = text
    ? checkInMembers.filter((m) => m.name.toLowerCase().includes(text) || m.phone.replace(/\s/g, "").includes(text.replace(/\s/g, "")))
    : [];

  return (
    <div className="md:p-8">
      <h1 className="mb-6 font-[Anton] text-3xl uppercase sm:text-4xl">Check-in</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Scanner */}
          <form onSubmit={handleScan} className="rounded-md border border-(--gym-line) bg-(--gym-card) p-4">
            <div className="mx-auto mb-4 flex aspect-square w-full max-w-64 items-center justify-center rounded-md border-2 border-dashed border-[#FF542E]/60 bg-(--gym-surface)">
              <LuScanLine className="text-6xl text-[#FF542E]" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Member code, e.g. GX-1001"
                className={inputClass}
              />
              <button className="h-12 shrink-0 rounded-md bg-[#FF542E] px-6 text-sm font-semibold text-white hover:opacity-90">
                Scan
              </button>
            </div>
          </form>

          <ScanResult result={result} />

          {/* Manual check-in */}
          <form onSubmit={handleManual} className="space-y-3 rounded-md border border-(--gym-line) bg-(--gym-card) p-4">
            <p className="text-xs font-semibold uppercase text-(--gym-label)">Manual check-in</p>
            <div className="relative">
              <input
                value={selected ? selected.name : search}
                onChange={(e) => {
                  setSelected(null);
                  setSearch(e.target.value);
                }}
                placeholder="Search member by name or phone"
                className={inputClass}
              />
              {!selected && matches.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-(--gym-line) bg-(--gym-card) shadow-lg">
                  {matches.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(m)}
                        className="flex w-full justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-(--gym-surface)"
                      >
                        <span>{m.name}</span>
                        <span className="text-(--gym-subtext)">{m.phone}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason, e.g. forgot phone"
              className={inputClass}
            />
            <button
              disabled={!selected || !reason.trim()}
              className="h-12 w-full rounded-md border border-(--gym-line) px-6 text-sm font-semibold hover:border-[#FF542E] disabled:opacity-50 sm:w-auto"
            >
              Check in manually
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <OccupancyMeter inside={insideIds.length} capacity={gymCapacity} />
          <RecentCheckIns checkIns={checkIns} />
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
