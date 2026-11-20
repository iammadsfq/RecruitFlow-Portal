import React, { useState } from 'react';
import { Briefcase, Calendar, Check, Search, RefreshCw, AlertTriangle, BookmarkCheck } from 'lucide-react';
import { PortalHeader, StatusChip } from '../components/UI';
import { MOCK_APPLICATIONS } from '../services/api';

const TIMELINE_STEPS = [
  { key: 'RECEIVED', title: 'Lamaran diterima', desc: 'Berkasmu berhasil kami terima', date: '12 Nov, 09.14 WIB' },
  { key: 'REVIEWING', title: 'Sedang ditinjau tim rekrutmen', desc: 'Tim memeriksa berkas dan kualifikasi', date: '13 Nov, 14.02 WIB' },
  { key: 'INVITED', title: 'Undangan wawancara terbit', desc: 'Jadwal siap kamu konfirmasi', date: '14 Nov, 10.30 WIB' },
  { key: 'SCHEDULED', title: 'Wawancara terjadwal', desc: 'Menunggu konfirmasimu', date: '' },
  { key: 'COMPLETED', title: 'Proses selesai', desc: 'Kami akan mengabari hasil akhirnya', date: '' },
];

export default function P4Track({ initialCode = 'APP-2026-X9A7', onBack, onOpenInvite }) {
  const [inputCode, setInputCode] = useState(initialCode);
  const [activeCode, setActiveCode] = useState(initialCode);
  const [savedTalentPool, setSavedTalentPool] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Baru saja');

  const normalized = activeCode.trim().toUpperCase();
  const app = MOCK_APPLICATIONS[normalized];

  const handleLookup = (e) => {
    e.preventDefault();
    setActiveCode(inputCode.trim().toUpperCase());
    setSavedTalentPool(false);
  };

  const getStepState = (stepKey, stage) => {
    const order = ['RECEIVED', 'REVIEWING', 'INVITED', 'SCHEDULED', 'COMPLETED'];
    const curIdx = order.indexOf(stage);
    const stepIdx = order.indexOf(stepKey);
    if (curIdx === -1) return 'todo';
    if (stepIdx < curIdx) return 'done';
    if (stepIdx === curIdx) return 'now';
    return 'todo';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-24">
      <PortalHeader title="Status lamaran" subtitle={normalized || 'Masukkan kode referensi'} onBack={onBack} />

      <main className="max-w-md w-full mx-auto px-4 py-5 space-y-4">
        {/* Manual code lookup + Quick edge case chips */}
        <form onSubmit={handleLookup} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
          <label className="block text-xs font-semibold text-slate-600">
            Cek dengan kode referensi lamaran
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="APP-2026-X9A7"
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-300 text-sm uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 h-10 rounded-lg bg-[#172033] text-white text-xs font-semibold hover:bg-[#25324A]"
            >
              Cek
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 w-full">Uji skenario status:</span>
            {[
              ['APP-2026-X9A7', 'Diundang'],
              ['APP-2026-R4T9', 'Ditinjau (OCR)'],
              ['APP-2026-Q5Z1', 'Ditolak Empatik'],
              ['APP-2026-EXP0', 'Token Expired'],
              ['APP-SALAH', '404 Salah'],
            ].map(([code, lbl]) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setInputCode(code);
                  setActiveCode(code);
                  setSavedTalentPool(false);
                }}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${
                  normalized === code
                    ? 'bg-[#FFF7CC] border-[#FFCC00] text-[#172033]'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </form>

        {/* Not Found (404) */}
        {!app && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center space-y-2">
            <AlertTriangle className="w-8 h-8 text-[#A16207] mx-auto" strokeWidth={1.5} />
            <h3 className="font-display font-semibold text-base text-[#172033]">
              Kode lamaran tidak ditemukan
            </h3>
            <p className="text-sm text-slate-500">
              Periksa kembali penulisan kode referensi atau cek email konfirmasi lamaranmu.
            </p>
          </div>
        )}

        {/* Expired Token (BR-11) */}
        {app && app.stage === 'EXPIRED' && (
          <div className="bg-[#FEE2E2] border border-red-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#B91C1C]">
              <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
              <h3 className="font-display font-semibold text-sm">
                Tautan pelacakan telah kedaluwarsa (BR-11)
              </h3>
            </div>
            <p className="text-xs text-red-900 leading-relaxed">
              Masa berlaku tautan pelacakan mandiri adalah 60 hari sejak lamaran dikirim. Untuk informasi lebih lanjut, hubungi tim rekrutmen di{' '}
              <span className="font-semibold">recruitment@inovasidigital.co.id</span>.
            </p>
          </div>
        )}

        {/* Valid Active / Rejected */}
        {app && app.stage !== 'EXPIRED' && (
          <>
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FFF7CC] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-[#172033]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-base text-[#172033] truncate">
                  {app.job_title}
                </h3>
                <p className="text-xs text-slate-500">
                  Dilamar {app.applied_at} · {app.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLastUpdated('Baru saja (WIB)')}
                title="Perbarui status"
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {app.stage === 'REJECTED' ? (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <StatusChip variant="neutral" dot>
                  Proses Selesai · Belum Dapat Dilanjutkan
                </StatusChip>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-base text-[#172033]">
                    Terima kasih telah melamar posisi {app.job_title}.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Saat ini kami belum dapat melanjutkan lamaranmu ke tahap wawancara. Kami sangat menghargai waktu dan usaha yang kamu luangkan selama proses ini.
                  </p>
                </div>

                <div className="bg-[#FFFBE6] border border-[#FFCC00] rounded-xl p-4 space-y-2.5">
                  <p className="text-sm font-semibold text-[#172033]">
                    Simpan profilmu di Bank Talenta kami?
                  </p>
                  <p className="text-xs text-slate-600">
                    Jika bersedia, tim kami dapat menghubungimu lebih dulu saat ada lowongan baru yang sesuai.
                  </p>
                  {savedTalentPool ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#15803D]">
                      <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} />
                      Profilmu tersimpan di Bank Talenta selama 180 hari.
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSavedTalentPool(true)}
                      className="w-full h-10 rounded-lg bg-[#172033] text-white text-xs font-semibold hover:bg-[#25324A]"
                    >
                      Ya, Simpan di Bank Talenta
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* 5-Stage Timeline */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  {TIMELINE_STEPS.map((st, idx) => {
                    const state = getStepState(st.key, app.stage);
                    return (
                      <div key={st.key} className="flex gap-3.5">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                              state === 'done'
                                ? 'bg-[#15803D] text-white'
                                : state === 'now'
                                ? 'bg-[#FFCC00] text-[#172033]'
                                : 'bg-white border-2 border-slate-300'
                            }`}
                          >
                            {state === 'done' && <Check className="w-4 h-4" strokeWidth={2.2} />}
                            {state === 'now' && <span className="w-2.5 h-2.5 rounded-full bg-[#172033]" />}
                          </div>
                          {idx < TIMELINE_STEPS.length - 1 && (
                            <div
                              className={`w-0.5 h-9 ${
                                state === 'done' ? 'bg-[#15803D]' : 'bg-slate-200'
                              }`}
                            />
                          )}
                        </div>
                        <div className="pb-4">
                          <p
                            className={`text-sm font-semibold ${
                              state === 'todo' ? 'text-slate-400' : 'text-[#172033]'
                            }`}
                          >
                            {st.title}
                          </p>
                          <p className="text-xs text-slate-500">{st.desc}</p>
                          {st.date && state !== 'todo' && (
                            <p className="text-[11px] text-slate-400 mt-0.5">{st.date}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {app.stage === 'INVITED' && (
                  <div className="bg-[#FFFBE6] border border-[#FFCC00] rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-[#172033]">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-sm font-semibold">Undangan wawancara menunggu</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Konfirmasi dalam 21 jam 14 menit agar slot wawancaramu tetap aman.
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenInvite(app)}
                      className="w-full h-11 rounded-xl bg-[#FFCC00] hover:bg-[#F2BE00] text-[#172033] font-semibold text-sm transition"
                    >
                      Lihat undangan
                    </button>
                  </div>
                )}
              </>
            )}

            <p className="text-[11px] text-slate-400 text-center leading-relaxed px-2">
              Diperbarui: {lastUpdated}. Demi privasi, halaman ini hanya menampilkan tahap proses tanpa skor atau catatan internal.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
