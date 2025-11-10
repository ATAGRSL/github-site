import { motion } from 'framer-motion';
import { Target, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const principles = [
    {
      icon: Target,
      label: 'Motivasyon',
      title: 'Bir problemi zarif bir ürüne dönüştürmek',
      description: 'Karmaşıklığı sadeleştirmek ana motivasyonum; fikirden çalışan ürüne giden her aşamada kavramsal çerçeveyi güçlü teknik uygulamayla birleştiriyorum.',
      quote: 'Fikirden çalışan ürüne giden yolculuk en büyük motivasyonum.',
    },
    {
      icon: Lightbulb,
      label: 'Yaklaşım',
      title: 'Temiz kod, verimli çözümler',
      description: 'E-commerce ve fintech projelerinde deneyim kazandım. REST API\'leri, ilişkisel veritabanları (MySQL/PostgreSQL) ve Magento, PHP, Java Spring Boot kullanarak web uygulamaları geliştiriyorum.',
      points: [
        'Git, Jira, Docker ile çalışma yetkinliği',
        'Temiz, verimli kod yazma',
        'Sürekli öğrenme ve yeni teknolojilere adaptasyon',
      ],
    },
    {
      icon: Users,
      label: 'Bağlantı',
      title: 'Aktif topluluk & iş birliği arayışı',
      description: 'Sürekli öğrenmenin mümkün olduğu inovatif ortamlarda üretmeyi seviyorum; beraber güçlü ürünler inşa etmek için her zaman iletişime açığım.',
      quote: 'Etkili teknoloji üretimine heyecan duyuyorsan konuşalım.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-semibold mb-4 uppercase tracking-wider">
            Manifesto
          </p>
          <h2 className="section-title mb-4">
            Etki odaklı mühendislik bakış açım
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card-hover p-8 space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-500/10 rounded-xl">
                  <principle.icon className="w-6 h-6 text-primary-400" />
                </div>
                <span className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                  {principle.label}
                </span>
              </div>

              <h3 className="text-xl font-bold text-dark-50">
                {principle.title}
              </h3>

              <p className="text-dark-300 leading-relaxed">
                {principle.description}
              </p>

              {principle.points && (
                <ul className="space-y-2">
                  {principle.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-dark-400">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {principle.quote && (
                <p className="text-sm text-dark-500 italic border-l-2 border-primary-500/30 pl-4">
                  "{principle.quote}"
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
