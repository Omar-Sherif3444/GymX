export const NAV_ITEMS = [
    { label: "Home", hash: "", activeFor: ["", "#top"] },
    { label: "How it works", hash: "#how", activeFor: ["#how", "#machines", "#challenges"] },
    { label: "Bundles", hash: "#bundles", activeFor: ["#bundles"] },
    { label: "About us", hash: "#about", activeFor: ["#about"] },
];

export const STEPS = [
    { id: "01", title: "Get your pass", text: "Join your gym on GYMX and keep your member pass ready on your phone." },
    { id: "02", title: "Scan in at the door", text: "Open your QR pass and scan once at the front desk." },
    { id: "03", title: "Track, compete, earn tokens", text: "Build consistency, finish challenges, and unlock gym rewards." },
];

export const PLANS = [
    {
        tag: "Flexible start",
        name: "1-Month",
        price: "EGP 850",
        features: ["Full gym access", "GYMX member pass", "Machine guides", "Monthly challenges"],
        popular: false,
    },
    {
        tag: "Most popular",
        name: "3-Month",
        price: "EGP 2,250",
        features: ["Everything in Monthly", "Save EGP 300", "Coach goal review", "Priority challenge access"],
        popular: true,
    },
    {
        tag: "Best value",
        name: "12-Month",
        price: "EGP 7,800",
        features: ["Everything in 3-Month", "Save EGP 2,400", "2 guest passes", "Quarterly coach session"],
        popular: false,
    },
];

export const MACHINES = [
    { id: "01", name: "Lat pulldown", muscles: "Lats, biceps" },
    { id: "02", name: "Leg press", muscles: "Quads, glutes" },
    { id: "03", name: "Cable row", muscles: "Back, rear delts" },
];

export const ABOUT_STATS = [
    { value: "42", label: "Partner gyms" },
    { value: "18K+", label: "Monthly check-ins" },
    { value: "91%", label: "Members more consistent" },
];

export const CHALLENGE = {
    title: "30-day plank ladder",
    day: 12,
    totalDays: 30,
    reward: "+200 tokens",
};
