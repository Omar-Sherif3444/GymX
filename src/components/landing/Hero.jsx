import ButtonLink from "../ButtonLink";
import { Display, Label } from "../ui";
import heroImg from "../../assets/hero.jpg";

export default function Hero({ ref }) {
  return (
    <section
      ref={ref}
      className="relative flex min-h-[580px] items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 flex max-w-[660px] flex-col justify-center gap-4 px-[22px] py-11 md:px-10 md:py-16">
        <Label>Your gym. In your pocket.</Label>
        <Display as="h1" size="text-[clamp(56px,8vw,104px)]">
          Show up.
          <br />
          Scan in.
          <br />
          Lift <span className="text-grad">more.</span>
        </Display>
        <p className="max-w-[420px] text-sm text-sub">
          One pass for every visit, machine guide, challenge, and connection at your gym.
        </p>
        <div className="mt-1.5 flex flex-wrap gap-2.5">
          <ButtonLink to="/register" arrow>
            Get my pass
          </ButtonLink>
          <ButtonLink to="/#machines" variant="outline" arrow>
            See the equipment
          </ButtonLink>
        </div>
      </div>

      <span className="absolute bottom-6 right-7 z-10 rounded bg-[#F4EFEA] px-3 py-[7px] text-[11px] text-[#1A0B08]">
        ● Checked in · Alex M. at 6:42 PM
      </span>
    </section>
  );
}
