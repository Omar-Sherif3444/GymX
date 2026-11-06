import MachineCarousel from "./MachineCarousel";

const MembersMachinesHero = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="relative flex w-full max-w-7xl flex-col overflow-hidden rounded-md border border-(--gym-line) bg-(--gym-card) lg:min-h-177.5 lg:flex-row">
        {/* Background image / carousel */}
        <div className="relative order-1 h-72 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:order-0 lg:h-auto lg:w-[52%]">
          <MachineCarousel />
        </div>

        {/* Gradient overlay - desktop only */}
        <div
          className="pointer-events-none absolute inset-0 z-1 hidden lg:block"
          style={{
            background: `linear-gradient(to right,
                var(--gym-card) 42%,
                color-mix(in srgb, var(--gym-card) 95%, transparent) 50%,
                transparent 75%)`,
          }}
        />

        {/* Mobile / tablet gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-24 lg:hidden"
          style={{
            background: `linear-gradient(to bottom,
                transparent,
                var(--gym-card))`,
          }}
        />

        {/* Left content */}
        <div className="relative z-10 order-2 flex w-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:order-0 lg:min-h-177.5 lg:w-[52%] lg:px-14 lg:py-0">
          <div className="flex flex-col">
            <span className="mb-3 font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-label)">
              Train with confidence
            </span>

            <h1 className="font-['Big_Shoulders_Display'] text-5xl font-black uppercase leading-[0.85] tracking-tight text-(--gym-text) sm:text-6xl md:text-7xl">
              Know every
              <br />
              machine.
            </h1>

            <p className="mt-5 max-w-107.5 font-[DM_Sans] text-sm leading-relaxed text-(--gym-subtext) sm:text-base">
              Find your station, learn the setup, and follow clear form cues
              before your first rep.
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-(--gym-line) sm:my-7" />

          {/* Statistics */}
          <div className="flex flex-wrap gap-x-8 gap-y-5 sm:gap-x-10">
            <div className="flex min-w-20 flex-col gap-1">
              <span className="font-['Big_Shoulders_Display'] text-3xl font-bold text-[#FF5A1F]">
                - -
              </span>
              <span className="font-[Barlow] text-[9px] font-semibold uppercase tracking-widest text-(--gym-subtext)">
                Machines
              </span>
            </div>

            <div className="flex min-w-20 flex-col gap-1">
              <span className="font-['Big_Shoulders_Display'] text-3xl font-bold text-[#FF5A1F]">
                - -
              </span>
              <span className="font-[Barlow] text-[9px] font-semibold uppercase tracking-widest text-(--gym-subtext)">
                Available now
              </span>
            </div>

            {/* Add your third statistic here */}
          </div>
        </div>

        {/* Status badge */}
        {/*
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-sm border border-(--gym-line) bg-(--gym-surface) px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
            <span className="font-[DM_Sans] text-[9px] font-semibold text-(--gym-text)">
              Floor is open - Moderate crowd
            </span>
          </div>
          */}
      </div>
    </section>
  );
};

export default MembersMachinesHero;
