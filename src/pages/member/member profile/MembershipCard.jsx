const MembershipCard = ({ membership, onRenew }) => {
  return (
    <section className="bg-(--gym-card) border border-(--gym-line) rounded-xl p-4 sm:p-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold font-['Barlow'] text-(--gym-label) uppercase tracking-wide">
          Membership
        </p>

        <span className="text-xs font-semibold font-['Barlow'] bg-(--gym-surface) text-(--gym-label) px-3 py-1 rounded-full">
          {membership.planName}
        </span>
      </div>

      <h2 className="text-2xl font-bold font-['Anton'] text-(--gym-text) mt-3">
        {membership.daysRemaining} DAYS LEFT
      </h2>

      <p className="text-sm font-['DM_Sans'] text-(--gym-subtext) mt-2">
        {membership.planType}
      </p>

      {/* Membership progress */}
      <div className="h-2 bg-(--gym-surface) rounded-full overflow-hidden mt-4">
        <div
          className="h-full bg-linear-to-r from-[#FF7A1A] to-[#FF3D4A] transition-all duration-500"
          style={{ width: `${membership.progress}%` }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={onRenew}
          className="flex-1 bg-[#FF503C] text-white text-sm font-bold font-['Barlow'] py-2.5 rounded-md hover:opacity-90 transition"
        >
          Renew my plan
        </button>

        <button
          type="button"
          className="border border-[#FF503C] text-[#FF503C] text-sm font-semibold font-['Barlow'] px-3 rounded-md hover:bg-[#FF503C] hover:text-white transition"
        >
          Details
        </button>
      </div>
    </section>
  );
};

export default MembershipCard;
