import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Cpu,
  Download,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Zap,
  Heart,
  TestTube,
  Scale,
  Handshake,
  GraduationCap,
  FolderOpen,
  SlidersHorizontal,
  Wand2,
} from 'lucide-react';
import agDmgMeta from '../data/ag-dmg.json';

const features = [
  {
    title: 'SwiftUI Native',
    description: '620 KB ultra hafif, gerçek native performans. Electron değil, pure Swift.',
    icon: Zap,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    title: 'Offline-First',
    description: 'App Sandbox, CryptoKit şifreleme. Hiçbir veri dışarı gönderilmez.',
    icon: Lock,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
  },
  {
    title: '4 Strateji',
    description: 'Kısmi, hash, random, redact. Akıllı pattern detection.',
    icon: Sparkles,
    gradient: 'from-green-500 via-emerald-500 to-cyan-500',
  },
];

const stats = [
  { label: 'Boyut', value: '620 KB', gradient: 'from-blue-400 to-cyan-400' },
  { label: 'İndirme', value: '1K+', gradient: 'from-purple-400 to-pink-400' },
  { label: 'Rating', value: '5.0⭐', gradient: 'from-yellow-400 to-orange-400' },
  { label: 'macOS', value: '13.0+', gradient: 'from-green-400 to-emerald-400' },
];

const steps = [
  { 
    number: '01',
    title: 'Dosya Yükle', 
    description: 'Sürükle-bırak veya dosya seç. CSV/JSON. Demo veri hazır.',
    icon: FolderOpen,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    number: '02',
    title: 'Kolon & Strateji', 
    description: 'Otomatik tespit. 4 strateji. Canlı önizleme.',
    icon: SlidersHorizontal,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  { 
    number: '03',
    title: 'Maskele & Kaydet', 
    description: 'Tek tık. İstatistikler. CSV/JSON export.',
    icon: Wand2,
    color: 'from-green-500/20 to-emerald-500/20'
  },
];

const useCases = [
  { title: 'Test Ortamları', description: 'Production → Test güvenle', icon: TestTube, accent: 'from-primary-500/20 to-cyan-500/10' },
  { title: 'KVKK Uyumu', description: 'Yasal gereksinimleri karşıla', icon: Scale, accent: 'from-purple-500/20 to-pink-500/10' },
  { title: 'Veri Paylaşımı', description: '3. parti ile güvenli paylaş', icon: Handshake, accent: 'from-emerald-500/20 to-teal-500/10' },
  { title: 'Demo & Eğitim', description: 'Güvenli demo verisi', icon: GraduationCap, accent: 'from-orange-500/20 to-amber-500/10' },
];

const dmgUrl = import.meta.env.PUBLIC_AG_DMG_URL?.trim() || agDmgMeta.defaultPath;

const DataMaskingApp = () => {
  const guiSha = agDmgMeta.sha256;
  const [shaCopied, setShaCopied] = useState(false);

  const copySha = async () => {
    try {
      await navigator.clipboard.writeText(guiSha);
      setShaCopied(true);
      setTimeout(() => setShaCopied(false), 1800);
    } catch {
      setShaCopied(false);
    }
  };

  return (
    <section id="masking-app" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-primary-300" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent">
              KVKK/GDPR Uyumlu Veri Maskeleme
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-primary-100 to-purple-100 bg-clip-text text-transparent">
              AG Veri Maskeleme
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-dark-300 mb-8 leading-relaxed">
            Native SwiftUI ile geliştirilmiş <span className="text-primary-300 font-semibold">620 KB</span> ultra hafif macOS uygulaması.
            <br className="hidden md:block" />
            Modern arayüz, hızlı performans, tam güvenlik.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 rounded-2xl border border-dark-700/50"
              >
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-dark-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Öne Çıkan Özellikler</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative glass-card p-6 rounded-2xl border border-dark-700/60 hover:border-primary-500/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-sm text-dark-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Download Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-3xl blur-xl opacity-20"></div>
              
              <div className="relative glass-card p-8 rounded-3xl border border-primary-500/30 space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Hemen İndir</h3>
                  <p className="text-sm text-dark-300">macOS 13.0+ · Apple Silicon</p>
                </div>

                {/* Download Button */}
                <a
                  href={dmgUrl}
                  download
                  className="group relative block w-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl text-white font-semibold text-lg hover:scale-[1.02] transition-transform">
                    <Download className="w-5 h-5" />
                    <span>v1.0.0 İndir</span>
                  </div>
                </a>

                {/* Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-dark-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>620 KB · Ultra hafif</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Native SwiftUI · Gerçek native</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Offline · Tam güvenlik</span>
                  </div>
                </div>

                {/* SHA-256 */}
                <div className="pt-4 border-t border-dark-700/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-dark-400 uppercase tracking-wider">SHA-256</span>
                    <button
                      type="button"
                      onClick={copySha}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors text-xs font-mono text-dark-200"
                    >
                      {shaCopied ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{guiSha.slice(0, 12)}...</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Kurulum */}
                <div className="pt-4 border-t border-dark-700/50">
                  <p className="text-xs text-dark-400 leading-relaxed">
                    <strong className="text-dark-200">Kurulum:</strong> DMG'yi aç → AGVeriMaskeleme.app → Applications'a sürükle → Hemen kullan
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">Nasıl Çalışır?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl`}></div>
                  <div className="relative glass-card p-6 rounded-2xl border border-dark-700/50 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-dark-900/60 border border-dark-700">
                        <IconComponent className="w-6 h-6 text-primary-200" />
                      </div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-dark-300 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-4">Kullanım Senaryoları</h3>
          <p className="text-center text-dark-300 mb-12 max-w-2xl mx-auto">
            AG Veri Maskeleme ile verilerinizi güvenle yönetin
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300 text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${useCase.accent} border border-dark-700/40 transform group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-primary-200" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{useCase.title}</h4>
                  <p className="text-sm text-dark-400">{useCase.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-primary-500/20 max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Verilerinizi Güvenle Maskeleyin
            </h3>
            <p className="text-dark-300 mb-8 max-w-xl mx-auto">
              620 KB ultra hafif, native SwiftUI uygulaması. Offline çalışır, hiçbir veri dışarı gönderilmez.
            </p>
            <a
              href={dmgUrl}
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary-500/25"
            >
              <Download className="w-5 h-5" />
              <span>Ücretsiz İndir</span>
            </a>
            <p className="text-xs text-dark-500 mt-4">macOS 13.0+ · Apple Silicon / Intel</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataMaskingApp;
