import { FULFILLMENT, PAYMENT, STOCK } from "../../../context/storeData";

export const stockClass = {
  [STOCK.IN]: "bg-green-500/15 text-green-500",
  [STOCK.LOW]: "bg-amber-500/15 text-amber-400",
  [STOCK.OUT]: "bg-red-500/15 text-red-400",
};

export const paymentClass = {
  [PAYMENT.PAID]: "bg-green-500/15 text-green-500",
  [PAYMENT.PENDING]: "bg-amber-500/15 text-amber-400",
  [PAYMENT.FAILED]: "bg-red-500/15 text-red-400",
  [PAYMENT.REFUNDED]: "bg-sky-500/15 text-sky-400",
};

export const fulfillmentClass = {
  [FULFILLMENT.NEW]: "bg-orange/15 text-orange",
  [FULFILLMENT.PACKED]: "bg-amber-500/15 text-amber-400",
  [FULFILLMENT.READY]: "bg-orange/20 text-[#FF8A4C]",
  [FULFILLMENT.COLLECTED]: "bg-green-500/15 text-green-500",
  [FULFILLMENT.CANCELLED]: "bg-gray-500/15 text-gray-400",
};

export const Badge = ({ children, className }) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
);
