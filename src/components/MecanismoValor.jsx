import { motion } from 'framer-motion'
import { ArrowRight, UserCheck, Wallet, Percent, BarChart3, TrendingUp } from 'lucide-react'

const steps = [
  { icon: UserCheck, label: 'Visitantes', desc: 'Llegan al ecosistema Xelvatika' },
  { icon: Wallet, label: 'Utilizan XLK', desc: 'Pagan servicios con el token' },
  { icon: Percent, label: 'Obtienen descuentos', desc: 'Hasta 15% de ahorro inmediato' },
  { icon: BarChart3, label: 'Aumenta adopción', desc: 'Más usuarios = mayor demanda' },
  { icon: TrendingDown, label: 'Disminuye oferta', desc: 'Circulante se reduce' },
  { icon: TrendingUp, label: 'Mayor valor potencial', desc: 'Escasez impulsa el ecosistema' },
]

function TrendingDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  )
}

export default function MecanismoValor() {
  return (
    <section id="mecanismo" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#060612] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mecanismo de <span className="text-gradient">Valor</span>
          </h2>
          <p className="text-gray-400 text-lg">Cómo XLK genera valor sostenible</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-blue via-neon-purple to-bright-cyan -translate-y-1/2" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-5 text-center h-full group hover:border-electric-blue/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{step.label}</h3>
                  <p className="text-gray-400 text-xs">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-electric-blue/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 glass rounded-2xl p-8 text-center"
        >
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            <strong className="text-white">Visitantes</strong> → Utilizan{' '}
            <strong className="text-electric-blue">XLK</strong> → Obtienen{' '}
            <strong className="text-bright-cyan">descuentos</strong> → Aumenta{' '}
            <strong className="text-white">adopción</strong> → Disminuye oferta{' '}
            <strong className="text-neon-purple">circulante</strong> → Mayor{' '}
            <strong className="text-gradient">escasez</strong> → Mayor{' '}
            <strong className="text-gradient">valor potencial</strong> del ecosistema.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
