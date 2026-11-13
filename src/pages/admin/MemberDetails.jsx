import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getMember, getPlan, getStatus, daysBetween, formatDate, todayISO } from "./members/membersApi";
import MemberProfileHeader from "./members/MemberProfileHeader";
import InfoCard from "./members/InfoCard";
import PaymentHistory from "./members/PaymentHistory";
import AttendanceHistory from "./members/AttendanceHistory";
import MemberActionDialog from "./members/MemberActionDialog";
import LoadState from "./members/LoadState";
import Toast from "./members/Toast";

const MemberDetails = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(null);
  const [error, setError] = useState("");
  const [action, setAction] = useState(null);
  const [toast, setToast] = useState("");
  const member = loaded?.id === id ? loaded : null; // stale record while a new id loads

  const fetchMember = useCallback(
    () =>
      getMember(id)
        .then(setLoaded)
        .catch((err) => setError(err.message)),
    [id],
  );

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  const retry = () => {
    setError("");
    fetchMember();
  };

  const handleDone = ({ member: updated, message }) => {
    if (updated) setLoaded(updated);
    setAction(null);
    setToast(message);
  };
  const closeToast = useCallback(() => setToast(""), []);

  const age = member && Math.floor(daysBetween(member.dateOfBirth, todayISO()) / 365.25);

  return (
    <div className="p-8">
      <Link to="/admin/members" className="mb-4 inline-flex items-center gap-2 text-sm text-(--gym-subtext) hover:text-[#FF542E]">
        <FiArrowLeft /> Back to members
      </Link>

      {!member ? (
        <LoadState error={error} onRetry={retry}>
          <Link to="/admin/members" className="text-sm font-semibold text-[#FF542E] hover:underline">
            Go to the members directory
          </Link>
        </LoadState>
      ) : (
        <div className="flex flex-col gap-5">
          <MemberProfileHeader member={member} onAction={setAction} />

          <div className="grid gap-5 lg:grid-cols-2">
            <InfoCard
              title="Contact"
              rows={[
                ["Phone", member.phone],
                ["Email", member.email],
                ["Gender", member.gender],
                ["Date of birth", `${formatDate(member.dateOfBirth)} (${age})`],
                member.notes && ["Notes", member.notes],
              ]}
            />
            <InfoCard
              title="Membership"
              rows={[
                ["Plan", getPlan(member.planId).name],
                ["Status", getStatus(member)],
                ["Start date", formatDate(member.startDate)],
                ["End date", formatDate(member.endDate)],
                ["Member since", formatDate(member.joinDate)],
                member.frozenUntil && member.frozenUntil > todayISO() && ["Frozen until", formatDate(member.frozenUntil)],
              ]}
            />
          </div>

          <PaymentHistory payments={member.payments} />
          <AttendanceHistory attendance={member.attendance} />
        </div>
      )}

      {action && <MemberActionDialog action={action} member={member} onClose={() => setAction(null)} onDone={handleDone} />}
      <Toast message={toast} onClose={closeToast} />
    </div>
  );
};

export default MemberDetails;
