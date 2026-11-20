import { formatDate, formatEGP } from "./membersApi";

const PaymentHistory = ({ payments }) => {
  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <section className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-bold">Payments</h2>
        <span className="text-sm text-(--gym-subtext)">
          Total paid <b className="text-(--gym-text)">{formatEGP(total)}</b>
        </span>
      </div>
      {payments.length === 0 ? (
        <p className="py-6 text-center text-sm text-(--gym-subtext)">No payments recorded.</p>
      ) : (
        <div className="w-0 min-w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-(--gym-label)">
              <tr className="border-b border-(--gym-line)">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Method</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-(--gym-line) last:border-0">
                  <td className="whitespace-nowrap py-3 pr-4 text-(--gym-subtext)">{formatDate(p.date)}</td>
                  <td className="py-3 pr-4">{p.description}</td>
                  <td className="py-3 pr-4 text-(--gym-subtext)">{p.method}</td>
                  <td className="whitespace-nowrap py-3 text-right font-semibold">{formatEGP(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;
