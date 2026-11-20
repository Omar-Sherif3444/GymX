import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiMaximize } from "react-icons/fi";

const styles = {
  ready: { icon: FiMaximize, box: "border-(--gym-line) text-(--gym-subtext)", title: "Ready to scan" },
  success: { icon: FiCheckCircle, box: "border-green-500/40 bg-green-500/10 text-green-500", title: "Checked in" },
  expired: { icon: FiAlertTriangle, box: "border-amber-500/40 bg-amber-500/10 text-amber-500", title: "Membership expired" },
  invalid: { icon: FiXCircle, box: "border-red-500/40 bg-red-500/10 text-red-500", title: "Check-in rejected" },
};

const ScanResult = ({ result }) => {
  const { icon: Icon, box, title } = styles[result.state];

  return (
    <div className={`flex items-start gap-3 rounded-md border p-4 ${box}`}>
      <Icon className="mt-0.5 shrink-0 text-xl" />
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-(--gym-subtext)">{result.message}</p>
      </div>
    </div>
  );
};

export default ScanResult;
