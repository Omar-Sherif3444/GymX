import { FiBookOpen, FiCheck, FiGift, FiPlus, FiUsers } from "react-icons/fi";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import ButtonLink from "../../components/ButtonLink.jsx";
import CtaBanner from "../../components/landing/CtaBanner.jsx";
import { landingTokens } from "../../components/theme.js";
import { useLandingTheme } from "../../components/useLandingTheme.js";
import { Display, Label, Wrap } from "../../components/ui.jsx";
import { COMPARE_ROWS, FAQ, OFFERS, PLAN_TIERS } from "../../data/plansData.js";
import Plans from '../member/Plans.jsx';

const GRADIENT_BG =
    "bg-[linear-gradient(135deg,#ff7a1a_0%,#ff3d2e_55%,#e5214a_100%)]";

const OFFER_ICONS = {
    student: FiBookOpen,
    friends: FiUsers,
    gift: FiGift,
};

const money = (value) => value.toLocaleString("en-US");

// The monthly price of the shortest plan, used to work out how much each longer plan saves.
const BASE_MONTHLY = PLAN_TIERS[0].price / PLAN_TIERS[0].months;

function PlanCard({ plan }) {
    const perMonth = Math.round(plan.price / plan.months);
    const saves = BASE_MONTHLY * plan.months - plan.price;

    return (
        <div
            className={`relative flex flex-col gap-5 rounded-[14px] border bg-(--lp-card) px-[26px] py-7 ${plan.popular
                ? "border-(--lp-orange) shadow-[0_0_0_1px_#FF5A1F,0_18px_50px_rgba(255,90,31,.18)] min-[900px]:-translate-y-3"
                : "border-(--lp-line) [box-shadow:var(--lp-shadow)]"
                }`}
        >
            <div className="flex items-center justify-between">
                <Label>{plan.tag}</Label>
                {plan.popular && (
                    <span
                        className={`rounded-full px-[11px] py-[5px] text-[10px] font-semibold uppercase tracking-[1px] text-white ${GRADIENT_BG}`}
                    >
                        Most popular
                    </span>
                )}
            </div>

            <div className="font-(family-name:--lp-font-display) text-[54px] uppercase leading-none">
                {plan.name}
            </div>

            <div>
                <div className="font-(family-name:--lp-font-display) text-[40px] uppercase leading-none">
                    EGP {money(plan.price)}
                </div>
                <p className="mt-1.5 text-[13px] text-(--lp-sub)">
                    EGP {money(perMonth)} / month
                </p>
            </div>

            {/* Fixed height so the three cards line up even when a plan has no saving */}
            <div className="h-[26px]">
                {saves > 0 && (
                    <span className="inline-block rounded-full border border-(--lp-orange)/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-(--lp-orange)">
                        Save EGP {money(saves)}
                    </span>
                )}
            </div>

            <ul className="flex flex-1 flex-col gap-[11px] text-sm text-(--lp-ink)">
                {plan.features.map((feature) => (
                    <li
                        key={feature}
                        className="before:mr-[9px] before:font-bold before:text-(--lp-orange) before:content-['✓']"
                    >
                        {feature}
                    </li>
                ))}
            </ul>

            <ButtonLink to="/login" variant={plan.popular ? "primary" : "outline"} arrow full>
                Choose plan
            </ButtonLink>
        </div>
    );
}

function CompareCell({ value }) {
    if (value === true) {
        return <FiCheck role="img" aria-label="Included" className="mx-auto text-lg text-(--lp-orange)" />;
    }
    if (value === false) {
        return (
            <span aria-label="Not included" className="text-(--lp-sub)">
                —
            </span>
        );
    }
    return <span className="font-semibold">{value}</span>;
}

