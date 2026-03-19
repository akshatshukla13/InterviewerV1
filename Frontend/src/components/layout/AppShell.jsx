/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { designTokens } from "@/design/tokens";

const baseNavClass =
  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100";

function SidebarNav({ items = [], onNavigate }) {
  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          to={item.href}
          onClick={onNavigate}
          className={`${baseNavClass} block text-slate-700`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function AppShell({
  title,
  subtitle,
  sidebarItems = [],
  topActions,
  children,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className={designTokens.container}>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Toggle navigation"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
              <Link to="/" className="inline-flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">CodeInterview.Tech</span>
              </Link>
            </div>
            <div className="hidden lg:flex">{topActions}</div>
          </div>
        </div>
      </header>

      <main className={`${designTokens.container} py-8`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside
            className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
              open ? "block" : "hidden"
            } lg:block`}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Navigation
            </h2>
            <SidebarNav items={sidebarItems} onNavigate={() => setOpen(false)} />
          </aside>

          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              {subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}
              <div className="mt-4 lg:hidden">{topActions}</div>
            </div>
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
