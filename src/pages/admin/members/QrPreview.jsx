// Visual QR-style preview seeded by the member ID. It is NOT a scannable code:
// the real pass is a short-lived signed token issued by the backend (FR-4).
const SIZE = 21;
const CORNERS = [
  [0, 0],
  [0, SIZE - 7],
  [SIZE - 7, 0],
];

const seededRandom = (text) => {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
};

const finderCell = (r, c) => {
  for (const [r0, c0] of CORNERS) {
    const dr = r - r0;
    const dc = c - c0;
    if (dr >= -1 && dr <= 7 && dc >= -1 && dc <= 7) {
      if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return false; // quiet separator
      return dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
    }
  }
  return null; // not part of a finder pattern
};

const QrPreview = ({ value }) => {
  const random = seededRandom(value);
  const cells = Array.from({ length: SIZE * SIZE }, (_, i) => finderCell(Math.floor(i / SIZE), i % SIZE) ?? random() > 0.5);

  return (
    <div role="img" aria-label={`Pass preview for ${value}`} className="grid w-44 grid-cols-21 rounded-md bg-white p-3">
      {cells.map((dark, i) => (
        <div key={i} className={`aspect-square ${dark ? "bg-[#111]" : ""}`} />
      ))}
    </div>
  );
};

export default QrPreview;
