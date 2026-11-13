export const textareaClass =
  "w-full rounded-md border bg-(--gym-card) px-4 py-3 text-sm text-(--gym-text) outline-none focus:border-[#FF542E] disabled:opacity-60";

export const inputClass = `h-12 ${textareaClass}`;

export const fieldBorder = (error) => (error ? "border-red-500" : "border-(--gym-line)");
