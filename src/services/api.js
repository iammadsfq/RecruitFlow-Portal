const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const MOCK_JOBS = [
  {
    id: 'job_crew_01',
    title: 'Crew Operasional',
    department: 'Operasional Gerai',
    location: 'Jakarta',
    type: 'Full-time',
    quota: 40,
    close_date: '30 Nov 2026',
    closing_soon: true,
    interview_location: 'Kantor Pusat, Jl. Merdeka No. 12, Jakarta Pusat',
    description:
      'Bertanggung jawab atas pelayanan pelanggan harian di gerai, operasional kasir POS, dan pencatatan stok barang.',
    responsibilities: [
      'Melayani pelanggan dengan ramah dan cepat di area gerai',
      'Menjaga kebersihan, kerapian, dan ketersediaan stok display',
      'Mengikuti prosedur kasir POS (tunai, QRIS, debit) dan stock opname harian',
    ],
    qualifications: [
      'Minimal lulusan SMA / SMK sederajat',
      'Bersedia bekerja sistem shift dan ditempatkan di area Jakarta',
      'Pengalaman di bidang retail / kasir menjadi nilai tambah',
    ],
    screening_questions: [
      {
        id: 'sq_1',
        question_text: 'Bersediakah kamu ditempatkan di area Jakarta & bekerja sistem shift?',
        question_type: 'YES_NO',
        options: ['Ya, bersedia', 'Tidak'],
        is_required: true,
      },
      {
        id: 'sq_2',
        question_text: 'Seberapa mahir kamu menggunakan mesin kasir POS atau aplikasi kasir digital?',
        question_type: 'SCALE',
        options: ['1 (Belum pernah)', '2 (Dasar)', '3 (Cukup mahir)', '4 (Mahir)', '5 (Sangat mahir)'],
        is_required: true,
      },
    ],
  },
  {
    id: 'job_cs_02',
    title: 'Customer Service',
    department: 'Layanan Pelanggan',
    location: 'Bandung',
    type: 'Kontrak',
    quota: 12,
    close_date: '12 Des 2026',
    closing_soon: false,
    interview_location: 'Kantor Cabang Bandung, Jl. Asia Afrika No. 88 (atau Google Meet)',
    description:
      'Menangani pertanyaan, keluhan, serta permintaan informasi pelanggan melalui WhatsApp, email, dan telepon secara empatik.',
    responsibilities: [
      'Merespons tiket pelanggan sesuai SLA maksimal 15 menit',
      'Mencatat eskalasi kendala teknis ke tim operasional di sistem CRM',
      'Menjaga skor kepuasan pelanggan (CSAT) di atas 90%',
    ],
    qualifications: [
      'Minimal lulusan D3 / S1 semua jurusan',
      'Komunikatif, sabar, dan terbiasa mengetik cepat',
      'Pengalaman minimal 1 tahun di layanan pelanggan / call center',
    ],
    screening_questions: [
      {
        id: 'sq_3',
        question_text: 'Bersediakah kamu bekerja dengan jadwal rotasi akhir pekan (libur di hari kerja)?',
        question_type: 'YES_NO',
        options: ['Ya, bersedia', 'Tidak'],
        is_required: true,
      },
    ],
  },
  {
    id: 'job_wh_03',
    title: 'Warehouse Staff',
    department: 'Logistik & Gudang',
    location: 'Surabaya',
    type: 'Full-time',
    quota: 25,
    close_date: '20 Des 2026',
    closing_soon: false,
    interview_location: 'Gudang Distribusi Rungkut, Surabaya',
    description:
      'Mengelola penerimaan barang masuk, pengepakan pesanan, dan akurasi inventaris gudang distribusi.',
    responsibilities: [
      'Melakukan bongkar muat dan pemeriksaan kualitas barang masuk',
      'Melakukan picking, packing, dan pelabelan resi pengiriman',
      'Menjaga kerapian rak gudang dan keselamatan kerja (K3)',
    ],
    qualifications: [
      'Minimal lulusan SMA / SMK',
      'Fisik prima dan teliti dalam penghitungan stok',
      'Memiliki sertifikat K3 / pengalaman gudang menjadi nilai tambah',
    ],
    screening_questions: [
      {
        id: 'sq_4',
        question_text: 'Apakah kamu memiliki pengalaman mengoperasikan scanner barcode / sistem gudang?',
        question_type: 'YES_NO',
        options: ['Ya, pernah', 'Belum pernah'],
        is_required: true,
      },
    ],
  },
  {
    id: 'job_jse_04',
    title: 'Junior Software Engineer',
    department: 'Teknologi Informasi',
    location: 'Remote',
    type: 'Full-time',
    quota: 5,
    close_date: '28 Des 2026',
    closing_soon: false,
    interview_location: 'Online via Google Meet (Tautan dikirim setelah konfirmasi)',
    description:
      'Mengembangkan aplikasi web internal dan integrasi REST API dengan Node.js, React, dan basis data relasional.',
    responsibilities: [
      'Membangun komponen antarmuka React yang responsif dan aksesibel',
      'Mengembangkan endpoint REST API yang aman dan terdokumentasi',
      'Berpartisipasi dalam code review dan pengujian otomatis',
    ],
    qualifications: [
      'Lulusan S1 Teknik Informatika / setara atau portofolio proyek nyata',
      'Menguasai JavaScript/TypeScript, React, dan Node.js',
      'Terbiasa menggunakan Git dalam tim',
    ],
    screening_questions: [
      {
        id: 'sq_5',
        question_text: 'Apakah kamu siap bekerja penuh waktu secara remote (WFA) dengan jam inti 09.00–17.00 WIB?',
        question_type: 'YES_NO',
        options: ['Ya, siap', 'Tidak'],
        is_required: true,
      },
    ],
  },
];

