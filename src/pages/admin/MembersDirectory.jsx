import { useCallback, useEffect, useState } from "react";
import { getMembers, getStatus, STATUS_TABS } from "./members/membersApi";
import MembersToolbar from "./members/MembersToolbar";
import MembersTable from "./members/MembersTable";
import StatCard from "./members/StatCard";
import MemberActionDialog from "./members/MemberActionDialog";
import LoadState from "./members/LoadState";
import Toast from "./members/Toast";

const PAGE_SIZE = 8;

const MembersDirectory = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(null); // { action, member }
  const [toast, setToast] = useState("");

  const fetchMembers = useCallback(
    () =>
      getMembers()
        .then(setMembers)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const retry = () => {
    setLoading(true);
    setError("");
    fetchMembers();
  };

  const withStatus = members.map((m) => ({ ...m, status: getStatus(m) }));
  const counts = Object.fromEntries(STATUS_TABS.map((t) => [t, t === "All" ? members.length : withStatus.filter((m) => m.status === t).length]));

  const text = search.trim().toLowerCase();
  const digits = text.replace(/\s/g, "");
  const filtered = withStatus.filter(
    (m) =>
      (tab === "All" || m.status === tab) &&
      (m.name.toLowerCase().includes(text) ||
        m.email.toLowerCase().includes(text) ||
        m.id.toLowerCase().includes(text) ||
        (digits && m.phone.replace(/\s/g, "").includes(digits))),
  );

  const changeTab = (t) => {
    setTab(t);
    setPage(1);
  };
  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDone = ({ member, message }) => {
    if (member) setMembers((list) => list.map((m) => (m.id === member.id ? member : m)));
    setDialog(null);
    setToast(message);
  };
  const closeToast = useCallback(() => setToast(""), []);

  return (
    <div className="p-8">
      <h1 className="font-[Anton] text-4xl uppercase">Members</h1>
      <p className="mb-6 mt-1 text-sm text-(--gym-subtext)">Everyone registered at your gym, their plans and renewals.</p>

      {loading || error ? (
        <LoadState error={error} onRetry={retry} />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Total members" value={counts.All} hint={`${counts.Expired} expired`} />
            <StatCard label="Active" value={counts.Active} hint="More than 7 days left" />
            <StatCard label="Expiring soon" value={counts.Expiring} hint="Within 7 days" highlight />
            <StatCard label="Frozen" value={counts.Frozen} hint="Paused memberships" />
          </div>

          <MembersToolbar tab={tab} onTabChange={changeTab} counts={counts} search={search} onSearchChange={changeSearch} />

          <MembersTable
            members={filtered}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            onAction={(action, member) => setDialog({ action, member })}
            emptyMessage={
              text ? `No members match "${search.trim()}".` : tab === "All" ? "No members yet." : `No ${tab.toLowerCase()} members.`
            }
          />
        </>
      )}

      {dialog && <MemberActionDialog {...dialog} onClose={() => setDialog(null)} onDone={handleDone} />}
      <Toast message={toast} onClose={closeToast} />
    </div>
  );
};

export default MembersDirectory;
