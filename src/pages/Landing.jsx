import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Laptop, Riffle, Relay, Terrain } from '@lucasmarkes/hairline/react';
import { ArrowRight, Search, Clock, ShieldCheck } from 'lucide-react';
import { LogoMark } from '../components/UI';
import { SakugaButton } from '../components/SakugaVFX';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    Figure: Riffle,
    step: '01',
    title: 'Lamar Tanpa Buat Akun',
    desc: 'Isi data singkat, jawab pertanyaan posisi, dan unggah CV PDF dalam kurang dari tiga menit.',
  },
  {
    Figure: Relay,
    step: '02',
    title: 'Lacak Progres Secara Mandiri',
    desc: 'Pantau setiap tahapan lamaran lewat kode referensi unik tanpa perlu menunggu balasan manual.',
  },
  {
    Figure: Terrain,
    step: '03',
    title: 'Konfirmasi Jadwal Satu Klik',
    desc: 'Pilih hadir atau ajukan jadwal alternatif secara langsung dari tautan undangan wawancara.',
  },
];

export default function Landing({ onExploreJobs, onTrackStatus }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portal-hero-in', {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
      });

      gsap.from('.portal-step-col', {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portal-steps-section',
          start: 'top 85%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#F8FAFC] text-[#172033]">
      {/* Compact Single-Row Top Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={36} />
            <div>
              <p className="font-display font-bold text-base leading-tight">PT Inovasi Digital Nusantara</p>
              <p className="text-[11px] text-slate-500">Portal Karir Resmi · RecruitFlow</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onTrackStatus}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-[#172033] transition-colors"
            >
              <Search className="w-3.5 h-3.5" strokeWidth={1.75} />
              Lacak Lamaran
            </button>
            <SakugaButton
              onClick={onExploreJobs}
              className="px-4 h-9 rounded-lg bg-[#FFCC00] hover:bg-[#F2BE00] text-[#172033] font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
            >
              Lihat Lowongan
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </SakugaButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-5 pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="portal-hero-in border-l-2 border-[#FFCC00] pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Rekrutmen Terbuka 2026 · Jakarta, Bandung, Surabaya &amp; Remote
            </p>

            <h1 className="portal-hero-in font-display font-extrabold text-4xl sm:text-5xl leading-[1.08] tracking-tight text-[#172033]">
              Mulai langkah karirmu dengan proses seleksi yang jelas.
            </h1>

            <p className="portal-hero-in text-base text-slate-600 leading-relaxed max-w-xl">
              Kirim lamaran langsung tanpa perlu membuat akun. Setiap berkas diperiksa secara objektif oleh tim rekrutmen kami, dan statusnya dapat kamu pantau kapan saja.
            </p>

            <div className="portal-hero-in flex flex-wrap items-center gap-3 pt-1">
              <SakugaButton
                onClick={onExploreJobs}
                className="px-6 h-11 rounded-lg bg-[#FFCC00] hover:bg-[#F2BE00] text-[#172033] font-bold text-sm inline-flex items-center gap-2 transition-colors"
              >
                Jelajahi Lowongan Aktif
                <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </SakugaButton>

              <button
                type="button"
                onClick={onTrackStatus}
                className="px-5 h-11 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[#172033] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
              >
                <Search className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
                Cek Status Lamaran
              </button>
            </div>

            <div className="portal-hero-in flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#172033]" strokeWidth={1.5} />
                Proses berkas 1–3 hari kerja
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" strokeWidth={1.5} />
                Data pribadi terlindungi
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4">
            <div className="hairline-theme-light rounded-lg bg-white overflow-hidden">
              <Laptop
                play
                intensity={0.75}
                theme="light"
                label="Portal lamaran mandiri kandidat"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Experience — Crisp Divided Strip */}
      <section className="portal-steps-section max-w-5xl mx-auto px-5 pb-20 space-y-6">
        <div className="border-t border-slate-200 pt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Alur Seleksi</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#172033] mt-1">
            Dari unggah CV hingga konfirmasi jadwal wawancara
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 bg-white border border-slate-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          {HIGHLIGHTS.map((item) => {
            const Figure = item.Figure;
            return (
              <div key={item.step} className="portal-step-col p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A16207]">Tahap {item.step}</span>
                </div>
                <div className="hairline-theme-light rounded-lg bg-slate-50/60 border border-slate-100 overflow-hidden">
                  <Figure play intensity={0.7} theme="light" label={item.title} className="w-full" />
                </div>
                <h3 className="font-display font-bold text-base text-[#172033]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
