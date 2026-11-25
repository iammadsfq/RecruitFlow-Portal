import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, Clock, MapPin, FileText, Phone, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { PortalHeader, StatusChip, HairlineIllustration } from '../components/UI';
import {
  INITIAL_SLOTS,
  fetchAvailableSlots,
  confirmInterviewApi,
  declineInterviewApi,
  rescheduleInterviewApi,
} from '../services/api';

function formatCountdown(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h} jam ${String(m).padStart(2, '0')} menit ${String(s).padStart(2, '0')} detik`;
}

export default function P5Interview({ application, onBackToStatus, onBackHome }) {
  const initStatus = application?.interview?.status;
  const [view, setView] = useState(initStatus === 'CONFIRMED' ? 'confirmed' : 'invite'); // invite | reschedule | confirmed | declined
  const [secondsLeft, setSecondsLeft] = useState(
    initStatus === 'EXPIRED' ? 0 : application?.interview?.remaining_seconds ?? 76440
  );
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [selectedSlotId, setSelectedSlotId] = useState('slot_1');
  const [conflict409, setConflict409] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [confirmedSlot, setConfirmedSlot] = useState({
    date: application?.interview?.date || 'Senin, 24 Nov 2026',
    time: application?.interview?.time || '10.00 WIB (30 menit)',
  });

  useEffect(() => {
    if (view !== 'invite' || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, [view, secondsLeft]);

  useEffect(() => {
    if (view !== 'reschedule') return;
    fetchAvailableSlots().then((list) => {
      setSlots(list);
      const firstAvail = list.find((s) => s.available);
      if (firstAvail) setSelectedSlotId(firstAvail.id);
    });
  }, [view]);

  const expired = secondsLeft <= 0;
  const interviewToken = application?.interview?.token || '';

  const handleConfirmPresence = async () => {
    await confirmInterviewApi(interviewToken);
    setView('confirmed');
  };

  const handleConfirmDecline = async () => {
    await declineInterviewApi(interviewToken, declineReason);
    setShowDeclineModal(false);
    setView('declined');
  };

  const handleConfirmReschedule = async () => {
    const slot = slots.find((s) => s.id === selectedSlotId);
    if (!slot) return;
    const res = await rescheduleInterviewApi(interviewToken, slot.id);
    if (res.conflict || slot.conflictSim) {
      setConflict409(true);
      setSlots((prev) => prev.map((s) => (s.id === slot.id ? { ...s, available: false, conflictSim: false } : s)));
      const nextAvail = slots.find((s) => s.available && s.id !== slot.id);
      if (nextAvail) setSelectedSlotId(nextAvail.id);
      return;
    }
    setConflict409(false);
    setConfirmedSlot({ date: slot.date, time: `${slot.time} (30 menit)` });
    setView('confirmed');
  };

  if (view === 'confirmed') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 pb-10">
        <PortalHeader title="RecruitFlow Karir" onBack={onBackToStatus} />
        <main className="max-w-md w-full mx-auto px-4 py-6 space-y-5 text-center">
          <HairlineIllustration badge={<Check className="w-5 h-5" strokeWidth={2.5} />} />
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#172033]">
              Terima kasih, kehadiranmu sudah dikonfirmasi.
            </h2>
            <StatusChip variant="success" dot>
              Hadir terkonfirmasi
            </StatusChip>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 text-left space-y-3 shadow-sm">
            <h3 className="font-display font-semibold text-base text-[#172033]">Persiapan wawancara</h3>
            {[
              [Calendar, `${confirmedSlot.date} · ${confirmedSlot.time}`],
              [MapPin, application?.interview?.location || 'Kantor Pusat, Jakarta Pusat'],
              [FileText, 'Bawa KTP asli dan salinan CV'],
              [Clock, 'Datang 15 menit lebih awal'],
            ].map(([IconComp, text], i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                <IconComp className="w-4 h-4 text-[#172033] shrink-0" strokeWidth={1.5} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            Pengingat otomatis akan dikirim H-1. Berhalangan mendadak? Hubungi narahubung HR.
          </p>

          <button
            type="button"
            onClick={onBackToStatus}
            className="w-full h-11 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-[#172033] hover:bg-slate-50"
          >
            Kembali ke status lamaran
          </button>
        </main>
      </div>
    );
  }

  if (view === 'declined') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <PortalHeader title="Konfirmasi Wawancara" onBack={onBackHome} />
        <main className="max-w-md w-full mx-auto px-4 py-10 text-center space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <StatusChip variant="neutral" dot>
              Undangan Ditolak (Final)
            </StatusChip>
            <h2 className="font-display text-xl font-bold text-[#172033]">
              Terima kasih sudah memberi kabar
            </h2>
            <p className="text-sm text-slate-600">
              Slot wawancaramu telah dilepas untuk kandidat lain. Keputusan ini bersifat final—hubungi tim HR bila ada kekeliruan.
            </p>
            <button
              type="button"
              onClick={onBackHome}
              className="w-full h-11 rounded-xl bg-[#172033] text-white text-sm font-semibold"
            >
              Lihat Lowongan Lain
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'reschedule') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 pb-28">
        <PortalHeader title="Pilih jadwal lain" subtitle={application?.job_title} onBack={() => setView('invite')} />
        <main className="max-w-md w-full mx-auto px-4 py-5 space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold text-[#172033]">Slot yang masih tersedia</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Setelah kamu mengonfirmasi slot baru, jadwal lamamu otomatis dilepas.
            </p>
          </div>

          {conflict409 && (
            <div className="bg-[#FEF3C7] border border-amber-300 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#A16207]">
                <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="text-xs font-bold">Slot baru saja terisi (409 Conflict)</span>
              </div>
              <p className="text-xs text-amber-900">
                Kandidat lain baru saja mengunci slot tersebut. Daftar slot telah diperbarui—silakan pilih slot lain yang tersedia.
              </p>
            </div>
          )}

          <div className="space-y-2.5">
            {slots.map((s) => {
              const selected = selectedSlotId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={!s.available}
                  onClick={() => setSelectedSlotId(s.id)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition ${
                    !s.available
                      ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                      : selected
                      ? 'bg-[#FFFBE6] border-[#FFCC00] border-2'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected && s.available ? 'border-[#172033]' : 'border-slate-300'
                    }`}
                  >
                    {selected && s.available && <span className="w-2.5 h-2.5 rounded-full bg-[#172033]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#172033]">{s.date}</p>
                    <p className="text-xs text-slate-500">{s.time}</p>
                  </div>
                  {s.available ? (
                    <StatusChip variant="success" dot>
                      Tersedia
                    </StatusChip>
                  ) : (
                    <StatusChip variant="neutral">Penuh</StatusChip>
                  )}
                </button>
              );
            })}
          </div>
        </main>

        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              onClick={handleConfirmReschedule}
              className="w-full h-12 rounded-xl bg-[#FFCC00] hover:bg-[#F2BE00] text-[#172033] font-semibold text-sm"
            >
              Konfirmasi jadwal baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-24">
      <PortalHeader title="RecruitFlow Karir" onBack={onBackToStatus} />

      <main className="max-w-md w-full mx-auto px-4 py-5 space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#172033]">Kamu diundang wawancara</h2>
          <p className="text-sm text-slate-500 mt-1">
            Halo {application?.applicant_name || 'Budi'}, selamat! Mohon konfirmasi kehadiranmu di bawah ini.
          </p>
        </div>

        {/* Countdown */}
        <div
          className={`rounded-xl p-3.5 flex items-center gap-3 ${
            expired ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#FEF3C7] text-[#A16207]'
          }`}
        >
          <Clock className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          <div className="flex-1">
            <p className="text-xs font-medium">
              {expired ? 'Batas waktu konfirmasi berakhir' : 'Sisa waktu konfirmasi'}
            </p>
            <p className="font-display font-bold text-base tabular-nums">
              {expired ? '00:00 (Slot dilepas otomatis)' : formatCountdown(secondsLeft)}
            </p>
          </div>
        </div>

        {/* Interview Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3.5 shadow-sm">
          {[
            [Briefcase, 'Posisi', `${application?.job_title || 'Crew Operasional'} · PT Inovasi Digital Nusantara`],
            [Calendar, 'Tanggal', confirmedSlot.date],
            [Clock, 'Waktu', confirmedSlot.time],
            [MapPin, 'Lokasi', application?.interview?.location || 'Kantor Pusat, Jl. Merdeka No. 12, Jakarta Pusat'],
            [FileText, 'Bawa', application?.interview?.documents || 'KTP asli dan salinan CV'],
            [Phone, 'Narahubung', application?.interview?.contact || 'Rina (HR) · 0812-0000-0000'],
          ].map(([IconComp, label, val], idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <IconComp className="w-4 h-4 text-[#172033]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-sm font-semibold text-[#172033]">{val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            disabled={expired}
            onClick={handleConfirmPresence}
            className="w-full h-12 rounded-xl bg-[#FFCC00] hover:bg-[#F2BE00] disabled:bg-slate-200 disabled:text-slate-400 text-[#172033] font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <Check className="w-4 h-4" strokeWidth={2} />
            {expired ? 'Konfirmasi hadir (Waktu habis)' : 'Konfirmasi hadir'}
          </button>
          <button
            type="button"
            disabled={expired}
            onClick={() => setView('reschedule')}
            className="w-full h-11 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 text-[#172033] font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            Ajukan jadwal lain
          </button>
          <button
            type="button"
            disabled={expired}
            onClick={() => setShowDeclineModal(true)}
            className="w-full h-11 rounded-xl border border-red-200 bg-white hover:bg-red-50 disabled:opacity-50 text-[#B91C1C] font-semibold text-sm transition"
          >
            Tidak bisa hadir
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Tautan ini bersifat pribadi dan hanya berlaku untukmu. Jangan dibagikan.
        </p>
      </main>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <div className="w-11 h-11 rounded-full bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#172033]">Tidak bisa hadir?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Slot wawancaramu akan dilepas untuk kandidat lain dan keputusan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1">
                Alasan (opsional)
              </label>
              <input
                type="text"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Mis. bentrok dengan pekerjaan lain"
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleConfirmDecline}
                className="w-full h-11 rounded-xl bg-[#B91C1C] text-white text-sm font-semibold hover:bg-red-800"
              >
                Ya, saya tidak bisa hadir
              </button>
              <button
                type="button"
                onClick={() => setShowDeclineModal(false)}
                className="w-full h-11 rounded-xl border border-slate-300 text-sm font-semibold text-[#172033]"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
