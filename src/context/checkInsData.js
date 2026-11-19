export const gymCapacity = 80;

// Members the front desk can check in (code = what the member's QR resolves to).
export const checkInMembers = [
  { id: 1, code: "GX-1001", name: "Youssef Kamal", phone: "010 2222 3333", plan: "Monthly", status: "Active" },
  { id: 2, code: "GX-1002", name: "Mariam Fathy", phone: "011 4444 5555", plan: "Annual", status: "Active" },
  { id: 3, code: "GX-1003", name: "Karim Nabil", phone: "012 6666 7777", plan: "Monthly", status: "Expired" },
  { id: 4, code: "GX-1004", name: "Hana Mostafa", phone: "015 8888 9999", plan: "Premium", status: "Active" },
  { id: 5, code: "GX-1005", name: "Ali Samir", phone: "010 1212 3434", plan: "Quarterly", status: "Active" },
];

export const checkInsData = [
  { id: 1, memberId: 2, name: "Mariam Fathy", time: "08:12 AM", method: "QR", status: "Success" },
  { id: 2, memberId: 3, name: "Karim Nabil", time: "08:40 AM", method: "QR", status: "Expired" },
  { id: 3, memberId: null, name: "Unknown code", time: "09:05 AM", method: "QR", status: "Invalid" },
  { id: 4, memberId: 4, name: "Hana Mostafa", time: "09:18 AM", method: "Manual", status: "Success" },
];
