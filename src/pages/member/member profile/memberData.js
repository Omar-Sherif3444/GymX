export const memberData = {
  profile: {
    id: 1,
    name: "Youssef Adel",
    initials: "YA",
    memberSince: "January 2025",
    avatar: null,
    coverImage: null,
  },

  attendance: {
    month: "October",
    year: 2025,
    visits: 11,
    target: 20,
    checkInCode: "GYM-2025-001",
    attendedDays: [3, 4, 7, 8, 11, 13, 14, 16, 17, 20, 21],
  },

  stats: [
    { id: 1, value: "11", label: "VISITS THIS MONTH" },
    { id: 2, value: "4 WK", label: "CURRENT STREAK" },
  ],

  personalDetails: {
    fullName: "Youssef Adel",
    email: "youssef@example.com",
    phone: "+20 100 000 0000",
    trainingGoal: "Build strength",
  },

  membership: {
    planName: "Active",
    planType: "Monthly Membership",
    daysRemaining: 23,
    progress: 75,
    startDate: "October 1, 2025",
    endDate: "October 31, 2025",
  },

  achievements: [
    { id: 1, name: "First Visit", icon: "🏆", unlocked: true },
    { id: 2, name: "3 Day Streak", icon: "🔥", unlocked: true },
    { id: 3, name: "10 Visits", icon: "💪", unlocked: true },
    { id: 4, name: "30 Visits", icon: "⭐", unlocked: false },
    { id: 5, name: "Consistency", icon: "🎯", unlocked: false },
  ],

  recentVisits: [
    { id: 1, date: "Tuesday, 28/10", time: "5:30 PM" },
    { id: 2, date: "Monday, 27/10", time: "6:15 PM" },
    { id: 3, date: "Sunday, 26/10", time: "4:45 PM" },
  ],
};
