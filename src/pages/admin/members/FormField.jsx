const FormField = ({ label, htmlFor, error, optional = false, children, className = "" }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
      {label} {optional && <span className="font-normal text-(--gym-subtext)">(optional)</span>}
    </label>
    {children}
    {error && (
      <p id={`${htmlFor}-error`} className="mt-1 text-xs text-red-500">
        {error}
      </p>
    )}
  </div>
);

export default FormField;
