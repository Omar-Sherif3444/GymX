import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useStoreData } from "../../context/StoreContext";
import { FULFILLMENT, PAYMENT, formatEGP, formatStamp, orderTotal } from "../../context/storeData";
import { Badge, fulfillmentClass, paymentClass } from "./store/badges";

const btn =
  "h-11 rounded-xl px-4 text-sm font-semibold transition disabled:opacity-40";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders, updateOrder } = useStoreData();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="md:p-4">
        <Link to="/admin/store?tab=orders" className="inline-flex items-center gap-2 text-sm text-(--gym-subtext) hover:text-[#FF542E]">
          <FiArrowLeft /> Back to store
        </Link>
        <p className="mt-8 text-(--gym-subtext)">Order not found.</p>
      </div>
    );
  }

  const total = orderTotal(order);
  const closed = order.fulfillment === FULFILLMENT.COLLECTED || order.fulfillment === FULFILLMENT.CANCELLED;

  return (
    <div className="md:p-4">
      <Link to="/admin/store?tab=orders" className="inline-flex items-center gap-2 text-sm text-(--gym-subtext) hover:text-[#FF542E]">
        <FiArrowLeft /> Back to orders
      </Link>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-[Barlow] text-xs font-bold uppercase tracking-[0.2em] text-(--gym-label)">Order details</p>
          <h1 className="mt-1 font-[Anton] text-4xl uppercase sm:text-5xl">{order.id}</h1>
          <p className="mt-1 text-sm text-(--gym-subtext)">Placed {formatStamp(order.createdAt)} · {order.method}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className={paymentClass[order.payment]}>{order.payment}</Badge>
          <Badge className={fulfillmentClass[order.fulfillment]}>{order.fulfillment}</Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-2xl border border-(--gym-line) bg-(--gym-card) p-5">
          <h2 className="font-[Anton] text-xl uppercase">Items</h2>
          <ul className="mt-4 divide-y divide-(--gym-line)">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-(--gym-subtext)">
                    {item.qty} × {item.price ? formatEGP(item.price) : "Free"}
                  </p>
                </div>
                <p className="font-[Anton] text-lg text-[#FF542E]">{formatEGP(item.qty * item.price)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-(--gym-line) pt-4">
            <span className="text-sm text-(--gym-subtext)">Total</span>
            <span className="font-[Anton] text-2xl">{formatEGP(total)}</span>
          </div>
        </section>

        <div className="space-y-4">
          <section className="rounded-2xl border border-(--gym-line) bg-(--gym-card) p-5">
            <h2 className="font-[Anton] text-xl uppercase">Member</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Name" value={order.member} />
              <Row label="Phone" value={order.phone} />
              <Row label="Email" value={order.email} />
            </dl>
          </section>

          <section className="rounded-2xl border border-(--gym-line) bg-(--gym-card) p-5">
            <h2 className="font-[Anton] text-xl uppercase">Payment</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Method" value={order.method} />
              <Row label="Status" value={order.payment} />
              <Row label="Amount" value={formatEGP(total)} />
            </dl>
          </section>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-(--gym-line) bg-(--gym-card) p-5">
          <h2 className="font-[Anton] text-xl uppercase">Timeline</h2>
          <ol className="mt-4 space-y-4">
            <Step title="Order placed" detail={formatStamp(order.createdAt)} done />
            <Step title="Payment" detail={order.payment} done={order.payment === PAYMENT.PAID} warn={order.payment === PAYMENT.PENDING} fail={order.payment === PAYMENT.FAILED || order.payment === PAYMENT.REFUNDED} />
            <Step title="Packed / ready" detail={order.fulfillment} done={order.fulfillment === FULFILLMENT.PACKED || order.fulfillment === FULFILLMENT.READY || order.fulfillment === FULFILLMENT.COLLECTED} />
            <Step title="Collected" detail={formatStamp(order.collectedAt)} done={order.fulfillment === FULFILLMENT.COLLECTED} />
          </ol>
          {order.notes ? <p className="mt-4 text-sm text-(--gym-subtext)">{order.notes}</p> : null}
        </section>

        <section className="rounded-2xl border border-(--gym-line) bg-(--gym-card) p-5">
          <h2 className="font-[Anton] text-xl uppercase">Actions</h2>
          <p className="mt-1 text-sm text-(--gym-subtext)">Update payment and fulfillment without leaving this order.</p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              className={`${btn} bg-grad text-white`}
              disabled={order.payment === PAYMENT.PAID || closed}
              onClick={() => updateOrder(order.id, { payment: PAYMENT.PAID })}
            >
              Mark paid
            </button>
            <button
              className={`${btn} border border-(--gym-line) hover:border-[#FF542E]`}
              disabled={order.payment !== PAYMENT.PENDING || closed}
              onClick={() => updateOrder(order.id, { payment: PAYMENT.FAILED })}
            >
              Mark failed
            </button>
            <button
              className={`${btn} border border-(--gym-line) hover:border-[#FF542E]`}
              disabled={order.payment !== PAYMENT.PAID || closed || order.fulfillment === FULFILLMENT.NEW}
              onClick={() =>
                updateOrder(order.id, {
                  fulfillment:
                    order.fulfillment === FULFILLMENT.PACKED ? FULFILLMENT.READY : FULFILLMENT.PACKED,
                })
              }
            >
              {order.fulfillment === FULFILLMENT.PACKED ? "Mark ready" : "Mark packed"}
            </button>
            <button
              className={`${btn} border border-(--gym-line) hover:border-[#FF542E]`}
              disabled={order.payment !== PAYMENT.PAID || order.fulfillment !== FULFILLMENT.READY}
              onClick={() => updateOrder(order.id, { fulfillment: FULFILLMENT.COLLECTED })}
            >
              Mark collected
            </button>
            <button
              className={`${btn} border border-red-500/40 text-red-400 hover:bg-red-500/10 sm:col-span-2`}
              disabled={order.payment === PAYMENT.REFUNDED || order.fulfillment === FULFILLMENT.COLLECTED}
              onClick={() => updateOrder(order.id, { payment: PAYMENT.REFUNDED, fulfillment: FULFILLMENT.CANCELLED })}
            >
              Refund & cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <dt className="text-(--gym-subtext)">{label}</dt>
    <dd className="text-right font-semibold break-all">{value}</dd>
  </div>
);

const Step = ({ title, detail, done, warn, fail }) => (
  <li className="flex gap-3">
    <span
      className={`mt-1 size-2.5 shrink-0 rounded-full ${
        fail ? "bg-red-400" : done ? "bg-green-500" : warn ? "bg-amber-400" : "bg-(--gym-line)"
      }`}
    />
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-(--gym-subtext)">{detail}</p>
    </div>
  </li>
);

export default OrderDetails;
