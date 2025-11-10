import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative py-16 bg-dark-900/50 border-t border-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Main Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold gradient-text">Bana Ulaş</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Yeni projeler, iş birlikleri veya sadece merhaba demek için iletişime geçmekten çekinmeyin.
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="tel:+905352188144"
              className="glass-card-hover px-6 py-3 flex items-center gap-2 text-dark-100 hover:text-primary-400"
            >
              <span className="font-medium">+90 535-218-81-44</span>
            </a>
            <a
              href="mailto:atagursel@yahoo.com"
              className="glass-card-hover px-6 py-3 flex items-center gap-2 text-dark-100 hover:text-primary-400"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">atagursel@yahoo.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/atagursel/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-hover px-6 py-3 flex items-center gap-2 text-dark-100 hover:text-primary-400"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a
              href="https://github.com/ATAGRSL"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-hover px-6 py-3 flex items-center gap-2 text-dark-100 hover:text-primary-400"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-8 text-primary-400/70">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-dark-700 to-primary-500/30" />
            <span className="w-2 h-2 rounded-full bg-primary-500/70 shadow-[0_0_18px_rgba(20,184,166,0.5)]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-dark-700 to-primary-500/30" />
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-center gap-2 text-sm text-dark-500">
            <p className="flex items-center gap-2">
              © 2025 Ata Gürsel · Made with <Heart className="w-5 h-5 text-red-500 fill-current" />
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 glass-card-hover rounded-full shadow-lg shadow-primary-500/20 z-40 glow-hover"
        whileHover={{ y: -4 }}
        aria-label="Başa dön"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
