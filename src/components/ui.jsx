// Small presentational building blocks shared by the landing sections.

/** Small orange uppercase eyebrow text. */
export function Label({ children, className = "" }) {
  return (
    <span className={`text-[11px] font-semibold uppercase tracking-[1.5px] text-(--lp-label) ${className}`}>
      {children}
    </span>
  );
}

/** Anton display heading. `size` is a Tailwind text-size class. */
export function Display({ as: Tag = "h2", size = "text-[clamp(36px,5.5vw,64px)]", className = "", children }) {
  return (
    <Tag className={`font-(family-name:--lp-font-display) font-normal uppercase leading-[.92] ${size} ${className}`}>
      {children}
    </Tag>
  );
}

/** Centered 1100px content column. */
export function Wrap({ className = "", children }) {
  return <div className={`mx-auto max-w-[1100px] px-7 ${className}`}>{children}</div>;
}

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-[10px] border border-(--lp-line) bg-(--lp-card) p-4 [box-shadow:var(--lp-shadow)] ${className}`}>{children}</div>
  );
}

/** Photo with the dark/orange overlay and a gradient tag in the corner. */
export function PhotoCard({ image, tag, position = "center" }) {
  return (
    <div
      className="relative min-h-[340px] overflow-hidden rounded bg-(--lp-bg2) bg-cover"
      style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(11,13,18,0.6)),linear-gradient(135deg,rgba(255,90,31,0.16),transparent_55%)]" />
      <span className="absolute bottom-4 left-4 z-10 rounded-[3px] bg-[linear-gradient(135deg,#ff7a1a_0%,#ff3d2e_55%,#e5214a_100%)] px-2.5 py-[5px] text-[10px] font-semibold tracking-[1px] text-white">
        {tag}
      </span>
    </div>
  );
}
