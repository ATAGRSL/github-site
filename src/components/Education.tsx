import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const education = [
    {
      period: 'Eki 2021 - Haz 2024',
      note: '100% İngilizce',
      school: 'Toros Üniversitesi',
      degree: 'Yazılım Mühendisliği (Lisans)',
      description: 'AI, veri madenciliği ve web uygulamaları ağırlıklı müfredat.',
    },
    {
      period: '2020 - 2021',
      school: 'Girne American University',
      degree: 'İngilizce Hazırlık',
      description: 'Akademik İngilizce ve teknik sunum becerileri.',
    },
    {
      period: 'Ağu 2016 - Ağu 2018',
      school: 'İzmir Ekonomi Üniversitesi',
      degree: 'Bilgisayar Programcılığı (Önlisans)',
      description: 'Programlama, veritabanı ve sunucu yönetimi tabanlı eğitim.',
    },
    {
      period: '2012 - 2016',
      school: 'Bornova Seyit Şanlı MTAL',
      degree: 'Bilişim Teknolojileri',
      description: 'Web tasarımı, dijital tasarım ve uygulama geliştirme odaklı lise programı.',
    },
  ];

  return (
    <section id="education" className="py-20 lg:py-32 bg-dark-900/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-semibold mb-4 uppercase tracking-wider">
            Eğitim
          </p>
          <h2 className="section-title mb-4">
            Teknik temeli güçlendiren yolculuk
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-flow absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-dark-800/80" />

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-8 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-6 -translate-x-1/2">
                    <div className="timeline-dot w-3 h-3 rounded-full bg-primary-500/70 ring-4 ring-dark-950" />
                  </div>

                  <div className="glass-card-hover p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary-500/10 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-dark-400 mb-1">
                          {edu.period}
                          {edu.note && <span className="ml-2 text-primary-400">· {edu.note}</span>}
                        </p>
                        <h3 className="text-lg font-bold text-dark-50 mb-1">{edu.school}</h3>
                        <p className="text-primary-400 font-semibold">{edu.degree}</p>
                      </div>
                    </div>
                    <p className="text-dark-400">{edu.description}</p>
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

export default Education;
