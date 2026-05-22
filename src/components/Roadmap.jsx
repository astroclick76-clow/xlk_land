import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

const phases = [
  {
    phase: 'Fase 1',
    title: 'Venta Privada y Preventa',
    status: 'active',
    desc: 'Venta privada y preventa comunitaria. Evento exclusivo para early adopters con descuentos especiales Hot Sale.',
  },
  {
    phase: 'Fase 2',
    title: 'Wallet XLK y Staking',
    status: 'pending',
    desc: 'Wallet XLK, pasarela de pagos, descuentos activos, primer evento para holders, Staking V1 e integración de comercios aliados.',
  },
  {
    phase: 'Fase 3',
    title: 'Marketplace y Fidelización',
    status: 'pending',
    desc: 'Marketplace P2P, programa de fidelización, beneficios por holding, Proof of Social y alianzas externas.',
  },
  {
    phase: 'Fase 4',
    title: 'DAO y Expansión Global',
    status: 'pending',
    desc: 'DAO, fondo de sostenibilidad, integración con plataformas de turismo y expansión del ecosistema global.',
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#07070f] to-deep-black pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Hoja de <span className="text-gradient">Ruta</span>
          </h2>
          <p className="text-gray-400 text-lg">Nuestro camino hacia la innovación descentralizada</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-neon-purple to-electric-blue/20 -translate-x-1/2" />

          {phases.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="hidden md:flex flex-1 justify-end">
                {i % 2 === 0 && (
                  <div className="glass-card rounded-2xl p-6 max-w-md w-full">
                    <div className="flex items-center gap-2 mb-2">
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-bright-cyan" />
                      ) : item.status === 'active' ? (
                        <div className="w-5 h-5 rounded-full bg-electric-blue animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600" />
                      )}
                      <span className="text-xs font-mono text-electric-blue">{item.phase}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                )}
              </div>

              <div className="relative z-10 flex-shrink-0">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  item.status === 'completed'
                    ? 'border-bright-cyan bg-bright-cyan/10'
                    : item.status === 'active'
                    ? 'border-electric-blue bg-electric-blue/10 animate-pulse'
                    : 'border-gray-600 bg-dark-card'
                }`}>
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-bright-cyan" />
                  ) : item.status === 'active' ? (
                    <div className="w-3 h-3 rounded-full bg-electric-blue" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>

              <div className="flex-1 md:hidden">
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-electric-blue">{item.phase}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>

              <div className="hidden md:flex flex-1">
                {i % 2 !== 0 && (
                  <div className="glass-card rounded-2xl p-6 max-w-md w-full ml-auto">
                    <div className="flex items-center gap-2 mb-2">
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-bright-cyan" />
                      ) : item.status === 'active' ? (
                        <div className="w-5 h-5 rounded-full bg-electric-blue animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600" />
                      )}
                      <span className="text-xs font-mono text-electric-blue">{item.phase}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
