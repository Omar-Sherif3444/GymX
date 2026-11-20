const MachinesCardSkeleton = () => {
  return (
    <article
      aria-busy="true"
      aria-label="Loading machine"
      className="flex w-full flex-col overflow-hidden rounded-md border border-(--gym-line) bg-(--gym-card)"
    >
      {/* Card Header */}
      <div className="flex h-14 items-center justify-between border-b border-(--gym-line) px-5">
        <div className="h-3 w-8 animate-pulse rounded bg-(--gym-subtext)/20" />
        <div className="h-3 w-16 animate-pulse rounded bg-(--gym-subtext)/20" />
      </div>

      {/* Machine Image */}
      <div className="relative flex h-28 items-center justify-center overflow-hidden border-b border-(--gym-line) bg-(--gym-surface)">
        <div className="h-12 w-12 animate-pulse rounded-full bg-(--gym-subtext)/15" />
      </div>

      {/* Machine Information */}
      <div className="flex flex-1 flex-col px-5 py-5">
        {/* Status & Machine ID */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="h-3 w-24 animate-pulse rounded bg-(--gym-subtext)/20" />
          <div className="h-3 w-12 animate-pulse rounded bg-(--gym-subtext)/20" />
        </div>

        {/* Machine Name */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-(--gym-subtext)/20" />

        {/* Target Muscles */}
        <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-(--gym-subtext)/15" />

        {/* Difficulty & Zone */}
        <div className="mt-6 flex items-center gap-2">
          <div className="h-3 w-16 animate-pulse rounded bg-(--gym-subtext)/15" />
          <div className="h-3 w-1 animate-pulse rounded bg-(--gym-subtext)/15" />
          <div className="h-3 w-20 animate-pulse rounded bg-(--gym-subtext)/15" />
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex h-14 items-center justify-between border-t border-(--gym-line) px-5">
        <div className="h-3 w-24 animate-pulse rounded bg-(--gym-subtext)/20" />
        <div className="h-4 w-4 animate-pulse rounded bg-(--gym-subtext)/20" />
      </div>
    </article>
  );
};

export default MachinesCardSkeleton;
