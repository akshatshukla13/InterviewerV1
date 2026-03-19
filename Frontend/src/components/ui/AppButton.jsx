/* eslint-disable react/prop-types */
export default function AppButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-blue-600",
    secondary:
      "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-600 border border-teal-700",
    outline:
      "bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400 border border-slate-300",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
