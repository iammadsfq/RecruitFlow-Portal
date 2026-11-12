# RecruitFlow-Portal – Mock Candidate Career Portal
**Automation Hackathon 2026 (#HumanInTheLead)**  
*Repositori: `iammadsfq/RecruitFlow-Portal`*

Portal web publik ini berfungsi sebagai antarmuka pencarian lowongan kerja fiktif perusahaan, formulir pengiriman lamaran digital (termasuk unggah berkas CV), pelacakan tahapan seleksi mandiri, serta gerbang konfirmasi kehadiran wawancara bagi kandidat.

---

## 🛠️ Persyaratan Sistem & Instalasi

1. **Runtime**: Node.js v18+ (atau peramban modern).
2. **Paket UI**: Framework antarmuka modern (React / Vite / Vue / Next.js) dengan dukungan tampilan responsif seluler.

### Langkah Memulai Cepat (Quick Start):

```bash
# 1. Kloning repositori
git clone https://github.com/iammadsfq/RecruitFlow-Portal.git
cd RecruitFlow-Portal

# 2. Instalasi modul dependensi
npm install

# 3. Konfigurasi endpoint backend
cp .env.example .env

# 4. Jalankan server pengembangan
npm run dev
```
Buka peramban di `http://localhost:3000` (atau port yang ditentukan).

---

## ⚙️ Variabel Lingkungan (`.env.example`)

```env
# Alamat peladen backend RecruitFlow-Platform
VITE_API_BASE_URL="http://localhost:5000"

# Identitas mock perusahaan untuk demonstrasi
VITE_COMPANY_NAME="PT Inovasi Digital Nusantara"
VITE_PORTAL_TITLE="Karir RecruitFlow"
```

---

## 🧭 Alur Kerja Utama Kandidat (P1 - P5)

1. **P1 (Daftar Lowongan)**: Pelamar melihat daftar posisi yang sedang dibuka dan menyaring berdasarkan lokasi.
2. **P2 (Detail & Melamar)**: Pelamar mengisi data diri terstruktur, menjawab pertanyaan kualifikasi screening, dan mengunggah berkas PDF CV (maks. 5 MB).
3. **P3 (Konfirmasi)**: Pelamar memperoleh kode referensi pengiriman dan estimasi waktu proses.
4. **P4 (Status Mandiri)**: Pelamar memeriksa perkembangan berkas menggunakan kode/token tanpa perlu login akun.
5. **P5 (Konfirmasi Wawancara)**: Pelamar membuka tautan unik dari pesan email robot untuk menyatakan kehadiran (*HADIR*), menolak tawaran (*TIDAK HADIR*), atau mengajukan tanggal pengganti (*RESCHEDULE*).

---

## 📖 Dokumentasi Spesifikasi
Detail spesifikasi komponen, validasi masukan, dan tata letak responsif tersedia di **[PRD_PORTAL.md](./PRD_PORTAL.md)**.
