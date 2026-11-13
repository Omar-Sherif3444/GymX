import { CHALLENGE } from "../../data/landing";
import { Card, Display, Label, PhotoCard, Wrap } from "../ui";
import challengesImg from "../../assets/challenges.jpg";

export default function Challenges({ ref }) {
  const { title, day, totalDays, reward } = CHALLENGE;
  const progress = Math.round((day / totalDays) * 100);

  return (
    <section ref={ref} className="scroll-mt-[76px] pb-[72px]">
      <Wrap className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Label>Consistency pays</Label>
          <Display className="my-2.5">
            Put in work.
            <br />
            Get rewarded.
          </Display>
          <p className="mb-[18px] max-w-[420px] text-sm text-sub">
            Join gym-wide challenges, track your streak, and earn tokens for rewards chosen by your gym.
          </p>

          <Card>
            <div className="flex items-center justify-between gap-2">
              <Label className="!text-sub">Active challenge</Label>
              <Label className="!text-rose">
                {day} / {totalDays} days
              </Label>
            </div>
            <Display as="h3" size="text-[26px]" className="mb-1 mt-3">
              {title}
            </Display>
            <div className="my-2.5 h-1.5 overflow-hidden rounded-[3px] bg-track">
              <div className="h-full bg-linear-to-r from-orange to-rose" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <small className="text-[11px] text-sub">DAY {day}</small>
              <Label className="!text-rose">{reward}</Label>
            </div>
          </Card>
        </div>

        <PhotoCard image={challengesImg} tag="02 / CHALLENGES" />
      </Wrap>
    </section>
  );
}
