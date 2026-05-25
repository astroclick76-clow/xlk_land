import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Timer, ShieldCheck, Gift } from 'lucide-react'
import WalletButton from './WalletButton'

export default function Preventa() {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date()
    target.setDate(target.getDate() + 30)
    const interval = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        clearInterval(interval)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="preventa" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#080818] to-deep-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-green-500/10 border border-green-500/30 text-green-400 mb-4">
            Hot Sale - Oferta Especial
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Preventa <span className="text-gradient">XLK</span>
          </h2>
          <p className="text-gray-400 text-lg">Asegura tus tokens antes del lanzamiento oficial</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric-blue/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-electric-blue" />
                <span className="text-xs font-semibold uppercase tracking-wider text-electric-blue">Preventa Privada</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Exclusiva Comunidad</h3>
              <p className="text-gray-400 text-sm mb-6">Evento exclusivo para early adopters de la comunidad Xelvatika.</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-gradient">50%</span>
                <span className="text-gray-400 line-through text-lg">OFF</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-2 mb-2">
                <div className="w-3/4 h-full rounded-full bg-gradient-to-r from-electric-blue to-neon-purple" />
              </div>
              <p className="text-gray-500 text-xs">75% de la meta alcanzada</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-neon-purple" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neon-purple">Preventa Comunidad</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Comunidad Ampliada</h3>
              <p className="text-gray-400 text-sm mb-6">Disponible para la comunidad ampliada de Xelvatika.</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-gradient">15%</span>
                <span className="text-gray-400 line-through text-lg">OFF</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-2 mb-2">
                <div className="w-1/3 h-full rounded-full bg-gradient-to-r from-neon-purple to-electric-blue" />
              </div>
              <p className="text-gray-500 text-xs">33% de la meta alcanzada</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Timer className="w-5 h-5 text-electric-blue" />
              <h3 className="text-xl font-bold text-white">La preventa cierra en</h3>
            </div>
            <div className="flex justify-center gap-4 md:gap-8 mb-8">
              {[
                { label: 'Días', value: timeLeft.days },
                { label: 'Horas', value: timeLeft.hours },
                { label: 'Minutos', value: timeLeft.minutes },
                { label: 'Segundos', value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl md:text-5xl font-black text-white bg-dark-border/50 rounded-xl px-4 py-2 min-w-[70px] md:min-w-[90px] tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
            <WalletButton />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
