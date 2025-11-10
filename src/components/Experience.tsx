import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      period: 'Haz 2024 - Günümüz',
      location: 'İstanbul · Tam zamanlı',
      title: 'JR. SOFTWARE DEVELOPER',
      company: 'VENHANCER',
      description: 'E-commerce ve fintech projelerinde full-stack geliştirme; Magento tabanlı platformlar ve Java Spring Boot REST API\'leri üzerinde çalışıyorum.',
      highlights: [
        'Magento tabanlı e-commerce platformlarında front-end (HTML, CSS, JS) ve back-end (PHP) geliştirme yaptım.',
        'Magento modülleri oluşturdum ve özelleştirdim, performans ve kullanıcı deneyimini iyileştirdim.',
        'Java Spring Boot fintech projesinde REST API geliştirdim, PostgreSQL entegrasyonu ve JWT tabanlı kimlik doğrulama implementasyonu yaptım.',
        'Ödeme servisleri için entegrasyon ve test süreçlerini yöneterek sorunsuz tahsilat deneyimi sağladım.',
        'Git, Jira ve Docker kullanarak ekiplerle iş birliği yaptım; release süreçlerinde teknik destek sağladım.',
      ],
    },
    {
      period: 'Şub 2024 - Haz 2024',
      location: 'Staj',
      title: 'QA ENGINEER INTERN',
      company: 'VENHANCER',
      description: 'Web uygulamaları için test senaryoları tasarladım ve fonksiyonel/regresyon testleri gerçekleştirdim.',
      highlights: [
        'Web uygulamaları için test case\'leri tasarladım ve fonksiyonel/regresyon testleri yürüttüm.',
        'Jira\'da bug kaydı ve takibi yaptım, düzeltmelerin doğrulanması için developer\'larla yakın iş birliği yaptım.',
        'Test dokümantasyonunu iyileştirdim ve daha hızlı teslimat için QA süreçlerini optimize ettim.',
      ],
    },
    {
      period: 'Haz 2017 - Ağu 2017',
      location: 'İzmir · Staj',
      title: 'COMPUTER PROGRAMMER INTERN',
      company: 'INNOVILE',
      description: 'Yazılım ve donanım sorun giderme görevlerinde yardımcı oldum; otomasyon ve robotik projelerde çalıştım.',
      highlights: [
        'Yazılım ve donanım sorun giderme görevlerinde destek sağladım.',
        'Raspberry Pi ile küçük otomasyon ve robotik projelerde çalıştım.',
        'Gerçek çalışma ortamında IT destek ve problem çözme konusunda pratik deneyim kazandım.',
      ],
    },
    {
      period: 'Ağu 2015 - Haz 2016',
      location: 'İzmir · Staj',
      title: 'INFORMATION TECHNOLOGY INTERN',
      company: 'Gimas Girgin Makina',
      description: 'Üretim ortamlarının BT ihtiyaçlarını destekledim; ağ güvenliği ve CAD iş akışlarını iyileştirmeye odaklandım.',
      highlights: [
        'AutoCAD veri akışlarını bulut tabanlı arşive taşıyarak erişimi hızlandırdım.',
        'LAN altyapısında güvenlik politikalarını güncelledim.',
        'Destek süreçlerini dokümante ederek sürdürülebilirlik sağladım.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 lg:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-semibold mb-4 uppercase tracking-wider">
            Deneyim
          </p>
          <h2 className="section-title mb-4">
            Önce ürün & kullanıcı değeri, sonra kod satırı
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-flow absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-dark-800/80" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-6 -translate-x-1/2">
                    <div className="timeline-dot w-4 h-4 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50 ring-4 ring-dark-950" />
                  </div>

                  <div className="glass-card-hover p-6 lg:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-dark-400 mb-2">{exp.period} · {exp.location}</p>
                        <h3 className="text-xl font-bold text-dark-50 mb-1">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-primary-400 font-semibold">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-dark-300 mb-4">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-dark-400">
                          <span className="text-primary-500 mt-1">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
