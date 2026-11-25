import React, { useEffect, useState } from 'react';
import { Search, Briefcase, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { PortalHeader, StatusChip, SkeletonCard, ErrorBanner } from '../components/UI';
import { SakugaCard } from '../components/SakugaVFX';
import { fetchJobs } from '../services/api';

const CITIES = ['Semua', 'Jakarta', 'Bandung', 'Surabaya', 'Remote'];

export default function P1Jobs({ onSelectJob, onBackLanding }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Semua');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchJobs();
      setJobs(res.jobs);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
        title="Lowongan Karir"
        subtitle="PT Inovasi Digital Nusantara"
        onBack={onBackLanding}
      />

      {/* Filter Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 py-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#172033] leading-tight">
                Temukan posisi yang sesuai denganmu
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Kirim lamaran langsung tanpa perlu membuat akun.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari posisi atau departemen..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-[#172033] focus:bg-white transition"
              />
            </div>
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

      {/* Job Grid */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 py-6 pb-24 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">
            {loading ? 'Memuat daftar lowongan...' : `${filtered.length} posisi tersedia`}
          </span>
        </div>

        {error && <ErrorBanner message={error} onRetry={load} />}

        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white rounded-xl hairline-card p-10 text-center space-y-3">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" strokeWidth={1.5} />
            <div>
              <p className="font-display font-semibold text-base text-[#172033]">
                {jobs.length === 0 ? 'Saat ini belum ada lowongan dibuka' : 'Lowongan tidak ditemukan'}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {jobs.length === 0
                  ? 'Pantau terus halaman ini untuk kesempatan terbaru.'
                  : 'Coba ubah kata kunci pencarian atau pilih kota lain.'}
              </p>
            </div>
            {(search || city !== 'Semua') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCity('Semua');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-[#172033] hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                Hapus semua filter
              </button>
            )}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((job, idx) => (
              <SakugaCard
                key={job.id}
                delay={idx * 0.04}
                onClick={() => onSelectJob(job)}
                className="bg-white rounded-xl p-5 cursor-pointer space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
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
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Tutup {job.close_date}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#172033]">
                    Lamar posisi
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </SakugaCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
