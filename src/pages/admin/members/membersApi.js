// Mock members API for the admin "Members" module.
// Every export returns a Promise, so the pages already handle loading/errors.
// Backend hookup = replace each function body with a fetch() to the endpoint
// noted above it; the pages do not need to change.

/**
 * @typedef {{ id: string, date: string, amount: number, method: string, description: string }} Payment
 * @typedef {{ date: string, checkIn: string, checkOut: string | null }} Visit
 * @typedef {{
 *   id: string, name: string, phone: string, email: string,
 *   dateOfBirth: string, gender: "Male" | "Female", photo: string | null,
 *   planId: string, startDate: string, endDate: string, joinDate: string,
 *   frozenUntil: string | null, notes: string,
 *   payments: Payment[], attendance: Visit[]
 * }} Member
 * All dates are local "YYYY-MM-DD" strings.
 */

export const PLANS = [
  { id: "monthly", name: "Monthly", months: 1, price: 600 },
  { id: "quarterly", name: "3-Month", months: 3, price: 1500 },
  { id: "semiannual", name: "6-Month", months: 6, price: 2700 },
  { id: "annual", name: "Annual", months: 12, price: 4800 },
];

export const PAYMENT_METHODS = ["Cash", "Card", "InstaPay", "Vodafone Cash"];

export const getPlan = (id) => PLANS.find((p) => p.id === id);

// ---- date + format helpers -------------------------------------------------

const DAY = 86400000;
const parse = (iso) => new Date(`${iso}T00:00`);
const toISO = (date) => date.toLocaleDateString("en-CA");

export const todayISO = () => toISO(new Date());

export const addDays = (iso, n) => {
  const d = parse(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};

// Clamps to the month's last day: Jan 31 + 1 month = Feb 28, not Mar 3.
export const addMonths = (iso, n) => {
  const d = parse(iso);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
  return toISO(d);
};

export const daysBetween = (from, to) => Math.round((parse(to) - parse(from)) / DAY);

export const formatDate = (iso) =>
  iso ? parse(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const formatEGP = (amount) => `${amount.toLocaleString("en-US")} EGP`;

export const STATUS_TABS = ["All", "Active", "Expiring", "Expired", "Frozen"];

/** Active | Expiring (≤ 7 days left) | Expired | Frozen */
export const getStatus = (member) => {
  const today = todayISO();
  if (member.frozenUntil && member.frozenUntil > today) return "Frozen";
  if (member.endDate < today) return "Expired";
  if (daysBetween(today, member.endDate) <= 7) return "Expiring";
  return "Active";
};

const normalizePhone = (phone) => phone.replace(/\s/g, "");

// ---- in-memory mock store ---------------------------------------------------

// [name, phone, email, gender, planId, started N days ago, frozen for N more days]
const seed = [
  ["Youssef Adel", "0101 234 5678", "youssef.adel@mail.com", "Male", "quarterly", 67, 0],
  ["Nour Ashraf", "0112 345 6789", "nour.ashraf@mail.com", "Female", "monthly", 29, 0],
  ["Karim Tarek", "0100 987 6543", "karim.tarek@mail.com", "Male", "quarterly", 87, 0],
  ["Salma Fawzy", "0128 222 1100", "salma.fawzy@mail.com", "Female", "monthly", 24, 0],
  ["Omar Hesham", "0109 876 5432", "omar.hesham@mail.com", "Male", "annual", 100, 0],
  ["Mariam Khaled", "0111 456 7890", "mariam.k@mail.com", "Female", "semiannual", 200, 0],
  ["Ali Ramadan", "0122 765 4321", "", "Male", "monthly", 45, 0],
  ["Hana Mostafa", "0155 321 0987", "hana.mostafa@mail.com", "Female", "quarterly", 30, 10],
  ["Mostafa Gamal", "0106 543 2109", "mostafa.gamal@mail.com", "Male", "annual", 300, 0],
  ["Laila Samir", "0127 890 1234", "laila.samir@mail.com", "Female", "semiannual", 20, 0],
  ["Tamer Saeed", "0114 678 9012", "tamer.saeed@mail.com", "Male", "monthly", 40, 0],
  ["Rana Adel", "0150 123 4567", "rana.adel@mail.com", "Female", "quarterly", 10, 0],
  ["Ziad Hossam", "0102 468 1357", "ziad.hossam@mail.com", "Male", "monthly", 5, 5],
  ["Dina Fathy", "0120 135 7924", "dina.fathy@mail.com", "Female", "annual", 380, 0],
];

const buildSeedMember = ([name, phone, email, gender, planId, startedAgo, frozenDays], i) => {
  const today = todayISO();
  const plan = getPlan(planId);
  const startDate = addDays(today, -startedAgo);
  const lastDay = addMonths(startDate, plan.months) < today ? addMonths(startDate, plan.months) : today;
  const visitsSpan = daysBetween(startDate, lastDay);

  const attendance = [];
  for (let back = 1 + (i % 3); back <= visitsSpan && attendance.length < 14; back += 2 + (back % 3)) {
    const hour = 17 + ((i + back) % 4);
    const mins = String((i * 7 + back * 13) % 60).padStart(2, "0");
    attendance.push({
      date: addDays(lastDay, -back),
      checkIn: `${hour}:${mins}`,
      checkOut: `${hour + 1}:${String((Number(mins) + 25) % 60).padStart(2, "0")}`,
    });
  }

  return {
    id: `GX-${1001 + i}`,
    name,
    phone,
    email,
    dateOfBirth: addDays(today, -365 * (21 + (i % 15)) - i * 17),
    gender,
    photo: null,
    planId,
    startDate,
    endDate: addDays(addMonths(startDate, plan.months), frozenDays),
    joinDate: startDate,
    frozenUntil: frozenDays ? addDays(today, frozenDays) : null,
    notes: "",
    payments: [
      {
        id: `PAY-${5001 + i}`,
        date: startDate,
        amount: plan.price,
        method: PAYMENT_METHODS[i % PAYMENT_METHODS.length],
        description: `${plan.name} membership`,
      },
    ],
    attendance,
  };
};

let members = seed.map(buildSeedMember);
let nextId = 1001 + members.length;
let nextPaymentId = 5001 + members.length;

const respond = (value, ms = 450) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms));

