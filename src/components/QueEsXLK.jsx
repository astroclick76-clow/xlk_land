import { motion } from 'framer-motion'
import { Ticket, DollarSign, Star, Vote, Lock, ArrowLeftRight } from 'lucide-react'

const images = import.meta.glob('/public/assets/images/*.png', { eager: true, query: '?url' })
const imgKeys = Object.keys(images)
const tokenKey = imgKeys.find(k => k.includes('token'))
const tokenImg = tokenKey ? (images[tokenKey].default || images[tokenKey]) : ''

const usos = [
  { icon: Ticket, label: 'Descuentos exclusivos' },
  { icon: DollarSign, label: 'Cashback en servicios' },
  { icon: Star, label: 'Eventos VIP' },
  { icon: Vote, label: 'Gobernanza' },
  { icon: Lock, label: 'Staking' },
  { icon: ArrowLeftRight, label: 'Mercado P2P' },
]

export default function QueEsXLK() {
  return (
    <section id="que-es" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#080812] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              ¿Qué es <span className="text-gradient">XLK</span>?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              XLK es el <strong className="text-white">token utilitario oficial</strong> del ecosistema Xelvatika. Diseñado para integrar la tecnología blockchain con experiencias turísticas reales en Yucatán.
            </p>
            <div className="glass rounded-2xl p-6 mb-6 border border-electric-blue/20">
              <p className="text-electric-blue font-semibold text-lg flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Cada XLK equivale a <strong className="text-white mx-1">1 USD</strong> de crédito interno dentro del ecosistema.
              </p>
            </div>
            <p className="text-gray-400 mb-6">
              Con más de <strong className="text-white">1,000 visitantes diarios</strong> proyectados, XLK se posiciona como la moneda digital del turismo inteligente en México.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {usos.map((uso, i) => (
                <motion.div
                  key={uso.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0">
                    <uso.icon className="w-4 h-4 text-electric-blue" />
                  </div>
                  {uso.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {tokenImg && (
              <div className="relative group">
                <img
                  src={tokenImg}
                  alt="XLK Token"
                  className="w-full max-w-md mx-auto rounded-3xl object-cover transition-transform duration-700 group-hover:scale-[1.02] neon-glow-purple"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-deep-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-40 h-40 bg-gradient-to-br from-neon-purple/10 to-bright-cyan/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
