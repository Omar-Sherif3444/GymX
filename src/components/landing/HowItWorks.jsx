import { forwardRef } from "react";
import { STEPS } from "../../data/landingData";
import { Display, Label, Wrap } from "../ui";

const HowItWorks = forwardRef(function HowItWorks(_props, ref) {
  return (
    <section ref={ref} className="scroll-mt-[76px] py-[72px]">
      <Wrap>
        <div className="flex items-start justify-between gap-4">
          <Label className="mt-[30px]">The routine</Label>
          <Display className="my-2.5 text-right">
            Three steps,
            <br />
            every visit.
          </Display>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.id} className="border-t-2 border-solid [border-image:linear-gradient(90deg,#ff5a1f,#ff8fa3)_1] pt-3.5">
              <small className="text-[11px] font-semibold text-(--lp-sub)">{step.id}</small>
              <Display as="h3" size="text-[28px]" className="mb-1.5 mt-2">
                {step.title}
              </Display>
              <p className="text-[13px] text-(--lp-sub)">{step.text}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
});

export default HowItWorks;
