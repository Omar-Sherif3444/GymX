import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useAnnouncementsData } from "../../context/AnnouncementsContext";
import { announcementAudiences } from "../../context/announcementsData";
import AnnouncementPreview from "./announcements/AnnouncementPreview";

const toInputDate = (text) => {
  const d = new Date(text);
  if (!text || isNaN(d)) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const fromInputDate = (value) =>
  new Date(`${value}T00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const inputClass =
  "h-12 w-full rounded-md border border-(--gym-line) bg-(--gym-card) px-4 text-sm text-(--gym-text) outline-none focus:border-[#FF542E]";

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-semibold">{label}</span>
    {children}
    {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
  </label>
);

const AnnouncementEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { announcements, setAnnouncements } = useAnnouncementsData();

  const existing = id ? announcements.find((a) => a.id === Number(id)) : null;

  const [initial] = useState(() =>
    existing
      ? {
          title: existing.title,
          message: existing.message || "",
          audience: existing.audience,
          publishDate: toInputDate(existing.publishDate),
          expiry: toInputDate(existing.expiry),
        }
      : {
          title: "",
          message: "",
          audience: announcementAudiences[0],
          publishDate: toInputDate(new Date().toDateString()),
          expiry: "",
        },
  );
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  if (id && !existing) {
    return (
      <div className="md:p-8">
        <p className="mb-4 text-(--gym-subtext)">Announcement not found.</p>
        <Link to="/admin/announcements" className="text-[#FF542E]">
          Back to announcements
        </Link>
      </div>
    );
  }

  const isDirty = JSON.stringify(form) !== JSON.stringify(initial);
  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    if (!form.publishDate) next.publishDate = "Publish date is required.";
    if (form.expiry && form.expiry < form.publishDate)
      next.expiry = "Expiry must be after the publish date.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = (status) => {
    if (!validate()) return;
    const record = {
      title: form.title.trim(),
      message: form.message.trim(),
      audience: form.audience,
      publishDate: fromInputDate(form.publishDate),
      expiry: form.expiry ? fromInputDate(form.expiry) : "—",
      status,
    };

    if (existing) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === existing.id ? { ...a, ...record } : a,
        ),
      );
    } else {
      const nextId = Math.max(0, ...announcements.map((a) => a.id)) + 1;
      setAnnouncements([
        { id: nextId, author: "Admin", ...record },
        ...announcements,
      ]);
    }
    navigate("/admin/announcements");
  };

  return (
    <div className="md:p-8">
      <Link
        to="/admin/announcements"
        className="mb-4 inline-flex items-center gap-2 text-sm text-(--gym-subtext) hover:text-[#FF542E]"
      >
        <FiArrowLeft /> Announcements
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="font-[Anton] text-3xl uppercase sm:text-4xl">
          {existing ? "Edit announcement" : "New announcement"}
        </h1>
        {existing && (
          <span className="rounded-full bg-(--gym-surface) px-3 py-1 text-xs font-semibold">
            {existing.status}
          </span>
        )}
        {isDirty && (
          <span className="text-xs text-amber-500">Unsaved changes</span>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Field label="Title" error={errors.title}>
            <input
              value={form.title}
              onChange={update("title")}
              placeholder="e.g. New cardio machines arrived"
              className={inputClass}
            />
          </Field>

          <Field label="Message" error={errors.message}>
            <textarea
              value={form.message}
              onChange={update("message")}
              rows={7}
              placeholder="Write what members should know"
              className={`${inputClass} h-auto py-3`}
            />
          </Field>

          <Field label="Audience">
            <select
              value={form.audience}
              onChange={update("audience")}
              className={inputClass}
            >
              {announcementAudiences.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Publish date" error={errors.publishDate}>
              <input
                type="date"
                value={form.publishDate}
                onChange={update("publishDate")}
                className={inputClass}
              />
            </Field>
            <Field label="Expiry date" error={errors.expiry}>
              <input
                type="date"
                value={form.expiry}
                onChange={update("expiry")}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => save("Draft")}
              className="h-12 rounded-md border border-(--gym-line) px-6 text-sm font-semibold hover:border-[#FF542E]"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() => save("Published")}
              className="h-12 rounded-md bg-[#FF542E] px-6 text-sm font-semibold text-white hover:opacity-90"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <AnnouncementPreview
            form={{
              ...form,
              expiry: form.expiry ? fromInputDate(form.expiry) : "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementEditor;
