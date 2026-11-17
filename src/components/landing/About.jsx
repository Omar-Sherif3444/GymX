import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { ABOUT_STATS } from "../../data/landingData";
import { Card, Display, Label, Wrap } from "../ui";

const About = forwardRef(function About(_props, ref) {
  return (
    <section ref={ref} className="scroll-mt-[76px] pb-[72px]">
      <Wrap>
        <div className="grid items-center gap-12 min-[900px]:grid-cols-[1.5fr_1fr]">
          <div>
            <Label>About us</Label>
            <Display className="my-2.5" size="text-[clamp(44px,6.5vw,84px)]">
              Built for the people
              <br />
              who <span className="bg-[linear-gradient(135deg,#ff8a1f,#ff4a2a_45%,#e5214a)] bg-clip-text text-transparent">show up.</span>
            </Display>
            <p className="max-w-[620px] text-base text-(--lp-sub)">
              GYMX connects neighborhood gyms with the members who make them feel alive. One pass replaces
              paper cards, scattered messages, and forgotten progress—so every visit feels simple, visible,
              and worth coming back for.
            </p>
          </div>

          <div>
            {ABOUT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-4 border-t border-(--lp-line) py-5 last:border-b"
              >
                <b className="font-(family-name:--lp-font-display) text-[56px] font-normal leading-none text-(--lp-orange)">{stat.value}</b>
                <span className="text-right text-[11px] font-semibold uppercase tracking-[1.5px] text-(--lp-sub)">
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
            <small className="text-xs text-(--lp-sub)">Open daily · 6 AM to 12 AM</small>
          </div>
          <div>
            <Label>Talk to us</Label>
            <b className="mb-0.5 mt-1.5 block text-lg">hello@gymx.fit</b>
            <small className="text-xs text-(--lp-sub)">+20 2 2345 6789</small>
          </div>
          <Link to="/#about" className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold">
            Get directions <FiArrowUpRight aria-hidden="true" />
          </Link>
        </Card>
      </Wrap>
    </section>
  );
});

export default About;
