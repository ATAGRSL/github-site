import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
  }, []);

  const navLinks = [
    { href: '#about', label: 'Manifesto' },
    { href: '#skills', label: 'Yetenekler' },
    { href: '#experience', label: 'Deneyim' },
    { href: '#education', label: 'Eğitim' },
    { href: '#certifications', label: 'Sertifikalar' },
    { href: '#projects', label: 'Projeler' },
    { href: '/veri-maskeleme', label: 'Veri Maskeleme' },
  ];

  const resolveHref = (href: string) => {
    if (href.startsWith('#')) {
      return isHome ? href : `/${href}`;
    }
    return href;
  };

  const navBackground = isScrolled
    ? 'bg-dark-950/85 backdrop-blur-xl border-b border-dark-800/50 shadow-lg shadow-primary-500/10'
    : 'bg-dark-950/60 backdrop-blur-md border-b border-dark-900/20';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-clip transition-all duration-300 ${navBackground}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            aria-label="Ana sayfaya dön"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AG
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={resolveHref(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative text-dark-300 font-medium transition-colors"
                whileHover={{ y: -2 }}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] bg-primary-400 w-full scale-x-0 origin-center transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href={resolveHref('#contact')} className="btn-primary">
              İletişim
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 glass-card"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-dark-900/95 backdrop-blur-xl border-t border-dark-800/50 overflow-x-clip"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="block text-dark-300 hover:text-primary-400 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resolveHref('#contact')}
              className="block btn-primary text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              İletişim
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
