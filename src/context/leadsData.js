export const STAGES = [
  { id: "New", label: "New", hint: "First contact" },
  { id: "Contacted", label: "Contacted", hint: "Waiting on reply" },
  { id: "Visit Scheduled", label: "Visit Scheduled", hint: "Tour booked" },
  { id: "Converted", label: "Converted", hint: "Joined the gym" },
  { id: "Lost", label: "Lost", hint: "Closed without join" },
];

export const SOURCES = ["Instagram", "Walk-in", "Referral", "Website", "Facebook", "WhatsApp"];
export const INTERESTS = ["Monthly", "3-month", "Yearly", "Day pass", "PT pack"];
export const OWNERS = ["Mona K.", "Hany H.", "Karim A.", "Nour S."];

export const leadsSeed = [
  { id: "l1", name: "Yara Adel", phone: "+20 111 237 9012", source: "Instagram", interest: "3-month", stage: "New", followUp: "Today", owner: "Mona K.", attention: true },
  { id: "l2", name: "Mostafa Ali", phone: "+20 122 882 4731", source: "Walk-in", interest: "Yearly", stage: "Visit Scheduled", followUp: "27 Oct", owner: "Hany H.", attention: false },
  { id: "l3", name: "Hoda Saeed", phone: "+20 100 447 2238", source: "Referral", interest: "Monthly", stage: "Contacted", followUp: "Tomorrow", owner: "Mona K.", attention: true },
  { id: "l4", name: "Omar Fathy", phone: "+20 155 209 6613", source: "Website", interest: "3-month", stage: "Converted", followUp: "—", owner: "Karim A.", attention: false },
  { id: "l5", name: "Nour Hassan", phone: "+20 101 558 2201", source: "Instagram", interest: "Yearly", stage: "New", followUp: "Today", owner: "Nour S.", attention: true },
  { id: "l6", name: "Karim Adel", phone: "+20 128 441 0099", source: "WhatsApp", interest: "PT pack", stage: "Contacted", followUp: "20 Nov", owner: "Hany H.", attention: false },
  { id: "l7", name: "Salma Tarek", phone: "+20 100 776 4410", source: "Facebook", interest: "Monthly", stage: "Visit Scheduled", followUp: "21 Nov", owner: "Mona K.", attention: false },
  { id: "l8", name: "Ahmed Zaki", phone: "+20 122 330 1188", source: "Walk-in", interest: "Day pass", stage: "Lost", followUp: "—", owner: "Karim A.", attention: false },
  { id: "l9", name: "Laila Mostafa", phone: "+20 111 902 3344", source: "Referral", interest: "3-month", stage: "New", followUp: "Tomorrow", owner: "Nour S.", attention: false },
  { id: "l10", name: "Tamer Fawzy", phone: "+20 155 661 2290", source: "Website", interest: "Yearly", stage: "Contacted", followUp: "Today", owner: "Hany H.", attention: true },
  { id: "l11", name: "Dina Magdy", phone: "+20 100 441 7782", source: "Instagram", interest: "Monthly", stage: "Converted", followUp: "—", owner: "Mona K.", attention: false },
  { id: "l12", name: "Hassan Nabil", phone: "+20 128 119 3340", source: "WhatsApp", interest: "PT pack", stage: "Visit Scheduled", followUp: "22 Nov", owner: "Karim A.", attention: false },
  { id: "l13", name: "Farida Amin", phone: "+20 101 220 8891", source: "Facebook", interest: "3-month", stage: "Lost", followUp: "—", owner: "Nour S.", attention: false },
  { id: "l14", name: "Youssef Kamal", phone: "+20 122 778 1102", source: "Walk-in", interest: "Yearly", stage: "New", followUp: "Today", owner: "Hany H.", attention: true },
  { id: "l15", name: "Mai Sherif", phone: "+20 111 445 6670", source: "Referral", interest: "Monthly", stage: "Contacted", followUp: "23 Nov", owner: "Mona K.", attention: false },
  { id: "l16", name: "Ramy Adel", phone: "+20 155 909 2214", source: "Website", interest: "Day pass", stage: "Converted", followUp: "—", owner: "Karim A.", attention: false },
];
