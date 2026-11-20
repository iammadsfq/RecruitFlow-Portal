import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PortalHeader, HairlineIllustration } from '../components/UI';

export default function P3Submitted({ submission, onTrack, onBackHome }) {
  const [copied, setCopied] = useState(false);
  const code = submission?.code || 'APP-2026-X9A7';
  const name = submission?.name || 'Kandidat';

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-28">
      <PortalHeader title="RecruitFlow Karir" onBack={onBackHome} />

      <main className="max-w-md w-full mx-auto px-4 py-6 space-y-5 text-center">
        <HairlineIllustration badge={<Check className="w-5 h-5" strokeWidth={2.5} />} />

        <div>
          <h2 className="font-display text-2xl font-bold text-[#172033]">Lamaran terkirim</h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Terima kasih, {name}. Tim rekrutmen akan memeriksa berkasmu dalam 1–3 hari kerja.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 text-left space-y-2 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Kode referensi lamaran</span>
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-2xl font-bold text-[#172033] tracking-tight tabular-nums">
              {code}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-[#172033] hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#15803D]" strokeWidth={2} />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Salin
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Simpan kode ini untuk memeriksa status kapan saja. Salinannya juga dikirim ke emailmu.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 text-left space-y-3 shadow-sm">
          <h3 className="font-display font-semibold text-base text-[#172033]">
            Apa yang terjadi selanjutnya?
          </h3>
          {[
            ['Berkas diperiksa tim rekrutmen', '1–3 hari kerja'],
            ['Kabar lewat WhatsApp / email', 'Jika lanjut ke tahap wawancara'],
            ['Konfirmasi jadwal', 'Lewat tautan pribadi yang aman'],
          ].map(([title, sub], i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#FFF7CC] text-[#172033] text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#172033]">{title}</p>
                <p className="text-xs text-slate-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30">
        <div className="max-w-md mx-auto px-4 py-3">
          <button
            type="button"
            onClick={() => onTrack(code)}
            className="w-full h-12 rounded-xl bg-[#FFCC00] hover:bg-[#F2BE00] text-[#172033] font-semibold text-sm transition"
          >
            Lacak status lamaran
          </button>
        </div>
      </div>
    </div>
  );
}
