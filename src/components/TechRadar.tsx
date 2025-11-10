import { ResponsiveRadar } from '@nivo/radar';
import { motion } from 'framer-motion';

const radarData = [
  { alan: 'Backend', Üretimde: 0.95, Merak: 0.85, Keşifte: 0.7 },
  { alan: 'Frontend', Üretimde: 0.82, Merak: 0.9, Keşifte: 0.75 },
  { alan: 'AI & Data', Üretimde: 0.75, Merak: 0.95, Keşifte: 0.88 },
  { alan: 'DevOps', Üretimde: 0.7, Merak: 0.65, Keşifte: 0.6 },
  { alan: 'Ürün', Üretimde: 0.8, Merak: 0.7, Keşifte: 0.78 },
];

const legend = [
  { label: 'Üretimde', color: '#14b8a6', desc: 'Aktif olarak kullandığım ve teslimata taşıdığım alanlar.' },
  { label: 'Merak', color: '#a855f7', desc: 'Sürekli okuma/deney yaptığım, R&D potansiyeli olan konular.' },
  { label: 'Keşifte', color: '#f97316', desc: 'Pilot projelerde denediğim yeni yaklaşımlar.' },
];

const TechRadar = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="glass-card p-8 lg:p-12"
  >
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <p className="text-primary-400 font-semibold mb-2 uppercase tracking-wider">Tech Radar</p>
          <h3 className="text-3xl font-bold text-dark-50">Beceri yoğunluk haritası</h3>
          <p className="text-dark-400 mt-2">
            Üretim ortamında aktif kullandığım teknolojiler ile kısa vadede deneyip olgunlaştırdığım alanları aynı grafikte
            görselleştiriyorum. Radar; yatırım önceliklerimi ve teknik çeşitliliği yansıtıyor.
          </p>
        </div>
        <ul className="space-y-4">
          {legend.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: item.color }} />
              <div>
                <p className="text-dark-50 font-semibold">{item.label}</p>
                <p className="text-dark-400 text-sm">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[320px] sm:h-[360px] lg:h-full">
        <ResponsiveRadar
          data={radarData}
          keys={['Üretimde', 'Merak', 'Keşifte']}
          indexBy="alan"
          maxValue={1}
          margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
          curve="catmullRomClosed"
          borderWidth={2}
          gridLabelOffset={20}
          dotSize={6}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          colors={['#14b8a6', '#a855f7', '#f97316']}
          blendMode="screen"
          motionConfig="gentle"
          theme={{
            text: { fill: '#cbd5e1', fontFamily: 'Inter, sans-serif' },
            grid: { line: { stroke: '#1e293b', strokeWidth: 1 } },
            dots: { text: { fill: '#0f172a' } },
            tooltip: {
              container: {
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '8px 12px',
              },
            },
          }}
          legends={[
            {
              anchor: 'top-left',
              direction: 'column',
              translateX: -30,
              translateY: -30,
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: 'circle',
              itemTextColor: '#cbd5e1',
            },
          ]}
        />
      </div>
    </div>
  </motion.div>
);

export default TechRadar;
