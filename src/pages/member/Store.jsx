import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const REWARDS = [
  { id: "ps", code: "PS", name: "Protein Shake", hint: "Ready to redeem at reception", cost: 120 },
  { id: "gp", code: "GP", name: "Guest Pass", hint: "Ready to redeem at reception", cost: 200 },
  { id: "gt", code: "GT", name: "Gym Towel", hint: "Keep showing up to unlock this reward", cost: 250 },
  { id: "wb", code: "WB", name: "Water Bottle", hint: "Keep showing up to unlock this reward", cost: 400 },
  { id: "ts", code: "TS", name: "Trainer Session", hint: "Keep showing up to unlock this reward", cost: 800 },
  { id: "off", code: "20%", name: "20% Off Renewal", hint: "Keep showing up to unlock this reward", cost: 1500 },
];

const Store = () => {
  const { lightMode } = useTheme();
  const [tokens, setTokens] = useState(340);
  const [redeemed, setRedeemed] = useState([]);

  const redeem = (reward) => {
    if (tokens < reward.cost || redeemed.includes(reward.id)) return;
    setTokens((n) => n - reward.cost);
    setRedeemed((ids) => [...ids, reward.id]);
  };

  return (
    <section className="min-h-screen bg-(--gym-bg) px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[Barlow] text-xs font-bold uppercase tracking-[0.22em] text-(--gym-label)">
              Spend your rewards
            </p>
            <h1 className="mt-2 font-[Anton] text-5xl uppercase leading-none sm:text-6xl">Store</h1>
            <p className="mt-3 max-w-md text-sm text-(--gym-subtext)">
              Redeem tokens for rewards selected by Iron Club.
            </p>
          </div>
          <div className="self-start rounded-full border border-(--gym-line) bg-(--gym-card) px-4 py-2 text-sm font-semibold">
            {tokens} tokens
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {REWARDS.map((reward) => {
            const need = Math.max(0, reward.cost - tokens);
            const owned = redeemed.includes(reward.id);
            const canRedeem = !owned && need === 0;

            return (
              <article
                key={reward.id}
                className={`flex flex-col rounded-2xl border border-(--gym-line) p-5 ${
                  lightMode ? "bg-white" : "bg-(--gym-card)"
                }`}
              >
                <span className="grid size-11 place-items-center rounded-xl border border-(--gym-line) bg-(--gym-surface) font-[Anton] text-sm text-(--gym-label)">
                  {reward.code}
                </span>
                <h2 className="mt-8 font-[Anton] text-2xl uppercase tracking-wide">{reward.name}</h2>
                <p className="mt-2 min-h-10 text-sm text-(--gym-subtext)">
                  {owned ? "Show this at reception to collect." : reward.hint}
                </p>
                <p className="mt-6 font-[Anton] text-2xl text-[#FF542E]">{reward.cost} tokens</p>
                {canRedeem ? (
                  <button
                    onClick={() => redeem(reward)}
                    className="mt-4 h-12 w-full rounded-xl bg-grad text-sm font-bold text-white"
                  >
                    Redeem
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 h-12 w-full rounded-xl border border-(--gym-line) text-sm font-semibold text-(--gym-subtext)"
                  >
                    {owned ? "Redeemed" : `Need ${need} more`}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Store;