export default function PlansPage() {
    const { theme } = useLandingTheme();

    return (
        <div
            style={landingTokens(theme)}
            className="font-(family-name:--lp-font-body) leading-normal text-(--lp-ink)"
        >
            <Navbar />

            <main>
                {/* ===== Intro ===== */}
                <section className="bg-[radial-gradient(circle_600px_at_15%_0%,rgba(255,61,46,0.22),transparent_65%)] pb-14 pt-36">
                    <Wrap>
                        <Label>Plans &amp; offers</Label>
                        <Display as="h1" size="text-[clamp(48px,9vw,104px)]" className="my-3">
                            Pick your
                            <br />
                            <span className="bg-[linear-gradient(135deg,#ff8a1f,#ff4a2a_45%,#e5214a)] bg-clip-text text-transparent">
                                rhythm.
                            </span>
                        </Display>
                        <p className="max-w-[460px] text-base text-(--lp-sub)">
                            One member pass, three ways to train. The longer you commit, the less you pay
                            per month. All prices are in EGP.
                        </p>
                    </Wrap>
                </section>

                {/* ===== Plans ===== */}
                <section className="pb-[72px]">
                    <Wrap>
                        <div className="grid items-stretch gap-[22px] min-[900px]:grid-cols-3">
                            {PLAN_TIERS.map((plan) => (
                                <PlanCard key={plan.id} plan={plan} />
                            ))}
                        </div>
                    </Wrap>
                </section>

                {/* ===== Offers ===== */}
                <section className="pb-[72px]">
                    <Wrap>
                        <Label>Offers</Label>
                        <Display className="mb-10 mt-2.5">
                            Extra ways
                            <br />
                            to save.
                        </Display>

                        <div className="grid gap-[22px] md:grid-cols-3">
                            {OFFERS.map((offer) => {
                                const Icon = OFFER_ICONS[offer.icon];
                                return (
                                    <div
                                        key={offer.title}
                                        className="flex flex-col gap-3 rounded-[14px] border border-(--lp-line) bg-(--lp-card) p-6 [box-shadow:var(--lp-shadow)]"
                                    >
                                        <div
                                            className={`grid size-11 place-items-center rounded-xl text-xl text-white ${GRADIENT_BG}`}
                                        >
                                            <Icon aria-hidden="true" />
                                        </div>
                                        <Label>{offer.tag}</Label>
                                        <Display as="h3" size="text-[28px]">
                                            {offer.title}
                                        </Display>
                                        <p className="text-sm text-(--lp-sub)">{offer.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Wrap>
                </section>

                {/* ===== Compare ===== */}
                <section className="pb-[72px]">
                    <Wrap>
                        <Label>Compare</Label>
                        <Display className="mb-10 mt-2.5">
                            What&rsquo;s in
                            <br />
                            each plan.
                        </Display>

                        <div className="overflow-x-auto rounded-[14px] border border-(--lp-line) bg-(--lp-card)">
                            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-(--lp-line)">
                                        <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[1.5px] text-(--lp-sub)">
                                            Included
                                        </th>
                                        {PLAN_TIERS.map((plan) => (
                                            <th
                                                key={plan.id}
                                                className={`px-5 py-4 text-center font-(family-name:--lp-font-display) text-lg font-normal uppercase ${plan.popular ? "text-(--lp-orange)" : ""
                                                    }`}
                                            >
                                                {plan.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARE_ROWS.map((row) => (
                                        <tr key={row.label} className="border-b border-(--lp-line) last:border-b-0">
                                            <td className="px-5 py-3.5">{row.label}</td>
                                            {row.values.map((value, index) => (
                                                <td key={index} className="px-5 py-3.5 text-center">
                                                    <CompareCell value={value} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Wrap>
                </section>

                {/* ===== FAQ ===== */}
                <section className="pb-[72px]">
                    <Wrap>
                        <Label>Questions</Label>
                        <Display className="mb-10 mt-2.5">Good to know.</Display>

                        <div className="max-w-[760px] divide-y divide-(--lp-line) rounded-[14px] border border-(--lp-line) bg-(--lp-card)">
                            {FAQ.map(({ q, a }) => (
                                <details key={q} className="group px-6 py-5">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
                                        {q}
                                        <FiPlus
                                            aria-hidden="true"
                                            className="shrink-0 text-xl text-(--lp-orange) transition-transform group-open:rotate-45"
                                        />
                                    </summary>
                                    <p className="mt-3 text-sm leading-relaxed text-(--lp-sub)">{a}</p>
                                </details>
                            ))}
                        </div>
                    </Wrap>
                </section>
            </main>

            <CtaBanner />
            <Footer />
        </div>
    );
}
