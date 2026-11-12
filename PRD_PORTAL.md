# Product Requirements Document (PRD): RecruitFlow-Portal
**Komponen: Mock Career Portal Pelamar (Candidate Touchpoint)**  
*Repositori: `iammadsfq/RecruitFlow-Portal`*

---

## 1. Peran & Visi Antarmuka Pelamar

`RecruitFlow-Portal` adalah antarmuka web publik yang menjadi titik sentuh tunggal bagi calon karyawan (*kandidat*) dalam ekosistem RecruitFlow. Portal ini dirancang dengan prinsip kesederhanaan, transparansi informasi, serta kenyamanan akses melalui perangkat seluler (*mobile-first*).

Portal ini melayani 3 fungsi vital:
1. **Penyampaian Informasi & Pengumpulan Berkas**: Memberikan gambaran kualifikasi pekerjaan, mengumpulkan data terstruktur pelamar, dan menampung unggahan dokumen CV (PDF).
2. **Pelacakan Status Mandiri (Self-Service Status Tracking)**: Mengurangi kecemasan pelamar melalui halaman pelacakan status berbasis token aman tanpa keharusan membuat akun atau mengingat kata sandi.
3. **Konfirmasi Wawancara Satu-Klik (Interactive Scheduling Confirmation)**: Memfasilitasi konfirmasi kehadiran atau permintaan penyesuaian jadwal (*reschedule*) secara instan dari tautan pesan yang dikirimkan robot.

---

## 2. Struktur Modul Repositori

```
RecruitFlow-Portal/
├── .gitignore                    # Isolasi node_modules, build cache, dan file .env
├── README.md                     # Panduan setup & deployment portal publik
├── PRD_PORTAL.md                 # Dokumen spesifikasi fungsional Portal (file ini)
├── public/                       # Aset publik statis (logo mock company, ilustrasi responsif)
└── src/
    ├── pages/                    # 5 Halaman Utama Pelamar (P1 - P5)
    │   ├── JobListPage.jsx       # P1: Eksplorasi Lowongan Kerja
    │   ├── JobDetailPage.jsx     # P2: Informasi Detail & Formulir Lamaran Lengkap
    │   ├── ApplicationSuccess.jsx# P3: Tanda Bukti Pengiriman Berkas
    │   ├── TrackStatusPage.jsx   # P4: Pelacakan Status Lamaran Mandiri
    │   └── InterviewConfirm.jsx  # P5: Portal Konfirmasi & Reschedule Jadwal
    ├── components/               # Komponen UI Reusable (Modal, Alert, FileUpload, Timeline)
    ├── services/                 # Klien integrasi REST API ke RecruitFlow-Platform
    │   └── api.js
    ├── assets/                   # Ikon grafis dan elemen visual pendukung
    └── styles/                   # Tema warna, tipografi, dan stylesheet terpadu
```

---

## 3. Spesifikasi Rinci 5 Halaman Pelamar (P1 - P5)

### P1 – Daftar Lowongan Pekerjaan (*Job Explorer*)
- **Komponen Tampilan**:
  - Banner pencarian lowongan kerja (berdasarkan kata kunci posisi dan kategori departemen).
  - Filter lokasi penempatan (Jakarta, Bandung, Surabaya, Luar Kota/Remote).
  - Kartu Lowongan (*Job Card*): Menampilkan Judul Pekerjaan, Departemen, Lokasi Penempatan, Tipe Pekerjaan (Full-time / Kontrak / Magang), serta batas tanggal akhir pendaftaran.
- **Kondisi Khusus (*States*)**:
  - *Loading State*: Skeleton loader yang bersih saat memuat data dari peladen backend.
  - *Empty State*: Pesan ramah *"Saat ini belum ada lowongan dibuka, pantau terus pembaruan kami!"* bila seluruh lowongan ditutup.

### P2 – Detail Posisi & Formulir Lamaran Digital
- **Konten Informasi**: Deskripsi komprehensif mengenai tanggung jawab utama pekerjaan, kualifikasi minimum yang dipersyaratkan, serta kompensasi dan fasilitas penunjang.
- **Formulir Isian Data Mandiri**:
  - `Nama Lengkap`* (Input teks wajib).
  - `Alamat Email Aktif`* (Format email valid, menjadi identitas utama notifikasi).
  - `Nomor Kontak / WhatsApp`* (Format nomor telepon Indonesia: diawali `08...` atau `+62...`).
  - `Kota Domisili Saat Ini`* (Input teks/pilihan kota).
  - `Pendidikan Terakhir`* (Pilihan: SMK / SMA, Diploma (D3), Sarjana (S1), Magister (S2)).
  - `Total Pengalaman Kerja Relevan`* (Angka dalam satuan tahun, contoh: `2.5`).
  - `Ketersediaan Penempatan Kerja`* (Pernyataan kesiapan bertugas di lokasi penempatan).
  - `Pertanyaan Screening Dinamis`: Formulir tambahan yang dikonfigurasi oleh HR pada lowongan tertentu (Pilihan ganda, skala nilai, atau pertanyaan Ya/Tidak).
  - `Unggah Berkas CV`* :
    - Format yang diizinkan: **PDF** (Sangat disarankan guna mempermudah OCR robot latar belakang).
    - Batas ukuran berkas maksimum: **5 MB**.
    - Pengecekan sisi klien (*client-side validation*): Menolak file selain PDF atau file yang melebihi kuota ukuran dengan pesan galat yang informatif.
  - `Persetujuan Pemrosesan Data`* : Centang persetujuan pemrosesan data fiktif seleksi rekrutmen.
