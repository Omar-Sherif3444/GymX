import { useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

const MAX_MB = 2;

// value: { file: File, url: string } | null
const PhotoUpload = ({ value, onChange }) => {
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const pick = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Choose an image file (JPG, PNG or WebP).");
    if (file.size > MAX_MB * 1024 * 1024) return setError(`The photo must be smaller than ${MAX_MB} MB.`);
    setError("");
    // ponytail: object URL is never revoked so the mock store can keep showing it; the backend will return a hosted URL instead.
    onChange({ file, url: URL.createObjectURL(file) });
  };

  if (value) {
    return (
      <div className="flex items-center gap-4">
        <img src={value.url} alt="Member preview" className="h-24 w-24 rounded-full object-cover" />
        <div className="text-sm">
          <p className="font-semibold break-all">{value.file.name}</p>
          <button type="button" onClick={() => onChange(null)} className="mt-2 flex items-center gap-2 text-red-500 hover:underline">
            <FiTrash2 /> Remove photo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files[0]);
        }}
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center text-sm transition-colors has-focus-visible:ring-2 has-focus-visible:ring-[#FF542E] ${
          dragging ? "border-[#FF542E] bg-[#FF542E]/10" : "border-(--gym-line) hover:bg-(--gym-surface)"
        }`}
      >
        <FiUploadCloud className="text-3xl text-[#FF542E]" />
        <span className="font-semibold">Drop a photo here or click to upload</span>
        <span className="text-xs text-(--gym-subtext)">JPG, PNG or WebP · up to {MAX_MB} MB</span>
        <input type="file" accept="image/*" onChange={(e) => pick(e.target.files[0])} className="sr-only" />
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default PhotoUpload;
