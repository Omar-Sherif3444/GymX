import "./Landing.css";
const steps = [
  {
    number: "01",
    title: "Get your pass",
    description:
      "Join your gym on GYMX and keep your member pass ready on your phone.",
  },
  {
    number: "02",
    title: "Scan in at the door",
    description: "Open your QR pass and scan once at the front desk.",
  },
  {
    number: "03",
    title: "Track, compete, earn tokens",
    description:
      "Build consistency, finish challenges, and unlock gym rewards.",
  },
];

const plans = [
  {
    label: "Flexible start",
    name: "1-Month",
    price: "EGP 850",
    features: [
      "Full gym access",
      "GYMX member pass",
      "Machine guides",
      "Monthly challenges",
    ],
  },
  {
    label: "Most popular",
    name: "3-Month",
    price: "EGP 2,250",
    popular: true,
    features: [
      "Everything in Monthly",
      "Save EGP 300",
      "Coach goal review",
      "Priority challenge access",
    ],
  },
  {
    label: "Best value",
    name: "12-Month",
    price: "EGP 7,800",
    features: [
      "Everything in 3-Month",
      "Save EGP 2,400",
      "2 guest passes",
      "Quarterly coach session",
    ],
  },
];

const machines = [
  { number: "01", name: "Lat pulldown", muscles: "Lats, biceps" },
  { number: "02", name: "Leg press", muscles: "Quads, glutes" },
  { number: "03", name: "Cable row", muscles: "Back, rear delts" },
];

const Landing = () => {
  return (
    <main className="gymx-landing">
      {/* HERO */}
      <section className="gx-hero" id="top">
        <div className="gx-hero-content">
          <span className="gx-label">Your gym. In your pocket.</span>

          <h1 className="gx-display gx-hero-title">
            Show up.
            <br />
            Scan in.
            <br />
            Lift <span className="gx-accent">more.</span>
          </h1>

          <p className="gx-hero-description">
            One pass for every visit, machine guide, challenge, and connection
            at your gym.
          </p>

          <div className="gx-button-row">
            <a className="gx-button" href="#bundles">
              Get my pass ↗
            </a>
            <a className="gx-button-outline" href="#machines">
              See the equipment ↗
            </a>
          </div>
        </div>

        <span className="gx-checkin-chip">
          ● Checked in · Alex M. at 6:42 PM
        </span>
      </section>

      {/* HOW IT WORKS */}
      <section className="gx-section" id="how">
        <div className="gx-container">
          <div className="gx-section-heading gx-heading-right">
            <span className="gx-label">The routine</span>
            <h2 className="gx-display">
              Three steps,
              <br />
              every visit.
            </h2>
          </div>

          <div className="gx-steps-grid">
            {steps.map((step) => (
              <article className="gx-step" key={step.number}>
                <small>{step.number}</small>
                <h3 className="gx-display">{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP BUNDLES */}
      <section className="gx-section gx-section-topless" id="bundles">
        <div className="gx-container">
          <div className="gx-price-heading">
            <span className="gx-label">Bundles · Pick your rhythm</span>
            <h2 className="gx-display">
              Your routine.
              <br />
              Your plan.
            </h2>
          </div>

          <div className="gx-plans-grid">
            {plans.map((plan) => (
              <article
                className={`gx-plan ${plan.popular ? "gx-plan-popular" : ""}`}
                key={plan.name}
              >
                <div className="gx-plan-top">
                  <span className="gx-label">{plan.label}</span>
                  {plan.popular && (
                    <span className="gx-popular-pill">Most popular</span>
                  )}
                </div>

                <h3 className="gx-display gx-plan-name">{plan.name}</h3>

                <p className="gx-plan-price">
                  {plan.price} <small>/ plan</small>
                </p>

                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <a
                  className={plan.popular ? "gx-button" : "gx-button-outline"}
                  href="#about"
                >
                  <span>Choose plan</span>
                  <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MACHINES GUIDE */}
      <section className="gx-section gx-section-topless" id="machines">
        <div className="gx-container gx-split-layout">
          <div className="gx-photo gx-machines-photo">
            <span className="gx-photo-tag">01 / GUIDES</span>
          </div>

          <div className="gx-split-copy">
            <span className="gx-label">Know your floor</span>
            <h2 className="gx-display">
              Every machine.
              <br />
              Explained.
            </h2>
            <p>
              Scan the label on any machine for setup, form cues, muscles
              worked, and a short demo.
            </p>

            <div className="gx-machine-list">
              {machines.map((machine) => (
                <a
                  className="gx-machine-row"
                  href="#machines"
                  key={machine.number}
                >
                  <span>{machine.number}</span>
                  <strong className="gx-display">{machine.name}</strong>
                  <span>{machine.muscles}</span>
                  <i>↗</i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES AND REWARDS */}
      <section className="gx-section gx-section-topless" id="challenges">
        <div className="gx-container gx-split-layout gx-challenge-layout">
          <div className="gx-split-copy">
            <span className="gx-label">Consistency pays</span>
            <h2 className="gx-display">
              Put in work.
              <br />
              Get rewarded.
            </h2>
            <p>
              Join gym-wide challenges, track your streak, and earn tokens for
              rewards chosen by your gym.
            </p>

            <div className="gx-challenge-card">
              <div className="gx-challenge-meta">
                <span className="gx-label">Active challenge</span>
                <span className="gx-label gx-pink-label">12 / 30 days</span>
              </div>

              <h3 className="gx-display">30-day plank ladder</h3>

              <div className="gx-progress-track">
                <span />
              </div>

              <div className="gx-challenge-meta">
                <small>DAY 12</small>
                <span className="gx-label gx-pink-label">+200 tokens</span>
              </div>
            </div>
          </div>

          <div className="gx-photo gx-challenges-photo">
            <span className="gx-photo-tag">02 / CHALLENGES</span>
          </div>
        </div>
      </section>

      {/* ABOUT GYMX */}
      <section className="gx-section gx-section-topless" id="about">
        <div className="gx-container">
          <div className="gx-about-grid">
            <div>
              <span className="gx-label">About us</span>
              <h2 className="gx-display gx-about-title">
                Built for the people
                <br />
                who <span className="gx-accent">show up.</span>
              </h2>
              <p className="gx-about-description">
                GYMX connects neighborhood gyms with the members who make them
                feel alive. One pass replaces paper cards, scattered messages,
                and forgotten progress—so every visit feels simple, visible,
                and worth coming back for.
              </p>
            </div>

            <div className="gx-stats-list">
              <div className="gx-stat">
                <strong>42</strong>
                <span>Partner gyms</span>
              </div>
              <div className="gx-stat">
                <strong>18K+</strong>
                <span>Monthly check-ins</span>
              </div>
              <div className="gx-stat">
                <strong>91%</strong>
                <span>Members more consistent</span>
              </div>
            </div>
          </div>

          <div className="gx-visit-card">
            <div>
              <span className="gx-label">Visit Iron Club</span>
              <strong>Nasr City, Cairo</strong>
              <small>Open daily · 6 AM to 12 AM</small>
            </div>

            <div>
              <span className="gx-label">Talk to us</span>
              <strong>hello@gymx.fit</strong>
              <small>+20 2 2345 6789</small>
            </div>

            <a href="#about">Get directions ↗</a>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="gx-final-cta">
        <div className="gx-final-cta-inner">
          <div>
            <span className="gx-label">Ready when you are</span>
            <h2 className="gx-display">
              Ask your gym for
              <br />
              a GYMX pass.
            </h2>
          </div>

          <a href="#about">Find my gym ↗</a>
        </div>
      </section>
    </main>
  );
};

export default Landing;
