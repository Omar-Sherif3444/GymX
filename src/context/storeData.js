export const STOCK = {
  IN: "In stock",
  LOW: "Low stock",
  OUT: "Out of stock",
};

export const PAYMENT = {
  PAID: "Paid",
  PENDING: "Pending",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export const FULFILLMENT = {
  NEW: "New",
  PACKED: "Packed",
  READY: "Ready",
  COLLECTED: "Collected",
  CANCELLED: "Cancelled",
};

export const stockState = (qty) => {
  if (qty <= 0) return STOCK.OUT;
  if (qty <= 8) return STOCK.LOW;
  return STOCK.IN;
};

export const formatEGP = (n) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(n);

export const productsSeed = [
  { id: "p1", code: "PS", name: "Protein Shake", category: "Nutrition", price: 85, stock: 24, hint: "Ready-to-drink at reception" },
  { id: "p2", code: "GP", name: "Guest Pass", category: "Access", price: 150, stock: 40, hint: "Day pass for a visitor" },
  { id: "p3", code: "GT", name: "Gym Towel", category: "Merch", price: 90, stock: 7, hint: "Branded microfibre towel" },
  { id: "p4", code: "WB", name: "Water Bottle", category: "Merch", price: 120, stock: 0, hint: "750ml GymX bottle" },
  { id: "p5", code: "TS", name: "Trainer Session", category: "Services", price: 400, stock: 12, hint: "60-minute 1:1 session" },
  { id: "p6", code: "20%", name: "20% Off Renewal", category: "Membership", price: 0, stock: 18, hint: "Discount voucher for renewal" },
  { id: "p7", code: "CR", name: "Creatine 300g", category: "Nutrition", price: 280, stock: 5, hint: "Micronized creatine monohydrate" },
  { id: "p8", code: "SH", name: "Shaker Cup", category: "Merch", price: 75, stock: 31, hint: "600ml leak-proof shaker" },
];

export const ordersSeed = [
  {
    id: "GX-2401",
    member: "Yara Adel",
    phone: "+20 111 237 9012",
    email: "yara.adel@mail.com",
    items: [
      { productId: "p1", name: "Protein Shake", qty: 2, price: 85 },
      { productId: "p8", name: "Shaker Cup", qty: 1, price: 75 },
    ],
    payment: PAYMENT.PAID,
    fulfillment: FULFILLMENT.READY,
    method: "Card",
    createdAt: "2026-11-18T09:20:00",
    collectedAt: null,
    notes: "Member asked to pick up after evening class.",
  },
  {
    id: "GX-2402",
    member: "Mostafa Ali",
    phone: "+20 122 882 4731",
    email: "mostafa.ali@mail.com",
    items: [{ productId: "p5", name: "Trainer Session", qty: 1, price: 400 }],
    payment: PAYMENT.PENDING,
    fulfillment: FULFILLMENT.NEW,
    method: "Cash",
    createdAt: "2026-11-18T14:05:00",
    collectedAt: null,
    notes: "Pay at reception before the session.",
  },
  {
    id: "GX-2403",
    member: "Hoda Saeed",
    phone: "+20 100 447 2238",
    email: "hoda.saeed@mail.com",
    items: [
      { productId: "p3", name: "Gym Towel", qty: 1, price: 90 },
      { productId: "p4", name: "Water Bottle", qty: 1, price: 120 },
    ],
    payment: PAYMENT.PAID,
    fulfillment: FULFILLMENT.COLLECTED,
    method: "Wallet",
    createdAt: "2026-11-17T11:40:00",
    collectedAt: "2026-11-17T18:10:00",
    notes: "",
  },
  {
    id: "GX-2404",
    member: "Omar Fathy",
    phone: "+20 155 209 6613",
    email: "omar.fathy@mail.com",
    items: [{ productId: "p6", name: "20% Off Renewal", qty: 1, price: 0 }],
    payment: PAYMENT.FAILED,
    fulfillment: FULFILLMENT.CANCELLED,
    method: "Card",
    createdAt: "2026-11-16T16:12:00",
    collectedAt: null,
    notes: "Card declined. Member will retry at reception.",
  },
  {
    id: "GX-2405",
    member: "Nour Hassan",
    phone: "+20 101 558 2201",
    email: "nour.hassan@mail.com",
    items: [{ productId: "p7", name: "Creatine 300g", qty: 1, price: 280 }],
    payment: PAYMENT.REFUNDED,
    fulfillment: FULFILLMENT.CANCELLED,
    method: "Card",
    createdAt: "2026-11-15T10:00:00",
    collectedAt: null,
    notes: "Wrong flavour — refunded in full.",
  },
  {
    id: "GX-2406",
    member: "Karim Adel",
    phone: "+20 128 441 0099",
    email: "karim.adel@mail.com",
    items: [
      { productId: "p2", name: "Guest Pass", qty: 2, price: 150 },
      { productId: "p1", name: "Protein Shake", qty: 2, price: 85 },
    ],
    payment: PAYMENT.PAID,
    fulfillment: FULFILLMENT.PACKED,
    method: "Cash",
    createdAt: "2026-11-18T17:30:00",
    collectedAt: null,
    notes: "Guests arriving Saturday morning.",
  },
  {
    id: "GX-2407",
    member: "Mona Khaled",
    phone: "+20 100 220 1188",
    email: "mona.khaled@mail.com",
    items: [{ productId: "p8", name: "Shaker Cup", qty: 3, price: 75 }],
    payment: PAYMENT.PENDING,
    fulfillment: FULFILLMENT.NEW,
    method: "Wallet",
    createdAt: "2026-11-19T08:15:00",
    collectedAt: null,
    notes: "",
  },
];

export const orderTotal = (order) =>
  order.items.reduce((sum, item) => sum + item.qty * item.price, 0);

export const formatStamp = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
