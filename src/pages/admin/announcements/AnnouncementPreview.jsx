import { FiBell } from "react-icons/fi";

const AnnouncementPreview = ({ form }) => (
  <div className="rounded-md border border-(--gym-line) bg-(--gym-card) p-4">
    <p className="mb-3 text-xs font-semibold uppercase text-(--gym-label)">
      Member preview
    </p>
    <div className="rounded-md border border-(--gym-line) bg-(--gym-surface) p-4">
      <div className="flex items-center gap-2 text-xs text-[#FF542E]">
        <FiBell /> {form.audience}
      </div>
      <h3 className="mt-2 break-words font-semibold">
        {form.title || "Announcement title"}
      </h3>
      <p className="mt-2 whitespace-pre-line break-words text-sm text-(--gym-subtext)">
        {form.message || "Your message will appear here."}
      </p>
      {form.expiry && (
        <p className="mt-3 text-xs text-(--gym-subtext)">
          Valid until {form.expiry}
        </p>
      )}
    </div>
  </div>
);

export default AnnouncementPreview;
