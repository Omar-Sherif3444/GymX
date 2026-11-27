// Content for the public Plans page. The prices come from the landing page;
// the offers and FAQ answers are SAMPLE text: replace them with your gym's real ones.

export const PLAN_TIERS = [
    {
        id: "1m",
        tag: "Flexible start",
        name: "1-Month",
        months: 1,
        price: 850,
        popular: false,
        features: ["Full gym access", "GYMX member pass", "Machine guides", "Monthly challenges"],
    },
    {
        id: "3m",
        tag: "Most popular",
        name: "3-Month",
        months: 3,
        price: 2250,
        popular: true,
        features: ["Everything in 1-Month", "Coach goal review", "Priority challenge access"],
    },
    {
        id: "12m",
        tag: "Best value",
        name: "12-Month",
        months: 12,
        price: 7800,
        popular: false,
        features: ["Everything in 3-Month", "2 guest passes", "Quarterly coach session"],
    },
];

// true = included, false = not included, text = shown as written
export const COMPARE_ROWS = [
    { label: "Full gym access", values: [true, true, true] },
    { label: "GYMX member pass (QR)", values: [true, true, true] },
    { label: "Machine guides", values: [true, true, true] },
    { label: "Monthly challenges", values: [true, true, true] },
    { label: "Coach goal review", values: [false, true, true] },
    { label: "Priority challenge access", values: [false, true, true] },
    { label: "Guest passes", values: [false, false, "2"] },
    { label: "Quarterly coach session", values: [false, false, true] },
];

export const OFFERS = [
    {
        icon: "student",
        tag: "Students",
        title: "Student offer",
        text: "Show a valid student ID at the front desk and get 10% off any plan.",
    },
    {
        icon: "friends",
        tag: "Friends",
        title: "Train together",
        text: "Join with a friend on a 3-Month or 12-Month plan and they get their first month at half price.",
    },
    {
        icon: "gift",
        tag: "New here",
        title: "First visit free",
        text: "Try the gym for one day before you pick a plan. Just ask at the front desk.",
    },
];

export const FAQ = [
    {
        q: "Can I switch to a longer plan later?",
        a: "Yes. Ask your gym's front desk to upgrade you, and they will apply the new plan to your member pass.",
    },
    {
        q: "How do I pay?",
        a: "Choose your plan, then complete payment at your gym's front desk. Your member pass is activated right after.",
    },
    {
        q: "Can I pause my membership?",
        a: "Longer plans can be paused for travel or illness. Ask your gym for the exact conditions.",
    },
    {
        q: "What does the member pass do?",
        a: "It's the QR code you scan at the door. It also unlocks the machine guides and the gym challenges.",
    },
];