export const MOCK_APPLICATIONS = {
  'APP-2026-X9A7': {
    code: 'APP-2026-X9A7',
    token: 'tok_x9a7',
    applicant_name: 'Budi Santoso',
    job_title: 'Crew Operasional',
    location: 'Jakarta',
    applied_at: '12 Nov 2026, 09.14 WIB',
    stage: 'INVITED',
    updated_at: '14 Nov 2026, 10.30 WIB',
    interview: {
      status: 'PENDING',
      date: 'Senin, 24 Nov 2026',
      time: '10.00 WIB (30 menit)',
      location: 'Kantor Pusat, Jl. Merdeka No. 12, Jakarta Pusat',
      documents: 'KTP asli dan salinan CV tercetak',
      contact: 'Rina (HR) · 0812-0000-0000',
      remaining_seconds: 21 * 3600 + 14 * 60,
    },
  },
};

export const MOCK_INVITATIONS = [
  {
    id: 'inv_1',
    code: 'APP-2026-X9A7',
    applicant_name: 'Budi Santoso',
    job_title: 'Crew Operasional',
    department: 'Operasional Gerai',
    interview: {
      status: 'PENDING',
      date: 'Senin, 24 Nov 2026',
      time: '10.00 WIB (30 menit)',
      location: 'Kantor Pusat, Jl. Merdeka No. 12, Jakarta Pusat',
      documents: 'KTP asli dan salinan CV tercetak',
      contact: 'Rina (HR) · 0812-0000-0000',
      remaining_seconds: 21 * 3600 + 14 * 60,
    },
  },
  {
    id: 'inv_2',
    code: 'APP-2026-L7V4',
    applicant_name: 'Budi Santoso',
    job_title: 'Customer Service',
    department: 'Layanan Pelanggan',
    interview: {
      status: 'CONFIRMED',
      date: 'Rabu, 26 Nov 2026',
      time: '13.30 WIB (30 menit)',
      location: 'Online via Google Meet',
      documents: 'KTP asli & koneksi internet stabil',
      contact: 'Dedi (HR) · 0812-1111-2222',
      remaining_seconds: 0,
    },
  },
];

export const INITIAL_SLOTS = [
  { id: 'slot_1', date: 'Selasa, 25 Nov 2026', time: '09.00 WIB', available: true },
  { id: 'slot_2', date: 'Selasa, 25 Nov 2026', time: '13.30 WIB', available: true },
  { id: 'slot_3', date: 'Rabu, 26 Nov 2026', time: '10.00 WIB', available: true },
  { id: 'slot_4', date: 'Kamis, 27 Nov 2026', time: '09.30 WIB', available: true },
];

export async function fetchJobs() {
  try {
    const res = await fetch(`${API_BASE}/public/jobs`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error('Server error');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return {
        jobs: data.map((j) => ({
          ...MOCK_JOBS[0],
          ...j,
          type: j.type || 'Full-time',
          close_date: j.close_date || '30 Des 2026',
        })),
        isLive: true,
      };
    }
  } catch {
    // Graceful fallback to local data when backend is offline
  }
  return { jobs: MOCK_JOBS, isLive: false };
}

