import { useEffect, useRef, useState } from "react";
import {
  PLANS,
  PAYMENT_METHODS,
  getPlan,
  addDays,
  addMonths,
  daysBetween,
  formatDate,
  formatEGP,
  todayISO,
  renewMembership,
  freezeMembership,
  unfreezeMembership,
  resetPassword,
  updateMember,
} from "./membersApi";
import { validateContact } from "./validation";
import FormField from "./FormField";
import { inputClass, textareaClass, fieldBorder } from "./formStyles";

const MAX_FREEZE_DAYS = 90;

// action: "renew" | "freeze" | "unfreeze" | "reset" | "edit"
// onDone({ member, message }) — member is the updated record (null for reset).
const MemberActionDialog = ({ action, member, onClose, onDone }) => {
  const dialogRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [planId, setPlanId] = useState(member.planId);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [days, setDays] = useState("7");
  const [form, setForm] = useState({ name: member.name, phone: member.phone, email: member.email, notes: member.notes });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const today = todayISO();
  const plan = getPlan(planId);
  const renewFrom = member.endDate < today ? today : member.endDate;
  const freezeDays = Number(days);
  const frozenLeft = member.frozenUntil ? Math.max(0, daysBetween(today, member.frozenUntil)) : 0;

  const actions = {
    renew: {
      title: "Renew membership",
      confirm: `Renew · ${formatEGP(plan.price)}`,
      run: async () => {
        const updated = await renewMembership(member.id, { planId, paymentMethod });
        return { member: updated, message: `${updated.name}'s membership now ends ${formatDate(updated.endDate)}.` };
      },
    },
    freeze: {
      title: "Freeze membership",
      confirm: "Freeze",
      validate: () =>
        Number.isInteger(freezeDays) && freezeDays >= 1 && freezeDays <= MAX_FREEZE_DAYS
          ? ""
          : `Enter a whole number of days between 1 and ${MAX_FREEZE_DAYS}.`,
      run: async () => {
        const updated = await freezeMembership(member.id, freezeDays);
        return { member: updated, message: `${updated.name} is frozen until ${formatDate(updated.frozenUntil)}.` };
      },
    },
    unfreeze: {
      title: "Unfreeze membership",
      confirm: "Unfreeze",
      run: async () => {
        const updated = await unfreezeMembership(member.id);
        return { member: updated, message: `${updated.name}'s membership is active again.` };
      },
    },
    reset: {
      title: "Reset password",
      confirm: "Send reset link",
      run: async () => {
        const { sentTo } = await resetPassword(member.id);
        return { member: null, message: `Password reset link sent to ${sentTo}.` };
      },
    },
    edit: {
      title: "Edit member",
      confirm: "Save changes",
      validate: () => {
        const errors = validateContact(form);
        setFieldErrors(errors);
        return Object.keys(errors).length ? "Fix the highlighted fields." : "";
      },
      run: async () => {
        const updated = await updateMember(member.id, form);
        return { member: updated, message: `${updated.name}'s details were updated.` };
      },
    },
  };
  const current = actions[action];

  const submit = async (e) => {
    e.preventDefault();
    const problem = current.validate?.() ?? "";
    setError(problem);
    if (problem) return;

    setBusy(true);
    try {
      onDone(await current.run());
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      onCancel={(e) => busy && e.preventDefault()}
      aria-labelledby="member-action-title"
    >
      <form onSubmit={submit} noValidate className="modal-box border border-(--gym-line) bg-(--gym-card) text-(--gym-text)">
        <h3 id="member-action-title" className="font-[Anton] text-2xl uppercase">
          {current.title}
        </h3>
        <p className="mt-1 text-sm text-(--gym-subtext)">
          {member.name} · {member.id}
        </p>

        <fieldset disabled={busy} className="mt-5 space-y-4 text-sm">
          {action === "renew" && (
            <>
              <FormField label="Plan" htmlFor="renew-plan">
                <select id="renew-plan" value={planId} onChange={(e) => setPlanId(e.target.value)} className={`${inputClass} ${fieldBorder()}`}>
                  {PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · {formatEGP(p.price)}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Payment method" htmlFor="renew-method">
                <select
                  id="renew-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`${inputClass} ${fieldBorder()}`}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </FormField>
              <p className="rounded-md bg-(--gym-surface) p-3 text-(--gym-subtext)">
                Current end date {formatDate(member.endDate)} → new end date{" "}
                <b className="text-(--gym-text)">{formatDate(addMonths(renewFrom, plan.months))}</b>
              </p>
            </>
          )}

          {action === "freeze" && (
            <>
              <FormField label="Freeze for (days)" htmlFor="freeze-days">
                <input
                  id="freeze-days"
                  type="number"
                  min="1"
                  max={MAX_FREEZE_DAYS}
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className={`${inputClass} ${fieldBorder()}`}
                />
              </FormField>
              {freezeDays >= 1 && freezeDays <= MAX_FREEZE_DAYS && (
                <p className="rounded-md bg-(--gym-surface) p-3 text-(--gym-subtext)">
                  Check-ins are blocked until <b className="text-(--gym-text)">{formatDate(addDays(today, freezeDays))}</b>. The end
                  date moves to <b className="text-(--gym-text)">{formatDate(addDays(member.endDate, freezeDays))}</b>.
                </p>
              )}
            </>
          )}

          {action === "unfreeze" && (
            <p className="text-(--gym-subtext)">
              The member can check in again right away. The {frozenLeft} unused frozen day{frozenLeft === 1 ? "" : "s"} will be
              removed, so the end date becomes{" "}
              <b className="text-(--gym-text)">{formatDate(addDays(member.endDate, -frozenLeft))}</b>.
            </p>
          )}

          {action === "reset" && (
            <p className="text-(--gym-subtext)">
              A reset link will be sent to <b className="text-(--gym-text)">{member.email || member.phone}</b>. Their current password
              stops working once they set a new one.
            </p>
          )}

          {action === "edit" && (
            <>
              <FormField label="Full name" htmlFor="edit-name" error={fieldErrors.name}>
                <input id="edit-name" value={form.name} onChange={setField("name")} className={`${inputClass} ${fieldBorder(fieldErrors.name)}`} />
              </FormField>
              <FormField label="Phone" htmlFor="edit-phone" error={fieldErrors.phone}>
                <input
                  id="edit-phone"
                  type="tel"
                  value={form.phone}
                  onChange={setField("phone")}
                  className={`${inputClass} ${fieldBorder(fieldErrors.phone)}`}
                />
              </FormField>
              <FormField label="Email" htmlFor="edit-email" error={fieldErrors.email} optional>
                <input
                  id="edit-email"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  className={`${inputClass} ${fieldBorder(fieldErrors.email)}`}
                />
              </FormField>
              <FormField label="Notes" htmlFor="edit-notes" optional>
                <textarea
                  id="edit-notes"
                  rows="3"
                  value={form.notes}
                  onChange={setField("notes")}
                  className={`${textareaClass} ${fieldBorder()}`}
                />
              </FormField>
            </>
          )}
        </fieldset>

        {error && (
          <p role="alert" className="mt-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="modal-action">
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            disabled={busy}
            className="h-11 rounded-md border border-(--gym-line) px-5 text-sm font-semibold hover:bg-(--gym-surface) disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="flex h-11 items-center gap-2 rounded-md bg-[#FF542E] px-5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {busy && <span className="loading loading-spinner loading-xs" />}
            {current.confirm}
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button disabled={busy}>close</button>
      </form>
    </dialog>
  );
};

export default MemberActionDialog;
