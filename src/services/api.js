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
    stage: 'INVITED', // RECEIVED | REVIEWING | INVITED | SCHEDULED | COMPLETED | REJECTED | EXPIRED
    updated_at: '14 Nov 2026, 10.30 WIB',
    interview: {
      status: 'PENDING', // PENDING | CONFIRMED | DECLINED | EXPIRED
      date: 'Senin, 24 Nov 2026',
      time: '10.00 WIB (30 menit)',
      location: 'Kantor Pusat, Jl. Merdeka No. 12, Jakarta Pusat',
      documents: 'KTP asli dan salinan CV tercetak',
      contact: 'Rina (HR) · 0812-0000-0000',
      remaining_seconds: 21 * 3600 + 14 * 60,
    },
  },
  'APP-2026-R4T9': {
    code: 'APP-2026-R4T9',
    token: 'tok_r4t9',
    applicant_name: 'Dimas Pratama',
    job_title: 'Crew Operasional',
    location: 'Bekasi',
    applied_at: '13 Nov 2026, 11.20 WIB',
    // PERLU_DITINJAU ditampilkan netral sebagai "Sedang ditinjau" kepada kandidat
    stage: 'REVIEWING',
    updated_at: '14 Nov 2026, 08.15 WIB',
  },
  'APP-2026-Q5Z1': {
    code: 'APP-2026-Q5Z1',
    token: 'tok_q5z1',
    applicant_name: 'Dewi Lestari',
    job_title: 'Crew Operasional',
    location: 'Surabaya',
    applied_at: '10 Nov 2026, 16.05 WIB',
    stage: 'REJECTED',
    updated_at: '13 Nov 2026, 15.00 WIB',
  },
  'APP-2026-EXP0': {
    code: 'APP-2026-EXP0',
    token: 'tok_exp0',
    applicant_name: 'Rendra Putra',
    job_title: 'Warehouse Staff',
    location: 'Surabaya',
    applied_at: '01 Sep 2026, 10.00 WIB',
    stage: 'EXPIRED',
    updated_at: '01 Nov 2026, 00.00 WIB',
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
  {
    id: 'inv_3',
    code: 'APP-2026-EXP0',
    applicant_name: 'Budi Santoso',
    job_title: 'Warehouse Staff',
    department: 'Logistik & Gudang',
    interview: {
      status: 'EXPIRED',
      date: 'Senin, 10 Nov 2026',
      time: '09.00 WIB (30 menit)',
      location: 'Gudang Distribusi Rungkut, Surabaya',
      documents: 'KTP asli dan salinan CV',
      contact: 'Agus (HR) · 0813-3333-4444',
      remaining_seconds: 0,
    },
  },
];

export const INITIAL_SLOTS = [
  { id: 'slot_1', date: 'Selasa, 25 Nov 2026', time: '09.00 WIB', available: true, conflictSim: false },
  { id: 'slot_2', date: 'Selasa, 25 Nov 2026', time: '13.30 WIB', available: true, conflictSim: true },
  { id: 'slot_3', date: 'Rabu, 26 Nov 2026', time: '10.00 WIB', available: true, conflictSim: false },
  { id: 'slot_4', date: 'Rabu, 26 Nov 2026', time: '15.00 WIB', available: false, conflictSim: false },
  { id: 'slot_5', date: 'Kamis, 27 Nov 2026', time: '09.30 WIB', available: true, conflictSim: false },
];

export async function fetchJobs(simulateMode = 'normal') {
  if (simulateMode === 'error') {
    throw new Error('Koneksi ke server terputus (503). Silakan coba beberapa saat lagi.');
  }
  if (simulateMode === 'empty') {
    return { jobs: [], isDemo: true };
  }
  try {
    const res = await fetch(`${API_BASE}/public/jobs`, { signal: AbortSignal.timeout(1800) });
    if (!res.ok) throw new Error('Server error');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return {
        jobs: data.map((j) => ({
          ...MOCK_JOBS[0],
          ...j,
          type: j.type || 'Full-time',
          close_date: j.close_date || '30 Nov 2026',
        })),
        isDemo: false,
      };
    }
  } catch {
    // Fallback graceful ke data simulasi lokal bila backend belum dinyalakan
  }
  return { jobs: MOCK_JOBS, isDemo: true };
}
