import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Sparkles, Award, Shield } from 'lucide-react';
import GithubActivity from './GithubActivity';
import KineticText from './KineticText';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center md:text-left max-w-3xl mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-dark-300">
                Full Stack Developer · E-commerce &amp; Fintech
              </span>
            </motion.div>

            {/* Main heading - Kinetic Typography */}
            <KineticText
              text="Kompleks problemleri etkileyici dijital deneyimlere dönüştürüyorum"
              delay={0.3}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-dark-300 leading-relaxed text-balance mx-auto md:mx-0"
            >
              Magento tabanlı e-ticaret siteleri ve Java Spring Boot fintech servislerinde uçtan uca geliştirme
              yapıyorum; PHP, Java ve modern JavaScript ile hem arayüz hem de servis katmanlarını teslim ediyorum.
              REST API tasarımından MySQL/PostgreSQL yönetimine, Git · Jira · Docker destekli dağıtımlara kadar
              sürecin her adımını sahipleniyorum.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto md:mx-0"
            >
              {[
                { label: 'Odağım', value: 'Full-stack geliştirme' },
                { label: 'Yaklaşım', value: 'Temiz & verimli kod' },
                { label: 'Çalışma', value: 'Ekip iş birliği' },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="text-sm text-dark-400 mb-1">{stat.label}</div>
                  <div className="text-base font-semibold text-dark-100">{stat.value}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <a href="#projects" className="btn-primary ripple-effect">
                Projeleri Keşfet
              </a>
              <a href="mailto:atagursel@yahoo.com" className="btn-secondary ripple-effect">
                Bana Yaz
              </a>
              <a href="tel:+905352188144" className="btn-secondary ripple-effect">
                +90 535-218-81-44
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <a
                href="https://github.com/ATAGRSL"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card-hover bounce-hover"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/atagursel/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card-hover bounce-hover"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:atagursel@yahoo.com"
                className="p-3 glass-card-hover bounce-hover"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right content - Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-sm w-full mx-auto"
          >
            <motion.div
              className="absolute -inset-6 bg-gradient-to-r from-primary-500 to-primary-600 opacity-20 blur-3xl rounded-[32px]"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative glass-card p-3 overflow-hidden rounded-[32px] border border-primary-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5 pointer-events-none" />
              <img
                src="/assets/profile.png"
                alt="Ata Gürsel"
                className="rounded-2xl w-full h-auto object-cover"
              />
            </div>

            {/* Floating cards */}
            {/* Floating cards (desktop) */}
            <motion.a
              href="https://www.linkedin.com/in/atagursel/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden sm:block absolute right-0 md:-right-8 top-6 glass-card px-5 py-4 w-44 md:w-48 shadow-2xl hover:border-primary-400 focus:outline-none"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-dark-50">
                <Award className="w-5 h-5 text-primary-400" />
                <span>146+ Sertifika</span>
              </div>
              <p className="text-xs text-dark-400 mt-1">Detaylar LinkedIn sertifika sayfamda</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden sm:block absolute left-0 md:-left-8 bottom-16 glass-card px-5 py-4 w-44 md:w-48 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-dark-50">
                <Shield className="w-5 h-5 text-primary-400" />
                <span>Test & teslimat odağı</span>
              </div>
              <p className="text-xs text-dark-400 mt-1">Magento · Spring Boot · Docker · Jira · AI</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="hidden sm:flex absolute -bottom-4 right-0 md:right-6 glass-card px-5 py-3 flex items-center gap-2"
            >
              <MapPin className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-sm font-semibold text-dark-50">İstanbul</p>
                <p className="text-xs text-dark-400">Remote & Hibrit</p>
              </div>
            </motion.div>

            {/* Mobile info cards */}
            <div className="sm:hidden mt-6 space-y-4">
              <a
                href="https://www.linkedin.com/in/atagursel/details/certifications/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-5 py-4 flex items-start gap-3"
              >
                <Award className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-dark-50">146+ Sertifika</p>
                  <p className="text-xs text-dark-400 mt-1">LinkedIn sertifika sayfamda doğrulandı</p>
                </div>
              </a>
              <div className="glass-card px-5 py-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-dark-50">Test & teslimat odağı</p>
                  <p className="text-xs text-dark-400 mt-1">Magento · Spring Boot · Docker · Jira · AI</p>
                </div>
              </div>
              <div className="glass-card px-5 py-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-dark-50">İstanbul</p>
                  <p className="text-xs text-dark-400 mt-1">Remote & Hibrit</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          <GithubActivity />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-dark-700 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-primary-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
