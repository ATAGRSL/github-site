import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Certification = {
  title: string;
  image: string;
};

type CertificationCardProps = {
  cert: Certification;
  onSelect: () => void;
  className?: string;
};

const CertificationCard = ({ cert, onSelect, className }: CertificationCardProps) => (
  <div
    className={`glass-card-hover p-4 group cursor-pointer h-full lift-hover ${className ?? ''}`}
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(event) => event.key === 'Enter' && onSelect()}
  >
    <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
        <Award className="w-8 h-8 text-primary-400" />
      </div>
    </div>
    <h3 className="text-sm font-semibold text-dark-200 text-center leading-snug line-clamp-2">
      {cert.title}
    </h3>
  </div>
);

const Certifications = () => {
  const certifications: Certification[] = [
    {
      title: 'Google Cybersecurity Professional Certificate',
      image: '/assets/certifications/1710071416616.jpeg',
    },
    {
      title: 'IBM IT Support Professional Certificate',
      image: '/assets/certifications/1710092653880.jpeg',
    },
    {
      title: 'AWS Cloud Solutions Architect Professional Certificate',
      image: '/assets/certifications/1710095015552.jpeg',
    },
    {
      title: 'Microsoft Azure Developer Associate (AZ-204) Professional Certificate',
      image: '/assets/certifications/1710148043087.jpeg',
    },
    {
      title: 'Machine Learning Specialization',
      image: '/assets/certifications/1710166398880.jpeg',
    },
    {
      title: 'Cybersecurity Operations Fundamentals Specialization',
      image: '/assets/certifications/1710239352560.jpeg',
    },
    {
      title: 'Google Data Analytics Specialization',
      image: '/assets/certifications/1710254236357.jpeg',
    },
  ];

  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(certifications.length / itemsPerPage);

  const closeModal = () => setActiveCert(null);
  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  const goToPage = (index: number) => setCurrentPage(index);

  const visibleCertifications = certifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="certifications" className="py-20 lg:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-semibold mb-4 uppercase tracking-wider">
            Sertifikalar
          </p>
          <h2 className="section-title mb-4">
            Sürekli öğrenmenin kanıtları
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-dark-500 mb-2">LinkedIn doğrulandı</p>
            <h3 className="text-2xl font-bold text-dark-50">146+ Sertifika</h3>
            <p className="text-dark-200 mt-2 max-w-2xl">
              Cloud, AI, güvenlik ve ürün geliştirme alanlarındaki sertifikaların tamamı LinkedIn
              profilimde doğrulanmış durumda. Aşağıda en çok referans verilen seçkiyi paylaşıyorum.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/atagursel/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            Tüm Sertifikaları Gör
          </a>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile slider */}
          <div className="md:hidden -mx-4 sm:mx-0">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar px-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={`${cert.title}-mobile`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="snap-center flex-shrink-0 w-full"
                >
                  <CertificationCard cert={cert} onSelect={() => setActiveCert(cert)} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop grid slider */}
          <div className="hidden md:block">
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {visibleCertifications.map((cert, index) => (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CertificationCard cert={cert} onSelect={() => setActiveCert(cert)} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevPage}
                  className="p-3 rounded-full bg-dark-800/90 border border-dark-700 hover:bg-dark-700/90 hover:border-primary-500/50 transition-all duration-300"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="w-5 h-5 text-dark-100" />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentPage ? 'w-8 bg-primary-500' : 'w-2 bg-dark-700 hover:bg-dark-600'
                      }`}
                      aria-label={`Sayfa ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="relative max-w-4xl w-full glass-card p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-dark-900/80 border border-dark-700 hover:border-primary-400 transition-colors"
                onClick={closeModal}
                aria-label="Önizlemeyi kapat"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video overflow-hidden rounded-2xl border border-dark-800">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-full object-contain bg-dark-950"
                />
              </div>
              <p className="text-lg font-semibold text-dark-50 mt-4">{activeCert.title}</p>
              <p className="text-sm text-dark-400">Yakınlaştırılmış sertifika görüntüsü</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
