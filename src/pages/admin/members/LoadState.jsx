import { FiAlertTriangle } from "react-icons/fi";

// Shown instead of page content while loading or after a failed request.
const LoadState = ({ error, onRetry, children }) => (
  <div className="flex flex-col items-center gap-3 rounded-md border border-(--gym-line) bg-(--gym-card) p-12 text-center text-(--gym-subtext)">
    {error ? (
      <>
        <FiAlertTriangle className="text-3xl text-red-500" />
        <p role="alert">{error}</p>
        {onRetry && (
          <button onClick={onRetry} className="rounded-md bg-[#FF542E] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
            Try again
          </button>
        )}
        {children}
      </>
    ) : (
      <>
        <span className="loading loading-spinner loading-md text-[#FF542E]" />
        <p>Loading…</p>
      </>
    )}
  </div>
);

export default LoadState;
