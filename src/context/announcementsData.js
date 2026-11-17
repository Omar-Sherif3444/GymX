export const announcementStatuses = ["Draft", "Published", "Expired"];
export const announcementAudiences = ["All members", "Premium plan", "Staff"];

export const announcementsData = [
  {
    id: 1,
    title: "New cardio machines arrived",
    message: "Three new treadmills and two rowing machines are now on the cardio floor.",
    audience: "All members",
    author: "Omar Sherif",
    publishDate: "Nov 5, 2026",
    expiry: "Dec 5, 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "Gym closed on Friday for maintenance",
    message: "The gym will be closed all day Friday while we service the machines.",
    audience: "All members",
    author: "Sara Adel",
    publishDate: "Nov 12, 2026",
    expiry: "Nov 14, 2026",
    status: "Draft",
  },
  {
    id: 3,
    title: "Free PT session for Premium members",
    message: "Premium members get one free personal training session this month. Book at reception.",
    audience: "Premium plan",
    author: "Omar Sherif",
    publishDate: "Oct 1, 2026",
    expiry: "Oct 31, 2026",
    status: "Expired",
  },
  {
    id: 4,
    title: "Staff meeting on Sunday",
    message: "All staff meeting on Sunday at 9 AM in the studio room.",
    audience: "Staff",
    author: "Omar Sherif",
    publishDate: "Nov 8, 2026",
    expiry: "Nov 10, 2026",
    status: "Published",
  },
];
