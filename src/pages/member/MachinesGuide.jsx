import MachineCarousel from "./machines/MachineCarousel";

const MachinesGuide = () => {
  return (
    <main className="mx-2.5 mt-6">
      {/* Hero */}
      <section className="flex justify-center w-full">
        <div className="relative w-[75%] min-h-177.5 overflow-hidden rounded-md border border-(--gym-line) bg-(--gym-card)">
          {/* Background image / carousel */}
          <div className="absolute inset-y-0 right-0 w-[52%]">
            <MachineCarousel />
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-1 pointer-events-none"
            style={{
              background: `linear-gradient(to right,
                var(--gym-card) 42%,
                color-mix(in srgb, var(--gym-card) 95%, transparent) 50%,
                transparent 75%)`,
            }}
          />

          {/* Left content */}
          <div className="relative z-10 flex min-h-177.5 w-[52%] flex-col justify-center px-10 md:px-14">
            <div className="flex flex-col">
              <span className="mb-3 font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-label)">
                Train with confidence
              </span>

              <h1 className="font-['Big_Shoulders_Display'] text-6xl font-black uppercase leading-[0.8] tracking-tight text-(--gym-text) md:text-7xl">
                Know every
                <br />
                machine.
              </h1>

              <p className="mt-5 max-w-107.5 font-[DM_Sans] text-sm leading-relaxed text-(--gym-subtext)">
                Find your station, learn the setup, and follow clear form cues
                before your first rep.
              </p>
            </div>

            {/* Divider */}
            <div className="my-7 h-px w-full bg-(--gym-line)" />

            {/* Statistics */}
            <div className="flex gap-10">
              <div className="flex flex-col gap-1">
                <span className="font-['Big_Shoulders_Display'] text-3xl font-bold text-[#FF5A1F]">
                  - -
                </span>
                <span className="font-[Barlow] text-[9px] font-semibold uppercase tracking-widest text-(--gym-subtext)">
                  Machines
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-['Big_Shoulders_Display'] text-3xl font-bold text-[#FF5A1F]">
                  - -
                </span>
                <span className="font-[Barlow] text-[9px] font-semibold uppercase tracking-widest text-(--gym-subtext)">
                  Available now
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {/* Add your third statistic here */}
              </div>
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
    </main>
  );
};

export default MachinesGuide;
