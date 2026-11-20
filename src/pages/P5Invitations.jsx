import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, MailOpen } from 'lucide-react';
import { PortalHeader, StatusChip } from '../components/UI';
import { MOCK_INVITATIONS } from '../services/api';

const STATUS_BADGE = {
  PENDING: ['Menunggu Konfirmasi', 'warning'],
  CONFIRMED: ['Hadir Terkonfirmasi', 'success'],
  EXPIRED: ['Kedaluwarsa', 'error'],
  DECLINED: ['Ditolak', 'neutral'],
};

export default function P5Invitations({ onSelectInvitation }) {
  const [filter, setFilter] = useState('ALL');

  const filtered = MOCK_INVITATIONS.filter(
    (inv) => filter === 'ALL' || inv.interview.status === filter
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-24">
      <PortalHeader title="Undangan Wawancara" subtitle="Daftar panggilan wawancara milikmu" />

      <main className="max-w-md w-full mx-auto px-4 py-5 space-y-4">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {[
            ['ALL', 'Semua'],
            ['PENDING', 'Menunggu'],
            ['CONFIRMED', 'Terkonfirmasi'],
            ['EXPIRED', 'Kedaluwarsa'],
          ].map(([k, lbl]) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`px-3.5 h-8 rounded-full text-xs font-semibold transition ${
                filter === k
                  ? 'bg-[#172033] text-white'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
            <MailOpen className="w-8 h-8 text-slate-400 mx-auto" strokeWidth={1.5} />
            <p className="font-display font-semibold text-base text-[#172033]">
              Belum ada undangan pada kategori ini
            </p>
            <p className="text-xs text-slate-500">
              Undangan wawancara akan muncul di sini setelah lamaranmu disetujui tim rekrutmen.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((inv) => {
              const [badgeText, badgeKind] = STATUS_BADGE[inv.interview.status] || ['—', 'neutral'];
              const isPending = inv.interview.status === 'PENDING';
              return (
                <button
                  key={inv.id}
                  type="button"
                  onClick={() => onSelectInvitation(inv)}
                  className={`w-full text-left rounded-xl border p-4 shadow-sm transition space-y-3 ${
                    isPending
                      ? 'bg-[#FFFBE6] border-[#FFCC00] hover:border-[#172033]'
                      : 'bg-white border-slate-200 hover:border-[#172033]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-semibold text-base text-[#172033]">
                        {inv.job_title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {inv.department} · {inv.code}
                      </p>
                    </div>
                    <StatusChip variant={badgeKind} dot>
                      {badgeText}
                    </StatusChip>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#172033] shrink-0" strokeWidth={1.5} />
                      <span>
                        {inv.interview.date} · {inv.interview.time}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#172033] shrink-0" strokeWidth={1.5} />
                      <span className="truncate">{inv.interview.location}</span>
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    {isPending ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-[#A16207]">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Konfirmasi dalam 21 jam 14 menit
                      </span>
                    ) : (
                      <span className="text-slate-500">Ketuk untuk melihat detail</span>
                    )}
                    <span className="inline-flex items-center gap-1 font-semibold text-[#172033]">
                      {isPending ? 'Konfirmasi' : 'Lihat detail'}
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