const fail = (message, ms = 450) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

const find = (id) => members.find((m) => m.id === id);

const update = (id, change) => {
  const member = find(id);
  if (!member) return fail("Member not found.");
  Object.assign(member, change(member));
  return respond(member);
};

const payment = (plan, method) => ({
  id: `PAY-${nextPaymentId++}`,
  date: todayISO(),
  amount: plan.price,
  method,
  description: `${plan.name} membership`,
});

// ---- API ---------------------------------------------------------------------

/** GET /api/members */
export const getMembers = () => respond(members);

/** GET /api/members/:id */
export const getMember = (id) => (find(id) ? respond(find(id)) : fail("Member not found."));

/** POST /api/members  (multipart when a photo file is attached) */
export const createMember = (data) => {
  if (members.some((m) => normalizePhone(m.phone) === normalizePhone(data.phone))) {
    return fail("A member with this phone number already exists.", 700);
  }
  const plan = getPlan(data.planId);
  const member = {
    id: `GX-${nextId++}`,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    photo: data.photo,
    planId: plan.id,
    startDate: data.startDate,
    endDate: addMonths(data.startDate, plan.months),
    joinDate: todayISO(),
    frozenUntil: null,
    notes: data.notes.trim(),
    payments: [payment(plan, data.paymentMethod)],
    attendance: [],
  };
  members = [member, ...members];
  return respond(member, 900);
};

/** PATCH /api/members/:id */
export const updateMember = (id, { name, phone, email, notes }) => {
  if (members.some((m) => m.id !== id && normalizePhone(m.phone) === normalizePhone(phone))) {
    return fail("Another member already uses this phone number.");
  }
  return update(id, () => ({ name: name.trim(), phone: phone.trim(), email: email.trim(), notes: notes.trim() }));
};

/** POST /api/members/:id/renew  { planId, paymentMethod }
 *  Adds the plan's duration to the current end date, or starts a new period today if expired. */
export const renewMembership = (id, { planId, paymentMethod }) =>
  update(id, (m) => {
    const plan = getPlan(planId);
    const expired = m.endDate < todayISO();
    const from = expired ? todayISO() : m.endDate;
    return {
      planId,
      startDate: expired ? todayISO() : m.startDate,
      endDate: addMonths(from, plan.months),
      payments: [payment(plan, paymentMethod), ...m.payments],
    };
  });

/** POST /api/members/:id/freeze  { days }  — pauses the membership and extends the end date. */
export const freezeMembership = (id, days) =>
  update(id, (m) => ({ frozenUntil: addDays(todayISO(), days), endDate: addDays(m.endDate, days) }));

/** POST /api/members/:id/unfreeze  — gives back the unused frozen days. */
export const unfreezeMembership = (id) =>
  update(id, (m) => ({
    frozenUntil: null,
    endDate: addDays(m.endDate, -Math.max(0, daysBetween(todayISO(), m.frozenUntil))),
  }));

/** POST /api/members/:id/reset-password  — backend emails/SMSes a reset link. */
export const resetPassword = (id) => {
  const member = find(id);
  return member ? respond({ sentTo: member.email || member.phone }) : fail("Member not found.");
};
