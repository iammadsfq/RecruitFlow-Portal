import React, { useEffect, useState } from 'react';
import { Search, Briefcase, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { PortalHeader, StatusChip, SkeletonCard, ErrorBanner } from '../components/UI';
import { fetchJobs } from '../services/api';

const CITIES = ['Semua', 'Jakarta', 'Bandung', 'Surabaya', 'Remote'];

export default function P1Jobs({ onSelectJob, onOpenTrack }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Semua');
  const [simState, setSimState] = useState('normal'); // normal | loading | empty | error

  const load = async (mode = simState) => {
    setLoading(true);
    setError(null);
    if (mode === 'loading') return;
    try {
      const res = await fetchJobs(mode);
      setJobs(res.jobs);
      setIsDemo(res.isDemo);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(simState);
  }, [simState]);

  const filtered = jobs.filter((j) => {
    const matchCity = city === 'Semua' || j.location.toLowerCase().includes(city.toLowerCase());
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q || j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q);
    return matchCity && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PortalHeader
        title="RecruitFlow Karir"
        subtitle="PT Inovasi Digital Nusantara"
        rightAction={
          <button
            type="button"
            onClick={onOpenTrack}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-[#172033] hover:bg-slate-50"
          >
            Lacak Status
          </button>
        }
      />

      {/* Hero + Filter */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-md mx-auto px-4 py-6 space-y-4">
          <StatusChip variant="yellow">PT Inovasi Digital Nusantara</StatusChip>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#172033] leading-tight">
              Temukan posisi yang cocok untukmu
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Kirim lamaran dalam beberapa menit. Tanpa akun, tanpa ribet.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari posisi, mis. Crew Operasional"
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-[#172033] focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => {
              const active = city === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`px-3.5 h-9 rounded-full text-xs font-semibold transition ${
                    active
                      ? 'bg-[#172033] text-white'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job list */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-5 pb-24 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">
            {loading ? 'Memuat lowongan...' : `${filtered.length} lowongan ditemukan`}
          </span>
          {isDemo && <StatusChip variant="neutral">Data simulasi</StatusChip>}
        </div>

        {/* Simulator bar for testing edge cases */}
        <div className="bg-slate-100 rounded-xl p-2 flex items-center justify-between gap-1 text-[11px]">
          <span className="text-slate-500 font-medium px-1.5">Simulasi state:</span>
          <div className="flex gap-1">
            {[
              ['normal', 'Normal'],
              ['loading', 'Skeleton'],
              ['empty', 'Kosong'],
              ['error', 'Error 503'],
            ].map(([k, lbl]) => (
              <button
                key={k}
                type="button"
                onClick={() => setSimState(k)}
                className={`px-2 py-1 rounded-md font-semibold ${
                  simState === k ? 'bg-[#172033] text-white' : 'bg-white text-slate-600'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {error && <ErrorBanner message={error} onRetry={() => setSimState('normal')} />}

        {loading && !error && (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" strokeWidth={1.5} />
            <div>
              <p className="font-display font-semibold text-base text-[#172033]">
                {jobs.length === 0 ? 'Belum ada lowongan dibuka' : 'Lowongan tidak ditemukan'}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {jobs.length === 0
                  ? 'Pantau terus halaman ini untuk kesempatan terbaru.'
                  : 'Coba ubah kata kunci pencarian atau pilih kota lain.'}
              </p>
            </div>
            {(search || city !== 'Semua' || simState === 'empty') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCity('Semua');
                  setSimState('normal');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#172033] hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                Hapus semua filter
              </button>
            )}
          </div>
        )}

        {!loading &&
          !error &&
          filtered.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => onSelectJob(job)}
              className="w-full text-left bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-[#172033] active:scale-[0.99] transition space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF7CC] flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-[#172033]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-base text-[#172033] truncate">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500">{job.department}</p>
                </div>
                {job.closing_soon && <StatusChip variant="warning">Segera ditutup</StatusChip>}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <StatusChip variant="neutral">{job.location}</StatusChip>
                <StatusChip variant="neutral">{job.type}</StatusChip>
                <StatusChip variant="yellow">{job.quota} posisi</StatusChip>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Tutup {job.close_date}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#172033]">
                  Lihat detail
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </span>
              </div>
            </button>
          ))}

        <p className="text-[11px] text-slate-400 text-center pt-2 pb-6">
          Seluruh lowongan dan pelamar pada tampilan ini dapat dijalankan dengan data simulasi.
        </p>
      </main>
    </div>
  );
}
