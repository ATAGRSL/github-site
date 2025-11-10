const SHOWCASE = [
  'baggage-tracker-desk',
  'airline-checkin-system',
  'aciktim',
  'vibecraft',
  'marketpulse',
  'refactor-ai',
  'collaborative-markdown-editor',
  'ATAGPT',
  'PATTERN-RECOGNITION-FINAL',
  'Cryptography-and-Network-Security-FINAL',
  'Random-Forest-Image-Classification',
];

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  'baggage-tracker-desk': 'Havaalanı bagajlarını gerçek zamanlı izleyen masaüstü dashboard ve alarm sistemi.',
  'airline-checkin-system': 'Check-in ve koltuk atama süreçlerini otomatikleştiren REST tabanlı havayolu paneli.',
  'aciktim': 'Restoran menülerini keşfetmek ve sipariş oluşturmak için geliştirdiğim mobil uyumlu web uygulaması.',
  'vibecraft': 'Ruh haline göre öneriler sunan, müzik listelerini ML ile kişiselleştiren deneysel proje.',
  'marketpulse': 'Finansal enstrümanları canlı grafiklerle takip etmeye odaklanan veri görselleştirme uygulaması.',
  'refactor-ai': 'Kod kokularını analiz edip refactoring önerileri üreten AI destekli CLI aracı.',
  'collaborative-markdown-editor': 'Gerçek zamanlı iş birliği sağlayan WebSocket tabanlı Markdown editörü.',
  'atagpt': 'Kendi veri setlerimle ince ayarladığım sohbet asistanı deneyini barındıran repo.',
  'pattern-recognition-final': 'Makine öğrenmesi ile örüntü tanıma tekniklerini kıyasladığım lisans projesi.',
  'cryptography-and-network-security-final': 'Şifreleme protokollerini simüle edip saldırı senaryolarını analiz eden akademik çalışma.',
  'random-forest-image-classification': 'Random Forest modelleriyle görsel veri sınıflandırma denemelerini içeren notebook seti.',
};

const DEFAULT_FALLBACK_DESCRIPTION =
  'Proje detaylarını README’de paylaşıyorum; bağlantıdan inceleyebilirsin.';

const USERNAME = 'atagrsl';
const API_URL = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`;

export type Project = {
  title: string;
  description: string;
  url: string;
  language: string;
  updated: string;
  stars: number;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
};

async function fetchRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    return (await response.json()) as GitHubRepo[];
  } catch (error) {
    console.warn('Unable to reach GitHub API, falling back to static list.', error);
    return [];
  }
}

function formatLanguage(language: string | null | undefined): string {
  return language?.toLowerCase() ?? 'other';
}

function getFallbackDescription(slug: string): string {
  return FALLBACK_DESCRIPTIONS[slug.toLowerCase()] ?? DEFAULT_FALLBACK_DESCRIPTION;
}

function buildFallbackProject(slug: string, description: string): Project {
  return {
    title: slug,
    description,
    url: `https://github.com/${USERNAME}/${slug}`,
    language: 'other',
    updated: new Date().toISOString(),
    stars: 0,
  };
}

export async function fetchShowcaseProjects(): Promise<Project[]> {
  const repos = await fetchRepos();

  return SHOWCASE.map((slug) => {
    const normalizedSlug = slug.toLowerCase();
    const fallbackDescription = getFallbackDescription(normalizedSlug);
    const repo = repos.find((item) => item.name.toLowerCase() === normalizedSlug);
    if (!repo) return buildFallbackProject(slug, fallbackDescription);

    return {
      title: repo.name,
      description: repo.description ?? fallbackDescription,
      url: repo.html_url,
      language: formatLanguage(repo.language),
      updated: repo.pushed_at,
      stars: repo.stargazers_count,
    };
  });
}
