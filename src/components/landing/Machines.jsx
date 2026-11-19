import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { MACHINES } from "../../data/landingData";
import { Display, Label, PhotoCard, Wrap } from "../ui";
import machinesImg from "../../assets/machines.jpg";

const Machines = forwardRef(function Machines(_props, ref) {
  return (
    <section ref={ref} className="scroll-mt-[76px] pb-[72px]">
      <Wrap className="grid items-center gap-12 md:grid-cols-2">
        <PhotoCard image={machinesImg} tag="01 / GUIDES" position="center 55%" />

        <div>
          <Label>Know your floor</Label>
          <Display className="my-2.5">
            Every machine.
            <br />
            Explained.
          </Display>
          <p className="mb-[18px] max-w-[420px] text-sm text-(--lp-sub)">
            Scan the label on any machine for setup, form cues, muscles worked, and a short demo.
          </p>

          {MACHINES.map((machine) => (
            <Link
              key={machine.id}
              to="/#machines"
              className="flex items-center justify-between gap-3 border-t border-(--lp-line) py-3.5 text-[13px]"
            >
              <span className="text-(--lp-sub)">{machine.id}</span>
              <b className="ml-3.5 flex-1 font-(family-name:--lp-font-display) text-base font-normal uppercase tracking-[.5px]">
                {machine.name}
              </b>
              <span className="text-(--lp-sub)">{machine.muscles}</span>
              <FiArrowUpRight className="ml-3 text-(--lp-sub)" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Wrap>
    </section>
  );
});

export default Machines;
