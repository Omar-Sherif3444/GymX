import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useStoreData } from "../../context/StoreContext";
import {
  FULFILLMENT,
  PAYMENT,
  STOCK,
  formatEGP,
  formatStamp,
  orderTotal,
  stockState,
} from "../../context/storeData";
import { Badge, fulfillmentClass, paymentClass, stockClass } from "./store/badges";

const TABS = ["Products", "Orders"];
const STOCK_FILTERS = ["All", STOCK.IN, STOCK.LOW, STOCK.OUT];
const PAY_FILTERS = ["All", ...Object.values(PAYMENT)];

const pill = (active) =>
  `flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    active
      ? "border-[#FF542E] bg-[#FF542E] text-white"
      : "border-(--gym-line) bg-(--gym-card) text-(--gym-subtext) hover:text-(--gym-text)"
  }`;

const Store = () => {
  const { products, orders, adjustStock } = useStoreData();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "orders" ? "Orders" : "Products";
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [payFilter, setPayFilter] = useState("All");

  const setTab = (next) => {
    setSearch("");
    setParams(next === "Orders" ? { tab: "orders" } : {});
  };

  const lowCount = products.filter((p) => stockState(p.stock) === STOCK.LOW).length;
  const outCount = products.filter((p) => stockState(p.stock) === STOCK.OUT).length;
  const openOrders = orders.filter((o) => o.fulfillment !== FULFILLMENT.COLLECTED && o.fulfillment !== FULFILLMENT.CANCELLED).length;
  const revenue = orders.filter((o) => o.payment === PAYMENT.PAID).reduce((sum, o) => sum + orderTotal(o), 0);

  const q = search.trim().toLowerCase();

  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      const state = stockState(p.stock);
      const matchStock = stockFilter === "All" || state === stockFilter;
      const matchText = !q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchStock && matchText;
    });
  }, [products, stockFilter, q]);

  const visibleOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchPay = payFilter === "All" || o.payment === payFilter;
      const matchText =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.member.toLowerCase().includes(q) ||
        o.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""));
      return matchPay && matchText;
    });
  }, [orders, payFilter, q]);

  return (
    <div className="md:p-4">
      <p className="font-[Barlow] text-xs font-bold uppercase tracking-[0.2em] text-(--gym-label)">Retail</p>
      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-[Anton] text-4xl uppercase sm:text-5xl">Store</h1>
          <p className="mt-1 text-sm text-(--gym-subtext)">Products, stock levels, and member orders.</p>
        </div>
        <div className="flex rounded-xl border border-(--gym-line) bg-(--gym-card) p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`min-w-28 flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${
                tab === t ? "bg-grad text-white" : "text-(--gym-subtext) hover:text-(--gym-text)"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="SKUs" value={products.length} hint={`${outCount} out of stock`} />
        <Stat label="Low stock" value={lowCount} hint="Restock soon" highlight />
        <Stat label="Open orders" value={openOrders} hint={`${orders.length} total`} />
        <Stat label="Paid revenue" value={formatEGP(revenue)} hint="Collected card / cash / wallet" />
      </div>

      <div className="relative mt-6">
        <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-(--gym-subtext)" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === "Products" ? "Search products, SKU, category" : "Search order ID, member, phone"}
          className="h-12 w-full rounded-xl border border-(--gym-line) bg-(--gym-card) pl-12 pr-4 text-sm outline-none focus:border-[#FF542E]"
        />
      </div>

      {tab === "Products" ? (
        <>
          <div className="mt-4 flex w-0 min-w-full gap-2 overflow-x-auto pb-1">
            {STOCK_FILTERS.map((f) => (
              <button key={f} onClick={() => setStockFilter(f)} className={pill(stockFilter === f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdjust={adjustStock} />
            ))}
          </div>
          {visibleProducts.length === 0 && <Empty text="No products match this filter." />}
        </>
      ) : (
        <>
          <div className="mt-4 flex w-0 min-w-full gap-2 overflow-x-auto pb-1">
            {PAY_FILTERS.map((f) => (
              <button key={f} onClick={() => setPayFilter(f)} className={pill(payFilter === f)}>
                {f}
              </button>
            ))}
          </div>
          <OrdersList orders={visibleOrders} />
        </>
      )}
    </div>
  );
};

const Stat = ({ label, value, hint, highlight }) => (
  <div className={`rounded-2xl border p-5 ${highlight ? "border-[#FF542E]/40 bg-[#FF542E]/10" : "border-(--gym-line) bg-(--gym-card)"}`}>
    <p className="font-[Barlow] text-xs font-bold uppercase tracking-wider text-(--gym-label)">{label}</p>
    <p className={`mt-1 font-[Anton] text-3xl ${highlight ? "text-[#FF542E]" : ""}`}>{value}</p>
    <p className="mt-1 text-xs text-(--gym-subtext)">{hint}</p>
  </div>
);

const ProductCard = ({ product, onAdjust }) => {
  const state = stockState(product.stock);
  return (
    <article className="flex flex-col rounded-2xl border border-(--gym-line) bg-(--gym-card) p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl border border-(--gym-line) bg-(--gym-surface) font-[Anton] text-sm text-(--gym-label)">
          {product.code}
        </span>
        <Badge className={stockClass[state]}>{state}</Badge>
      </div>
      <h2 className="mt-5 font-[Anton] text-2xl uppercase tracking-wide">{product.name}</h2>
      <p className="mt-1 text-sm text-(--gym-subtext)">{product.hint}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-[Anton] text-2xl text-[#FF542E]">{product.price ? formatEGP(product.price) : "Voucher"}</p>
        <p className="text-xs text-(--gym-subtext)">{product.stock} in stock</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onAdjust(product.id, -1)}
          className="grid size-11 place-items-center rounded-xl border border-(--gym-line) hover:border-[#FF542E]"
          aria-label={`Decrease ${product.name} stock`}
        >
          <FiMinus />
        </button>
        <button
          onClick={() => onAdjust(product.id, 1)}
          className="grid size-11 place-items-center rounded-xl border border-(--gym-line) hover:border-[#FF542E]"
          aria-label={`Increase ${product.name} stock`}
        >
          <FiPlus />
        </button>
        <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-(--gym-subtext)">{product.category}</span>
      </div>
    </article>
  );
};

const OrdersList = ({ orders }) => {
  if (orders.length === 0) return <Empty text="No orders match this filter." />;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/admin/store/orders/${order.id}`}
            className="rounded-2xl border border-(--gym-line) bg-(--gym-card) p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[Anton] text-lg uppercase">{order.id}</p>
                <p className="text-sm">{order.member}</p>
                <p className="text-xs text-(--gym-subtext)">{formatStamp(order.createdAt)}</p>
              </div>
              <p className="font-[Anton] text-lg text-[#FF542E]">{formatEGP(orderTotal(order))}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className={paymentClass[order.payment]}>{order.payment}</Badge>
              <Badge className={fulfillmentClass[order.fulfillment]}>{order.fulfillment}</Badge>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-(--gym-line) bg-(--gym-card) md:block">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-(--gym-label)">
            <tr className="border-b border-(--gym-line)">
              {["Order", "Member", "Items", "Payment", "Fulfillment", "Total", ""].map((h) => (
                <th key={h} className="p-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-(--gym-line) last:border-0">
                <td className="p-4">
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-xs text-(--gym-subtext)">{formatStamp(order.createdAt)}</p>
                </td>
                <td className="p-4">
                  <p>{order.member}</p>
                  <p className="text-xs text-(--gym-subtext)">{order.phone}</p>
                </td>
                <td className="p-4 text-(--gym-subtext)">
                  {order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
                </td>
                <td className="p-4">
                  <Badge className={paymentClass[order.payment]}>{order.payment}</Badge>
                </td>
                <td className="p-4">
                  <Badge className={fulfillmentClass[order.fulfillment]}>{order.fulfillment}</Badge>
                </td>
                <td className="p-4 font-semibold">{formatEGP(orderTotal(order))}</td>
                <td className="p-4">
                  <Link to={`/admin/store/orders/${order.id}`} className="text-sm font-semibold text-[#FF542E] hover:underline">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Empty = ({ text }) => (
  <div className="mt-6 rounded-2xl border border-(--gym-line) bg-(--gym-card) p-12 text-center text-(--gym-subtext)">{text}</div>
);

export default Store;
