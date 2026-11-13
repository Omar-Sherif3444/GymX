import { PLANS } from "../../data/landing";
import ButtonLink from "../ButtonLink";
import { Display, Label, Wrap } from "../ui";

function PlanCard({ plan }) {
  const { tag, name, price, features, popular } = plan;

  return (
    <div
      className={`relative flex flex-col gap-[18px] rounded-[14px] border bg-card px-[26px] py-7 shadow-soft ${popular ? "border-orange shadow-[0_0_0_1px_#FF5A1F,0_18px_50px_rgba(255,90,31,.18)]" : "border-line"
        }`}
    >
      <div className="flex items-center justify-between">
        <Label>{tag}</Label>
        {popular && (
          <span className="rounded-full bg-grad px-[11px] py-[5px] text-[10px] font-semibold uppercase tracking-[1px] text-white">
            Most popular
          </span>
        )}
      </div>

      <div className="font-display text-[54px] uppercase leading-none">{name}</div>

      <div className="font-display text-[34px] uppercase leading-none">
        {price}
        <small className="ml-1 font-body text-[13px] font-medium normal-case text-sub">/ plan</small>
      </div>

      <ul className="flex flex-1 flex-col gap-[11px] text-sm text-ink">
        {features.map((feature) => (
          <li
            key={feature}
            className="before:mr-[9px] before:font-bold before:text-orange before:content-['✓']"
          >
            {feature}
          </li>
        ))}
      </ul>

      <ButtonLink to="/register" variant={popular ? "primary" : "outline"} arrow full>
        Choose plan
      </ButtonLink>
    </div>
  );
}

export default function Bundles({ ref }) {
  return (
    <section ref={ref} className="scroll-mt-[76px] pb-[72px]">
      <Wrap>
        <div className="max-w-[640px]">
          <Label>Bundles · Pick your rhythm</Label>
          <Display className="my-2.5">
            Your routine.
            <br />
            Your plan.
          </Display>
        </div>

        <div className="mt-10 grid items-stretch gap-[22px] min-[900px]:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
