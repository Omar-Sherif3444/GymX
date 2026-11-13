import ButtonLink from "../ButtonLink";
import { Display, Label } from "../ui";
import ctaImg from "../../assets/cta.jpg";

export default function CtaBanner() {
  return (
    <section
      className="px-7 py-14 text-white"
      style={{
        background: `linear-gradient(135deg, rgba(255,122,26,.92), rgba(229,33,74,.9)), url(${ctaImg}) center 62% / cover`,
      }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-end justify-between gap-5">
        <div>
          <Label className="!text-[#FFE2D6]">Ready when you are</Label>
          <Display className="mt-2.5">
            Ask your gym for
            <br />a GYMX pass.
          </Display>
        </div>
        <ButtonLink to="/#about" variant="dark" arrow>
          Find my gym
        </ButtonLink>
      </div>
    </section>
  );
}
