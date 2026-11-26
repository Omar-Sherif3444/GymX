export const statsData = [
  {
    id: 1,
    label: "Revenue",
    value: "EGP 482K",
    note: "↑ 8.4% vs Oct",
    tone: "good",
  },
  {
    id: 2,
    label: "Attendance",
    value: "3,842",
    note: "↓ 10% vs Oct",
    tone: "bad",
  },
  {
    id: 3,
    label: "Renewal Rate",
    value: "78%",
    note: "34 expirations ahead",
    tone: "",
  },
  {
    id: 4,
    label: "Lead Conversion",
    value: "31%",
    note: "18 members acquired",
    tone: "",
  },
];

export const revenueData = [
  { id: 1, period: "1 Nov", revenue: 52000, previous: 45000 },
  { id: 2, period: "5 Nov", revenue: 61000, previous: 50000 },
  { id: 3, period: "9 Nov", revenue: 55000, previous: 58000 },
  { id: 4, period: "13 Nov", revenue: 58000, previous: 54000 },
  { id: 5, period: "17 Nov", revenue: 67000, previous: 56000 },
  { id: 6, period: "21 Nov", revenue: 59000, previous: 62000 },
  { id: 7, period: "25 Nov", revenue: 72000, previous: 68000 },
  { id: 8, period: "29 Nov", revenue: 58300, previous: 63000 },
];
export const revenueTotal = "EGP 482,300";

export const attendanceData = [
  {
    id: 1,
    hour: "6a",
    visits: 30,
  },
  {
    id: 2,
    hour: "7a",
    visits: 45,
  },
  {
    id: 3,
    hour: "8a",
    visits: 60,
  },
  {
    id: 4,
    hour: "9a",
    visits: 80,
  },
  {
    id: 5,
    hour: "10a",
    visits: 95,
  },
];
export const peakSummary = "Evening drives 46%";

export default {
  statsData,
  revenueData,
  attendanceData,
};
