import { useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast toast-end z-50" role="status">
      <div className="flex items-center gap-3 rounded-md border border-green-500/40 bg-(--gym-card) px-4 py-3 text-sm text-(--gym-text) shadow-lg">
        <FiCheckCircle className="shrink-0 text-lg text-green-500" />
        <span>{message}</span>
        <button onClick={onClose} aria-label="Dismiss" className="text-(--gym-subtext) hover:text-(--gym-text)">
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default Toast;