- **Validasi Integritas (BR-04)**:
  - Peladen memvalidasi deteksi lamaran ganda untuk lowongan yang sama. Apabila duplikasi terdeteksi, portal menampilkan notifikasi bersahabat tanpa membatalkan lamaran yang sudah berjalan.
- **Aksi**: Tombol **Kirim Lamaran Sekarang** dengan animasi pengiriman data (*multipart form-data*).

### P3 – Konfirmasi Penerimaan Lamaran (*Submission Acknowledgment*)
- Menampilkan pesan apresiasi terima kasih atas pengiriman berkas lamaran.
- Menampilkan **Kode Referensi Lamaran** unik (contoh: `APP-2026-X9A7`).
- Estimasi tahapan seleksi (pemeriksaan berkas berkisar 1–3 hari kerja).
- Tombol akses langsung menuju **Halaman Pelacakan Status (P4)**.

### P4 – Pelacakan Status Lamaran Mandiri (*Candidate Self-Service Status*)
- **Akses Tanpa Akun**: Pelamar cukup mengakses tautan token unik atau memasukkan kode referensi lamaran.
- **Visualisasi Linimasa Tahapan (*Milestone Tracker*)**:
  - Menampilkan tahapan bahasa kandidat yang ramah:
    1. *Lamaran Diterima*: Berkas berhasil diunggah ke sistem.
    2. *Sedang Ditinjau Tim Rekrutmen*: Berkas sedang diverifikasi.
    3. *Undangan Wawancara Terbit*: Jadwal wawancara siap dikonfirmasi.
    4. *Wawancara Terjadwal*: Kehadiran telah terkonfirmasi secara resmi.
    5. *Proses Selesai*: Rekapitulasi akhir.
- **Pemberlakuan Prinsip Keadilan & Privasi**:
  - Halaman ini **TIDAK PERNAH** membocorkan skor angka robot, rincian kriteria knock-out internal, atau kelompok evaluasi (*Sesuai / Perlu Dicek*) kepada kandidat.

### P5 – Portal Interaktif Konfirmasi & Reschedule Wawancara
- **Mekanisme Masuk**: Diakses secara eksklusif melalui token kriptografis dari tautan pesan yang dikirimkan robot `RF_Messaging`.
- **Rincian Informasi Wawancara**:
  - Posisi yang dilamar & Perusahaan.
  - Hari, Tanggal, dan Waktu Wawancara (Waktu Indonesia Barat / WIB).
  - Lokasi Fisik / Tautan Ruang Pertemuan Daring (*Video Call Link*).
  - Dokumen yang wajib disiapkan / dibawa saat wawancara.
  - Kontak narahubung staf rekrutmen.
  - **Hitung Mundur Batas Waktu (*Countdown Timer*)**: Menampilkan sisa jam jendela respons sebelum slot dibebaskan secara otomatis (default: 24 jam).
- **Pilihan Aksi Utama Pelamar**:
  1. **Konfirmasi Hadir (Satu Klik)**:
     - Mengunci kehadiran secara definitif.
     - Mengubah status lamaran menjadi `TERKONFIRMASI`.
     - Menampilkan instruksi persiapan wawancara.
  2. **Menolak Undangan (Tidak Hadir)**:
     - Pelamar menyatakan berhalangan dan mengundurkan diri (dapat menyertakan alasan opsional).
     - Sistem langsung membebaskan slot kalender tersebut sehingga dapat dialokasikan untuk kandidat cadangan lainnya.
  3. **Meminta Jadwal Alternatif (*Reschedule*)**:
     - Menampilkan daftar opsi slot waktu lain yang masih tersedia.
     - Setelah kandidat memilih slot baru, sistem melepaskan slot lama dan mengunci slot pilihan yang baru.

---

## 4. Standar Responsivitas & Pengalaman Pengguna (UX)

- **Optimasi Layar Seluler (*Mobile-First*)**: Mengingat mayoritas pelamar membuka tautan undangan melalui smartphone (WhatsApp / Email), seluruh elemen formulir dan tombol konfirmasi dioptimalkan untuk navigasi sentuhan jari (*touch-friendly*).
- **Bahasa Indonesia Baku & Bersahabat**: Seluruh pesan validasi, formulir, dan konfirmasi menggunakan Bahasa Indonesia yang profesional dan komunikatif.
- **Aksesibilitas & Feedback Visual**:
  - Penggunaan label form eksplisit (*aria-label*).
  - Pesan galat spesifik (misal: *"Format nomor telepon belum sesuai, gunakan format 0812xxxxxx"*).
  - Dialog konfirmasi sebelum aksi penting dijalankan (misal: saat memilih opsi menolak wawancara).

---

## 5. Integrasi Layanan REST API (`RecruitFlow-Platform`)

```javascript
// Contoh Endpoint Konsumsi Client
const API_ENDPOINTS = {
  GET_JOBS: '/public/jobs',
  GET_JOB_DETAIL: (id) => `/public/jobs/${id}`,
  SUBMIT_APPLICATION: '/public/applications', // POST Multipart Form-Data
  CHECK_STATUS: (token) => `/public/applications/${token}`,
  GET_INTERVIEW_OFFER: (token) => `/public/interviews/${token}`,
  CONFIRM_INTERVIEW: (token) => `/public/interviews/${token}/confirm`,
  DECLINE_INTERVIEW: (token) => `/public/interviews/${token}/decline`,
  RESCHEDULE_INTERVIEW: (token) => `/public/interviews/${token}/reschedule`,
};
```
