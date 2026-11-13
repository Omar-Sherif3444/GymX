import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiCheck, FiUser, FiUserPlus, FiArrowLeft } from "react-icons/fi";
import { getMember, getPlan, formatDate, formatEGP } from "./members/membersApi";
import MemberAvatar from "./members/MemberAvatar";
import QrPreview from "./members/QrPreview";
import LoadState from "./members/LoadState";

const RegistrationSuccess = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(null);
  const [error, setError] = useState("");
  const member = loaded?.id === id ? loaded : null;

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

  if (!member) {
    return (
      <div className="p-8">
        <LoadState error={error} onRetry={retry}>
          <Link to="/admin/members" className="text-sm font-semibold text-[#FF542E] hover:underline">
            Go to the members directory
          </Link>
        </LoadState>
      </div>
    );
  }

  const plan = getPlan(member.planId);
  const summary = [
    ["Member ID", member.id],
    ["Plan", plan.name],
    ["Start date", formatDate(member.startDate)],
    ["End date", formatDate(member.endDate)],
    ["Paid", `${formatEGP(member.payments[0].amount)} · ${member.payments[0].method}`],
  ];

  return (
    <div className="p-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-4xl text-green-500">
          <FiCheck />
        </div>
        <h1 className="mt-5 font-[Anton] text-4xl uppercase sm:text-5xl">Member registered</h1>
        <p className="mt-2 text-(--gym-subtext)">
          {member.name} can check in with their GymX pass from {formatDate(member.startDate)}.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-[1fr_auto]">
        <section className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
          <div className="mb-4 flex items-center gap-3">
            <MemberAvatar member={member} size="h-14 w-14 text-lg" />
            <div>
              <p className="text-lg font-bold">{member.name}</p>
              <p className="text-sm text-(--gym-subtext)">{member.phone}</p>
            </div>
          </div>
          <dl className="space-y-3 text-sm">
            {summary.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-t border-(--gym-line) pt-3">
                <dt className="text-(--gym-subtext)">{label}</dt>
                <dd className="text-right font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col items-center gap-3 rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-(--gym-label)">QR pass</h2>
          <QrPreview value={member.id} />
          <p className="max-w-44 text-center text-xs text-(--gym-subtext)">
            Preview only. The live code refreshes every 2 minutes in the member's app.
          </p>
        </section>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to={`/admin/members/${member.id}`}
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#FF542E] px-6 text-sm font-semibold text-white hover:opacity-90"
        >
          <FiUser /> View member
        </Link>
        <Link
          to="/admin/members/new"
          className="flex h-12 items-center justify-center gap-2 rounded-md border border-(--gym-line) bg-(--gym-card) px-6 text-sm font-semibold hover:bg-(--gym-surface)"
        >
          <FiUserPlus /> Register another
        </Link>
        <Link
          to="/admin/members"
          className="flex h-12 items-center justify-center gap-2 rounded-md border border-(--gym-line) bg-(--gym-card) px-6 text-sm font-semibold hover:bg-(--gym-surface)"
        >
          <FiArrowLeft /> Back to members
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
