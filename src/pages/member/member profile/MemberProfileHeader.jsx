const MemberProfileHeader = ({ profile, onUploadPhoto, onRemovePhoto }) => {
  return (
    <section className="space-y-4">
      {/* Cover */}
      <div
        className="h-28 sm:h-36 rounded-xl overflow-hidden"
        style={{
          background: profile.coverImage
            ? `url(${profile.coverImage}) center/cover`
            : "radial-gradient(circle at 15% 10%, #805064, transparent 30%), radial-gradient(circle at 85% 60%, #61271f, transparent 30%), #291722",
        }}
      />

      {/* Profile information */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-3">
        <div className="flex items-center gap-3">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#FF503C] flex items-center justify-center text-white text-lg font-bold font-['Barlow']">
              {profile.initials}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold font-['Barlow'] text-(--gym-text)">
              {profile.name}
            </h2>

            <p className="text-sm sm:text-base font-['DM_Sans'] text-(--gym-subtext) mt-0.5">
              Join Club · Member Since {profile.memberSince}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <label className="cursor-pointer bg-[#FF503C] hover:opacity-90 text-white text-sm font-semibold font-['Barlow'] px-4 py-2.5 rounded-md transition">
            Upload new photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUploadPhoto}
            />
          </label>

          <button
            type="button"
            onClick={onRemovePhoto}
            className="border border-[#FF503C] text-[#FF503C] text-sm font-semibold font-['Barlow'] px-4 py-2.5 rounded-md hover:bg-[#FF503C] hover:text-white transition"
          >
            Remove
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemberProfileHeader;
