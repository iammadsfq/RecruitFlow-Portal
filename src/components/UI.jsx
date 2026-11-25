import React from 'react';
import {
  ArrowLeft, CheckCircle2, AlertTriangle, Clock, Info, XCircle,
  Briefcase, Search, CalendarCheck,
} from 'lucide-react';

export function LogoMark({ size = 36 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#FFCC00] border border-amber-300/60 flex items-center justify-center shrink-0 shadow-sm"
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M17 47V17H32C37.5 17 41.5 20.6 41.5 25.8C41.5 31 37.5 34.4 32 34.4H23.5"
          stroke="#172033"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 34.4L47 47"
          stroke="#172033"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M39 20L48 15L43 24"
          stroke="#FFFFFF"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="15" r="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

export function StatusChip({ children, variant = 'neutral', dot = false }) {
  const styles = {
    neutral: 'bg-slate-100 text-slate-700',
    yellow: 'bg-[#FFF7CC] text-[#172033]',
    success: 'bg-[#DCFCE7] text-[#15803D]',
    warning: 'bg-[#FEF3C7] text-[#A16207]',
    error: 'bg-[#FEE2E2] text-[#B91C1C]',
    info: 'bg-[#DBEAFE] text-[#1D4ED8]',
    ai: 'bg-[#F0EDFF] text-[#6656D9]',
  };
  const dotColors = {
    neutral: 'bg-slate-500',
    yellow: 'bg-[#172033]',
    success: 'bg-[#15803D]',
    warning: 'bg-[#A16207]',
    error: 'bg-[#B91C1C]',
    info: 'bg-[#1D4ED8]',
    ai: 'bg-[#6656D9]',
  };
  const icons = {
    success: <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />,
    warning: <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />,
    error: <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} />,
    info: <Info className="w-3.5 h-3.5" strokeWidth={1.5} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
        styles[variant] || styles.neutral
      }`}
    >
      {dot && !icons[variant] && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {icons[variant] || null}
      {children}
    </span>
  );
}

export function HairlineIllustration({ badge }) {
  return (
    <div className="relative w-64 h-44 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 280 200" className="w-full h-full" fill="none">
        <line x1="140" y1="15" x2="140" y2="185" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 5" />
        <ellipse cx="140" cy="100" rx="118" ry="56" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 5" />
        {/* Bottom slab */}
        <polygon points="65,130 140,95 215,130 140,165" fill="#FFFFFF" stroke="#172033" strokeWidth="1.2" />
        {/* Middle slab */}
        <polygon points="65,105 140,70 215,105 140,140" fill="#FFFFFF" stroke="#172033" strokeWidth="1.2" />
        {/* Top yellow slab */}
        <polygon points="65,80 140,45 215,80 140,115" fill="#FFCC00" stroke="#172033" strokeWidth="1.2" />
        <line x1="114" y1="80" x2="162" y2="80" stroke="#172033" strokeWidth="1.5" strokeLinecap="round" />
        {/* Orbit pins */}
        <circle cx="44" cy="70" r="7" fill="#FFFFFF" stroke="#172033" strokeWidth="1.2" />
        <circle cx="236" cy="64" r="7" fill="#FFCC00" stroke="#172033" strokeWidth="1.2" />
        <circle cx="222" cy="144" r="7" fill="#FFFFFF" stroke="#172033" strokeWidth="1.2" />
      </svg>
      {badge && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#15803D] text-white flex items-center justify-center shadow-md">
          {badge}
        </div>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-100 rounded w-1/3" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}

export function PortalHeader({ title = 'RecruitFlow Karir', subtitle, onBack, rightAction }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali"
            className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition"
          >
            <ArrowLeft className="w-5 h-5 text-[#172033]" strokeWidth={1.5} />
          </button>
        ) : (
          <LogoMark size={34} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-semibold text-base text-[#172033] truncate">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
        </div>
        {rightAction || null}
      </div>
    </header>
  );
}

export function BottomNav({ activePage, onNavigate }) {
  const items = [
    { id: 'p1', label: 'Lowongan', icon: Briefcase },
    { id: 'p4', label: 'Lacak Status', icon: Search },
    { id: 'p5', label: 'Undangan', icon: CalendarCheck, badge: true },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.05)]">
      <div className="max-w-2xl mx-auto px-2 h-16 grid grid-cols-3 items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id || (item.id === 'p1' && activePage === 'p2');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 py-1 relative group"
            >
              <div
                className={`px-4 py-1 rounded-full transition ${
                  active ? 'bg-[#FFF7CC] text-[#172033]' : 'text-slate-500 group-hover:text-[#172033]'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
              </div>
              {item.badge && (
                <span className="w-2 h-2 rounded-full bg-[#FFCC00] ring-2 ring-white absolute top-1.5 right-[34%]" />
              )}
              <span
                className={`text-[11px] font-semibold ${
                  active ? 'text-[#172033]' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="bg-[#FEE2E2] border border-red-200 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" strokeWidth={1.5} />
      <div className="flex-1 text-sm text-[#B91C1C]">
        <p className="font-semibold">Gagal memuat data</p>
        <p className="mt-0.5 text-red-800">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2.5 px-3 py-1.5 bg-[#B91C1C] text-white text-xs font-semibold rounded-lg hover:bg-red-800"
          >
            Coba lagi
          </button>
        )}
      </div>
    </div>
  );
}
