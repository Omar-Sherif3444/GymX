// Landing design tokens as inline CSS variables (same pattern as the team's ThemeProvider).
// Colors follow the team's --gym-* variables when they exist; the design's values are the fallback.
const BASE = {
  "--lp-font-display": 'Anton, Impact, "Arial Narrow", sans-serif',
  "--lp-font-body": "Barlow, system-ui, sans-serif",
  "--lp-orange": "#ff5a1f",
  "--lp-rose": "#ff8fa3",
};

const DARK = {
  "--lp-bg": "var(--gym-bg, #0b0d12)",
  "--lp-bg2": "var(--gym-surface, #10131a)",
  "--lp-card": "var(--gym-card, #151821)",
  "--lp-ink": "var(--gym-text, #f4efea)",
  "--lp-sub": "var(--gym-subtext, #c9c2bb)",
  "--lp-label": "var(--gym-label, #ffb59e)",
  "--lp-line": "var(--gym-line, rgba(255,143,163,0.22))",
  "--lp-track": "#242836",
  "--lp-shadow": "none",
  "--lp-hov":
    "radial-gradient(circle 700px at 15% 40%, rgba(255,61,46,0.32), transparent 65%), linear-gradient(90deg, rgba(11,13,18,0.9) 0%, rgba(11,13,18,0.6) 50%, rgba(11,13,18,0.22) 100%)",
  "--lp-nav": "#f4efea",
  "--lp-nav-shadow": "0 1px 6px rgba(0,0,0,0.45)",
};

const LIGHT = {
  "--lp-bg": "var(--gym-bg, #fff8f4)",
  "--lp-bg2": "var(--gym-surface, #ffefe8)",
  "--lp-card": "var(--gym-card, #ffffff)",
  "--lp-ink": "var(--gym-text, #1a0b08)",
  "--lp-sub": "var(--gym-subtext, #5c4a44)",
  "--lp-label": "var(--gym-label, #d9411a)",
  "--lp-line": "var(--gym-line, rgba(255,143,163,0.35))",
  "--lp-track": "#ffe3d8",
  "--lp-shadow": "0 4px 20px rgba(255,90,31,0.08)",
  "--lp-hov":
    "radial-gradient(circle 700px at 15% 40%, rgba(255,143,163,0.45), transparent 65%), linear-gradient(90deg, rgba(255,248,244,0.94) 0%, rgba(255,248,244,0.74) 50%, rgba(255,248,244,0.3) 100%)",
  "--lp-nav": "#1a0b08",
  "--lp-nav-shadow": "none",
};

export const landingTokens = (theme) => ({
  ...BASE,
  ...(theme === "light" ? LIGHT : DARK),
  colorScheme: theme,
});
