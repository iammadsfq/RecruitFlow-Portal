import React, { useState } from 'react';
import { Check, Upload, FileText, X, Info, AlertCircle } from 'lucide-react';
import { PortalHeader, StatusChip } from '../components/UI';

export default function P2Apply({ job, onBack, onSubmitted, onGoTrack }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    education: 'SMK / SMA',
    experience: '',
    answers: {},
    consent: false,
  });
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [duplicateNotice, setDuplicateNotice] = useState(false);

  if (!job) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama lengkap wajib diisi.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Format email tidak valid, contoh: budi@email.com';
    }
    const cleanPhone = form.phone.replace(/[\s-]/g, '');
    if (!/^(08|\+628)[0-9]{7,12}$/.test(cleanPhone)) {
      e.phone = 'Format nomor telepon belum sesuai, gunakan format 0812xxxxxx';
    }
    if (!form.city.trim()) e.city = 'Kota domisili wajib diisi.';
    const expNum = parseFloat(form.experience.replace(',', '.'));
    if (form.experience === '' || Number.isNaN(expNum) || expNum < 0 || expNum > 60) {
      e.experience = 'Masukkan angka pengalaman valid (0 – 60 tahun), contoh: 2.5';
    }
    for (const q of job.screening_questions || []) {
      if (q.is_required && !form.answers[q.id]) {
        e[`q_${q.id}`] = 'Pertanyaan ini wajib dijawab.';
      }
    }
    if (!cvFile) e.cv = 'Unggah berkas CV PDF terlebih dahulu.';
    if (!form.consent) e.consent = 'Kamu perlu menyetujui pemrosesan data seleksi.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (e) => {
    setCvError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setCvError('Hanya berkas format PDF yang diperbolehkan.');
      setCvFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError('Ukuran berkas melebihi 5 MB. Kompres PDF terlebih dahulu.');
      setCvFile(null);
      return;
    }
    setCvFile(file);
    setErrors((prev) => ({ ...prev, cv: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDuplicateNotice(false);
    if (!validate()) return;

    // Simulasi edge case BR-04 lamaran ganda jika memakai email demo budi.santoso@email.com
    if (form.email.trim().toLowerCase() === 'duplikat@email.com') {
      setDuplicateNotice(true);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmitted({
        code: 'APP-2026-X9A7',
        name: form.name.trim(),
        email: form.email.trim(),
        jobTitle: job.title,
      });
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-28">
      <PortalHeader title={job.title} subtitle={`${job.department} · ${job.location}`} onBack={onBack} />

      <main className="max-w-md w-full mx-auto px-4 py-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          <StatusChip variant="neutral">{job.type}</StatusChip>
          <StatusChip variant="yellow">{job.quota} posisi</StatusChip>
          <StatusChip variant="warning">Tutup {job.close_date}</StatusChip>
        </div>

        {/* Job description */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
          <div>
            <h3 className="font-display font-semibold text-base text-[#172033] mb-2">Tanggung jawab</h3>
            <ul className="space-y-2">
              {(job.responsibilities || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-base text-[#172033] mb-2">Kualifikasi minimum</h3>
            <ul className="space-y-2">
              {(job.qualifications || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <form id="apply-form" onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
          <div>
            <h3 className="font-display font-semibold text-lg text-[#172033]">Lengkapi data dirimu</h3>
            <p className="text-xs text-slate-500">Tanda * wajib diisi. Gunakan email `duplikat@email.com` untuk simulasi deteksi ganda (BR-04).</p>
          </div>

          {duplicateNotice && (
            <div className="bg-[#DBEAFE] border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5 text-sm text-[#1D4ED8]">
              <Info className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold">Kamu sudah melamar posisi ini</p>
                <p className="text-xs mt-0.5 text-blue-900">
                  Email ini sudah terdaftar pada lamaran aktif. Pantau status lamaranmu tanpa membuat pengajuan ganda.
                </p>
                <button
                  type="button"
                  onClick={() => onGoTrack('APP-2026-X9A7')}
                  className="mt-2 text-xs font-bold underline"
                >
                  Lihat status lamaran →
                </button>
              </div>
            </div>
          )}

          {/* Fields */}
          <div>
            <label className="block text-sm font-semibold text-[#172033] mb-1">Nama lengkap *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Budi Santoso"
              className={`w-full h-11 px-3 rounded-lg border text-sm ${
                errors.name ? 'border-[#B91C1C] bg-red-50/40' : 'border-slate-300'
              }`}
            />
            {errors.name && <p className="text-xs text-[#B91C1C] mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#172033] mb-1">Email aktif *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="budi.santoso@email.com"
              className={`w-full h-11 px-3 rounded-lg border text-sm ${
                errors.email ? 'border-[#B91C1C] bg-red-50/40' : 'border-slate-300'
              }`}
            />
            <p className="text-xs text-slate-500 mt-1">Notifikasi dan undangan wawancara dikirim ke email ini.</p>
            {errors.email && <p className="text-xs text-[#B91C1C] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#172033] mb-1">Nomor WhatsApp *</label>
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="081234567890"
              className={`w-full h-11 px-3 rounded-lg border text-sm ${
                errors.phone ? 'border-[#B91C1C] bg-red-50/40' : 'border-slate-300'
              }`}
            />
            {errors.phone && <p className="text-xs text-[#B91C1C] mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[#172033] mb-1">Kota domisili *</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Jakarta Timur"
                className={`w-full h-11 px-3 rounded-lg border text-sm ${
                  errors.city ? 'border-[#B91C1C]' : 'border-slate-300'
                }`}
              />
              {errors.city && <p className="text-xs text-[#B91C1C] mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#172033] mb-1">Pengalaman (thn) *</label>
              <input
                type="text"
                inputMode="decimal"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="2.5"
                className={`w-full h-11 px-3 rounded-lg border text-sm ${
                  errors.experience ? 'border-[#B91C1C]' : 'border-slate-300'
                }`}
              />
              {errors.experience && <p className="text-xs text-[#B91C1C] mt-1">{errors.experience}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#172033] mb-1">Pendidikan terakhir *</label>
            <select
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm bg-white"
            >
              <option>SMK / SMA</option>
              <option>D3</option>
              <option>S1 / D4</option>
              <option>S2</option>
            </select>
          </div>

          {/* Dynamic screening questions */}
          {(job.screening_questions || []).map((q) => (
            <div key={q.id} className="space-y-2 pt-1">
              <label className="block text-sm font-semibold text-[#172033]">
                {q.question_text} {q.is_required ? '*' : ''}
              </label>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const selected = form.answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, answers: { ...form.answers, [q.id]: opt } })
                      }
                      className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition ${
                        selected
                          ? 'bg-[#FFFBE6] border-[#FFCC00] border-2 text-[#172033]'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {errors[`q_${q.id}`] && (
                <p className="text-xs text-[#B91C1C]">{errors[`q_${q.id}`]}</p>
              )}
            </div>
          ))}

          {/* Upload PDF */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#172033]">Unggah CV (PDF, maks. 5 MB) *</label>
            {!cvFile ? (
              <label className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-[#172033] transition text-center">
                <Upload className="w-6 h-6 text-[#172033] mb-1.5" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-[#172033]">Ketuk untuk memilih berkas PDF</span>
                <span className="text-xs text-slate-500 mt-0.5">Hanya PDF agar mudah dibaca sistem</span>
                <input type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="hidden" />
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#DCFCE7] border border-green-200">
                <FileText className="w-5 h-5 text-[#15803D] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#172033] truncate">{cvFile.name}</p>
                  <p className="text-xs text-[#15803D]">
                    {(cvFile.size / (1024 * 1024)).toFixed(2)} MB · siap dikirim
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="p-1 text-slate-500 hover:text-[#172033]"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            )}
            {(cvError || errors.cv) && (
              <p className="text-xs text-[#B91C1C] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                {cvError || errors.cv}
              </p>
            )}
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 w-4 h-4 accent-[#172033] rounded"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              Saya menyetujui data saya diproses untuk keperluan seleksi rekrutmen ini.
            </span>
          </label>
          {errors.consent && <p className="text-xs text-[#B91C1C]">{errors.consent}</p>}
        </form>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] z-30">
        <div className="max-w-md mx-auto px-4 py-3">
          <button
            type="submit"
            form="apply-form"
            disabled={submitting}
            className="w-full h-12 rounded-xl bg-[#FFCC00] hover:bg-[#F2BE00] disabled:bg-slate-200 disabled:text-slate-500 text-[#172033] font-semibold text-sm transition"
          >
            {submitting ? 'Mengirim lamaran...' : 'Kirim lamaran sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
}
