import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { ABOUT_STATS } from "../../data/landing";
import { Card, Display, Label, Wrap } from "../ui";

export default function About({ ref }) {
  return (
    <section ref={ref} className="scroll-mt-[76px] pb-[72px]">
      <Wrap>
        <div className="grid items-center gap-12 min-[900px]:grid-cols-[1.5fr_1fr]">
          <div>
            <Label>About us</Label>
            <Display className="my-2.5" size="text-[clamp(44px,6.5vw,84px)]">
              Built for the people
              <br />
              who <span className="text-grad">show up.</span>
            </Display>
            <p className="max-w-[620px] text-base text-sub">
              GYMX connects neighborhood gyms with the members who make them feel alive. One pass replaces
              paper cards, scattered messages, and forgotten progress—so every visit feels simple, visible,
              and worth coming back for.
            </p>
          </div>

          <div>
            {ABOUT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-4 border-t border-line py-5 last:border-b"
              >
                <b className="font-display text-[56px] font-normal leading-none text-orange">{stat.value}</b>
                <span className="text-right text-[11px] font-semibold uppercase tracking-[1.5px] text-sub">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-12 grid items-center gap-7 px-7 py-[26px] min-[900px]:grid-cols-[1fr_1fr_auto]">
          <div>
            <Label>Visit Iron Club</Label>
            <b className="mb-0.5 mt-1.5 block text-lg">Nasr City, Cairo</b>
            <small className="text-xs text-sub">Open daily · 6 AM to 12 AM</small>
          </div>
          <div>
            <Label>Talk to us</Label>
            <b className="mb-0.5 mt-1.5 block text-lg">hello@gymx.fit</b>
            <small className="text-xs text-sub">+20 2 2345 6789</small>
          </div>
          <Link to="/#about" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold">
            Get directions <FiArrowUpRight aria-hidden="true" />
          </Link>
        </Card>
      </Wrap>
    </section>
  );
}
