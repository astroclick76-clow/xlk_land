import { motion } from 'framer-motion'
import { Infinity, TrendingDown } from 'lucide-react'

const TOKENOMICS = {
  totalSupply: '21,000,000',
  symbol: 'XLK',
  distribution: [
    { label: 'Venta', value: 30, color: 'bg-electric-blue' },
    { label: 'Reserva', value: 20, color: 'bg-neon-purple' },
    { label: 'Equipo (Vesting)', value: 15, color: 'bg-bright-cyan' },
    { label: 'Comunidad', value: 15, color: 'bg-blue-500' },
    { label: 'Fondo de Desarrollo', value: 20, color: 'bg-purple-500' },
  ],
}

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#060610] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Tokenomics</span>
          </h2>
          <p className="text-gray-400 text-lg">Distribución transparente y sostenible</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Distribución</h3>
            <div className="space-y-5">
              {TOKENOMICS.distribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{item.label}</span>
                    <span className="text-white font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-dark-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.color} relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Suministro Máximo</p>
              <p className="text-3xl md:text-4xl font-black text-gradient mb-2">
                {TOKENOMICS.totalSupply}
              </p>
              <p className="text-gray-500">{TOKENOMICS.symbol}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Infinity className="w-6 h-6 text-electric-blue" />
                <h4 className="text-white font-bold">Token Finito</h4>
              </div>
              <p className="text-gray-400 text-sm">Oferta máxima fija de 21 millones. No se crearán más tokens.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-6 h-6 text-bright-cyan" />
                <h4 className="text-white font-bold">Modelo Deflacionario</h4>
              </div>
              <p className="text-gray-400 text-sm">La oferta circulante disminuye conforme aumenta la actividad económica dentro del ecosistema.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
