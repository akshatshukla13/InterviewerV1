export const designTokens = {
  container: "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10",
  colors: {
    primary: "#2563eb",
    secondary: "#0f766e",
    neutral50: "#f8fafc",
    neutral100: "#f1f5f9",
    neutral200: "#e2e8f0",
    neutral500: "#64748b",
    neutral700: "#334155",
    neutral900: "#0f172a",
    success: "#15803d",
    warning: "#b45309",
    error: "#b91c1c",
  },
  spacing: {
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "40px",
    xxl: "48px",
  },
  typography: {
    h1: "text-4xl lg:text-5xl font-semibold leading-tight tracking-tight",
    h2: "text-2xl lg:text-3xl font-semibold leading-tight tracking-tight",
    h3: "text-xl font-semibold leading-tight",
    body: "text-base leading-7",
    small: "text-sm leading-6",
  },
};

export const dashboardSidebarItems = {
  interviewer: [
    { label: "Dashboard", href: "/interview-dashboard" },
    { label: "Schedule Interview", href: "/schedule-interview" },
    { label: "Evaluation Forms", href: "/evalForm" },
  ],
  candidate: [{ label: "Dashboard", href: "/interview-dashboard" }],
};
