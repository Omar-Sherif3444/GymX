import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { PAYMENT_METHODS, createMember, todayISO } from "./members/membersApi";
import { validateRegistration } from "./members/validation";
import FormField from "./members/FormField";
import { inputClass, textareaClass, fieldBorder } from "./members/formStyles";
import PlanPicker from "./members/PlanPicker";
import PhotoUpload from "./members/PhotoUpload";
import RegistrationSummary from "./members/RegistrationSummary";

const emptyForm = () => ({
  name: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  photo: null,
  planId: "",
  startDate: todayISO(),
  paymentMethod: "",
  notes: "",
});

const Section = ({ title, children }) => (
  <section className="rounded-xl border border-(--gym-line) bg-(--gym-card) p-5">
    <h2 className="mb-4 text-lg font-bold">{title}</h2>
    {children}
  </section>
);

const NewMember = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (key, value) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (submitted) setErrors(validateRegistration(next)); // live feedback once the user tried to submit
  };
  const bind = (key) => ({
    id: key,
    value: form[key],
    onChange: (e) => set(key, e.target.value),
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: `${inputClass} ${fieldBorder(errors[key])}`,
  });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    const found = validateRegistration(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const member = await createMember({ ...form, photo: form.photo?.url ?? null });
      navigate(`/admin/members/${member.id}/registered`, { replace: true });
    } catch (err) {
      setServerError(err.message);
      setSubmitting(false);
    }
  };

  const cancel = () => {
    const dirty = JSON.stringify({ ...form, photo: Boolean(form.photo) }) !== JSON.stringify({ ...emptyForm(), photo: false });
    if (!dirty || window.confirm("Discard this registration? Everything you entered will be lost.")) navigate("/admin/members");
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="p-8">
      <Link to="/admin/members" className="mb-4 inline-flex items-center gap-2 text-sm text-(--gym-subtext) hover:text-[#FF542E]">
        <FiArrowLeft /> Back to members
      </Link>
      <h1 className="font-[Anton] text-4xl uppercase">New member</h1>
      <p className="mb-6 mt-1 text-sm text-(--gym-subtext)">Register a member at the front desk and start their membership.</p>

      {(serverError || errorCount > 0) && (
        <p role="alert" className="mb-5 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-500">
          {serverError || `Please fix ${errorCount} field${errorCount === 1 ? "" : "s"} below.`}
        </p>
      )}

      <form onSubmit={submit} noValidate className="grid items-start gap-5 lg:grid-cols-[1fr_340px]">
        <fieldset disabled={submitting} className="flex min-w-0 flex-col gap-5">
          <Section title="Personal information">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full name" htmlFor="name" error={errors.name} className="sm:col-span-2">
                <input {...bind("name")} autoComplete="name" placeholder="e.g. Youssef Adel" />
              </FormField>
              <FormField label="Phone" htmlFor="phone" error={errors.phone}>
                <input {...bind("phone")} type="tel" autoComplete="tel" placeholder="01X XXXX XXXX" />
              </FormField>
              <FormField label="Email" htmlFor="email" error={errors.email} optional>
                <input {...bind("email")} type="email" autoComplete="email" placeholder="name@example.com" />
              </FormField>
              <FormField label="Date of birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
                <input {...bind("dateOfBirth")} type="date" max={todayISO()} />
              </FormField>
              <FormField label="Gender" htmlFor="gender" error={errors.gender}>
                <select {...bind("gender")}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </FormField>
            </div>
          </Section>

          <Section title="Photo">
            <PhotoUpload value={form.photo} onChange={(photo) => set("photo", photo)} />
          </Section>

          <Section title="Membership">
            <FormField label="Plan" htmlFor="planId" error={errors.planId}>
              <PlanPicker value={form.planId} onChange={(id) => set("planId", id)} error={errors.planId} />
            </FormField>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField label="Start date" htmlFor="startDate" error={errors.startDate}>
                <input {...bind("startDate")} type="date" min={todayISO()} />
              </FormField>
              <FormField label="Payment method" htmlFor="paymentMethod" error={errors.paymentMethod}>
                <select {...bind("paymentMethod")}>
                  <option value="">Select method</option>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </FormField>
            </div>
          </Section>

          <Section title="Notes">
            <FormField label="Notes" htmlFor="notes" optional>
              <textarea
                id="notes"
                rows="3"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Injuries, goals, referral…"
                className={`${textareaClass} ${fieldBorder()}`}
              />
            </FormField>
          </Section>
        </fieldset>

        <RegistrationSummary form={form} submitting={submitting} onCancel={cancel} />
      </form>
    </div>
  );
};

export default NewMember;