export async function submitApplication(form, cvFile, job) {
  const fd = new FormData();
  fd.append('job_id', job.id);
  fd.append('name', form.name.trim());
  fd.append('email', form.email.trim());
  fd.append('phone', form.phone.trim());
  fd.append('city', form.city.trim());
  fd.append('education', form.education);
  fd.append('experience_years', form.experience.replace(',', '.'));
  fd.append('screening_answers', JSON.stringify(form.answers || {}));
  fd.append('cv_file', cvFile);

  try {
    const res = await fetch(`${API_BASE}/public/applications`, {
      method: 'POST',
      body: fd,
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    if (res.status === 409) {
      return { duplicate: true, message: data.message };
    }
    if (!res.ok) {
      throw new Error(data.message || 'Gagal mengirim lamaran');
    }
    return {
      duplicate: false,
      code: data.application_id,
      token: data.token_status,
      name: form.name.trim(),
      email: form.email.trim(),
      jobTitle: job.title,
      isLive: true,
    };
  } catch (err) {
    if (err?.name === 'TypeError' || err?.name === 'TimeoutError') {
      return {
        duplicate: false,
        code: `APP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        jobTitle: job.title,
        isLive: false,
      };
    }
    throw err;
  }
}

export async function trackApplication(codeOrToken) {
  const trimmed = (codeOrToken || '').trim();
  if (!trimmed) return null;
  try {
    const res = await fetch(`${API_BASE}/public/applications/${encodeURIComponent(trimmed)}`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      const stepToStage = { 1: 'RECEIVED', 2: 'REVIEWING', 3: 'INVITED', 4: 'SCHEDULED', 5: 'COMPLETED' };
      const stage =
        data.stage === 'DITOLAK_TERKIRIM' || data.stage === 'DISETUJUI_TOLAK'
          ? 'REJECTED'
          : stepToStage[data.status_info?.step] || 'REVIEWING';
      return {
        code: data.id || trimmed,
        applicant_name: data.candidate_name,
        job_title: data.job_title,
        location: data.location || data.department,
        applied_at: data.applied_at,
        stage,
        status_label: data.status_info?.label,
        status_desc: data.status_info?.desc,
        interview: data.interview
          ? {
              ...data.interview,
              date: data.interview.start_time ? new Date(data.interview.start_time).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) : 'Jadwal Terlampir',
              time: data.interview.start_time ? `${new Date(data.interview.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB` : '-',
            }
          : null,
        isLive: true,
      };
    }
  } catch {
    // Fallback to mock lookup
  }
  return MOCK_APPLICATIONS[trimmed.toUpperCase()] || null;
}

export async function fetchInterviewOffer(token) {
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/public/interviews/${encodeURIComponent(token)}`, {
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const d = await res.json();
    const holdMs = new Date(d.hold_until).getTime();
    return {
      code: d.id,
      applicant_name: d.candidate_name,
      job_title: d.job_title,
      interview: {
        token,
        status: d.status === 'TERKONFIRMASI' ? 'CONFIRMED' : d.status === 'TIDAK_MERESPONS' ? 'EXPIRED' : 'PENDING',
        date: d.start_time ? new Date(d.start_time).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) : '-',
        time: d.start_time ? `${new Date(d.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB` : '-',
        location: d.interview_location,
        documents: d.documents_required,
        contact: d.contact_person,
        remaining_seconds: Number.isFinite(holdMs) ? Math.max(0, Math.floor((holdMs - Date.now()) / 1000)) : 72000,
      },
      isLive: true,
    };
  } catch {
    return null;
  }
}

export async function fetchAvailableSlots() {
  try {
    const res = await fetch(`${API_BASE}/public/slots`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error('Failed');
    const rows = await res.json();
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map((s) => ({
        id: s.id,
        date: new Date(s.start_time).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
        time: `${new Date(s.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
        interviewer: s.interviewer_name,
        available: true,
      }));
    }
  } catch {
    // Fallback
  }
  return INITIAL_SLOTS;
}

export async function confirmInterviewApi(token) {
  if (!token) return { ok: true, isLive: false };
  try {
    const res = await fetch(`${API_BASE}/public/interviews/${encodeURIComponent(token)}/confirm`, {
      method: 'POST',
      signal: AbortSignal.timeout(3000),
    });
    return { ok: res.ok, isLive: true };
  } catch {
    return { ok: true, isLive: false };
  }
}

export async function declineInterviewApi(token, reason = '') {
  if (!token) return { ok: true, isLive: false };
  try {
    const res = await fetch(`${API_BASE}/public/interviews/${encodeURIComponent(token)}/decline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
      signal: AbortSignal.timeout(3000),
    });
    return { ok: res.ok, isLive: true };
  } catch {
    return { ok: true, isLive: false };
  }
}

export async function rescheduleInterviewApi(token, slotId) {
  if (!token) return { ok: true, conflict: false, isLive: false };
  try {
    const res = await fetch(`${API_BASE}/public/interviews/${encodeURIComponent(token)}/reschedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot_id: slotId }),
      signal: AbortSignal.timeout(3000),
    });
    if (res.status === 409) return { ok: false, conflict: true, isLive: true };
    return { ok: res.ok, conflict: false, isLive: true };
  } catch {
    return { ok: true, conflict: false, isLive: false };
  }
}
