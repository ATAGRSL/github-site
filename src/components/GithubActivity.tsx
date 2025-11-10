import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

interface ContributionEntry {
  date: string;
  count: number;
}

interface ApiResponse {
  contributions: ContributionEntry[];
}

interface Summary {
  totalContributions: number;
  weeklyAverage: number;
  bestDay: ContributionEntry | null;
  range: { from: string; to: string };
  generatedAt: string;
}

const API_URL = 'https://github-contributions-api.jogruber.de/v4/atagrslvx';

const buildSummary = (entries: ContributionEntry[]): Summary => {
  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setDate(yearAgo.getDate() - 365);

  const windowed = entries
    .filter((entry) => {
      const date = new Date(entry.date);
      return date >= yearAgo && date <= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const total = windowed.reduce((sum, entry) => sum + entry.count, 0);
  const weeks = Math.max(1, Math.round(windowed.length / 7));
  const weeklyAverage = Number((total / weeks).toFixed(1));

  const bestDay = windowed.reduce<ContributionEntry | null>(
    (best, entry) => (entry.count > (best?.count ?? -1) ? entry : best),
    null
  );

  return {
    totalContributions: total,
    weeklyAverage,
    bestDay,
    range: {
      from: windowed[0]?.date ?? yearAgo.toISOString().split('T')[0],
      to: windowed.at(-1)?.date ?? now.toISOString().split('T')[0],
    },
    generatedAt: now.toISOString(),
  };
};

const GithubActivity = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Contribution API failed');
        return res.json();
      })
      .then((data: ApiResponse) => {
        const contributionEntries = data.contributions ?? [];
        setSummary(buildSummary(contributionEntries));
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      });
    return () => controller.abort();
  }, []);

  const bestDayLabel = useMemo(() => {
    if (!summary?.bestDay) return 'Veri yok';
    return `${new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(summary.bestDay.date))} · ${summary.bestDay.count} commit`;
  }, [summary?.bestDay]);

  const rangeLabel = useMemo(() => {
    if (!summary) return 'Son 12 ay';
    const from = new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(summary.range.from));
    const to = new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(summary.range.to));
    return `${from} - ${to}`;
  }, [summary]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-dark-400 uppercase tracking-[0.2em]">GitHub Aktivitesi</p>
          <h3 className="text-2xl font-bold text-dark-50 mt-1">Son 12 ay</h3>
        </div>
        <div className="p-3 rounded-2xl bg-dark-900/60 border border-dark-800">
          <Github className="w-6 h-6" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4">
          <p className="text-dark-400 text-sm mb-1">Katkı sayısı</p>
          <p className="text-3xl font-bold text-primary-400">
            {status === 'ready' ? summary?.totalContributions : '—'}
          </p>
          <p className="text-xs text-dark-500 mt-2">Toplam commit & PR</p>
        </div>
        <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4">
          <p className="text-dark-400 text-sm mb-1">Haftalık ortalama</p>
          <p className="text-3xl font-bold text-dark-50">
            {status === 'ready' ? summary?.weeklyAverage : '—'}
          </p>
          <p className="text-xs text-dark-500 mt-2">Üretim ritmi</p>
        </div>
        <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4">
          <p className="text-dark-400 text-sm mb-1">En verimli gün</p>
          <p className="text-lg font-semibold text-dark-50 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            {status === 'ready' ? bestDayLabel : '—'}
          </p>
          <p className="text-xs text-dark-500 mt-2">Yoğun katkı</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-dark-500">
        <span className="inline-flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {status === 'ready' ? rangeLabel : 'Veri yükleniyor'}
        </span>
        {summary && status === 'ready' && (
          <span>
            Son güncelleme: {new Date(summary.generatedAt).toLocaleDateString('tr-TR')}
          </span>
        )}
        {status === 'error' && (
          <span className="inline-flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            GitHub aktivitesi şu anda çekilemiyor.
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default GithubActivity;
