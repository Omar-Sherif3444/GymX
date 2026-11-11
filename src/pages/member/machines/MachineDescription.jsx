import { FiArrowLeft, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const MachineDescription = () => {
  return (
    <section className="min-h-screen bg-(--gym-bg) px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Back navigation */}
        <Link
          to="/member/machines-guide"
          className="mb-6 inline-flex items-center gap-2 font-[DM_Sans] text-sm font-semibold text-(--gym-subtext) transition-colors hover:text-[#FF5A1F]"
        >
          <FiArrowLeft />
          Back to machines
        </Link>

        {/* Machine card */}
        <div className="overflow-hidden rounded-2xl border border-(--gym-line) bg-(--gym-card) shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Machine image */}
            <div className="relative min-h-72 bg-(--gym-surface) sm:min-h-100">
              <img
                src=""
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Optional image overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>

            {/* Machine information */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              {/* Status */}
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="font-[Barlow] text-xs font-bold uppercase tracking-widest text-(--gym-subtext)">
                  {/* Machine status */}
                </span>
              </div>

              {/* Machine title */}
              <h1 className="font-['Big_Shoulders_Display'] text-4xl font-bold uppercase text-(--gym-text) sm:text-5xl">
                {/* Machine name */}
              </h1>

              {/* Description */}
              <p className="mt-4 font-[DM_Sans] text-sm leading-7 text-(--gym-subtext)">
                {/* Machine description */}
              </p>

              {/* Machine details */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--gym-line) bg-(--gym-surface) p-4">
                  <span className="font-[Barlow] text-xs font-semibold uppercase tracking-wider text-(--gym-label)">
                    Target muscles
                  </span>
                  <p className="mt-2 font-[DM_Sans] text-sm text-(--gym-text)">
                    {/* Target muscles */}
                  </p>
                </div>

                <div className="rounded-xl border border-(--gym-line) bg-(--gym-surface) p-4">
                  <span className="font-[Barlow] text-xs font-semibold uppercase tracking-wider text-(--gym-label)">
                    Difficulty
                  </span>
                  <p className="mt-2 font-[DM_Sans] text-sm text-(--gym-text)">
                    {/* Difficulty */}
                  </p>
                </div>
              </div>

              {/* Additional information */}
              <div className="mt-8 border-t border-(--gym-line) pt-6">
                <div className="mb-3 flex items-center gap-2 text-[#FF5A1F]">
                  <FiInfo />
                  <h2 className="font-[Barlow] text-sm font-bold uppercase tracking-widest">
                    Important information
                  </h2>
                </div>

                <p className="font-[DM_Sans] text-sm leading-7 text-(--gym-subtext)">
                  {/* Additional machine information */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions section */}
        <div className="mt-8 rounded-2xl border border-(--gym-line) bg-(--gym-card) p-6 sm:p-8">
          <h2 className="font-['Big_Shoulders_Display'] text-3xl font-bold uppercase text-(--gym-text)">
            How to use
          </h2>

          <div className="mt-6 space-y-4">
            {/* Add your instructions here */}
          </div>
        </div>

        {/* Safety tips section */}
        <div className="mt-6 rounded-2xl border border-(--gym-line) bg-(--gym-card) p-6 sm:p-8">
          <h2 className="font-['Big_Shoulders_Display'] text-3xl font-bold uppercase text-(--gym-text)">
            Safety tips
          </h2>

          <div className="mt-6 space-y-4">
            {/* Add your safety tips here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachineDescription;
