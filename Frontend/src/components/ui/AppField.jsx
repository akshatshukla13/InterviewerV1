/* eslint-disable react/prop-types */
export default function AppField({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  readOnly = false,
  required = false,
  min,
  children,
}) {
  const baseClass =
    "w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2";
  const stateClass = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
    : "border-slate-300 focus:border-blue-500 focus:ring-blue-200";

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          readOnly={readOnly}
          required={required}
          min={min}
          className={`${baseClass} ${stateClass} ${
            readOnly ? "bg-slate-100 text-slate-500" : "bg-white"
          }`}
        />
      )}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
