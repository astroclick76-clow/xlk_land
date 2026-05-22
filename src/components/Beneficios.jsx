import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Percent, Wallet, Crown, Vote, Lock, ArrowLeftRight, Building2, Gift } from 'lucide-react'

const images = import.meta.glob('/public/assets/images/*.png', { eager: true, query: '?url' })

const beneficios = [
  {
    icon: Percent,
    title: 'Descuento Directo',
    desc: '15% de descuento en servicios del complejo pagando con XLK.',
    gradient: 'from-electric-blue to-cyan-400',
  },
  {
    icon: Wallet,
    title: 'Cashback Inteligente',
    desc: 'Entre 2% y 8% según el nivel del usuario en cada transacción.',
    gradient: 'from-neon-purple to-purple-500',
  },
  {
    icon: Crown,
    title: 'Acceso Exclusivo',
    desc: 'Eventos y experiencias premium exclusivas para holders de XLK.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Vote,
    title: 'Gobernanza',
    desc: 'Participación activa en las decisiones del ecosistema Xelvatika.',
    gradient: 'from-electric-blue to-neon-purple',
  },
  {
    icon: Lock,
    title: 'Staking',
    desc: 'Bloqueo voluntario de tokens para obtener beneficios exclusivos.',
    gradient: 'from-bright-cyan to-electric-blue',
  },
  {
    icon: ArrowLeftRight,
    title: 'Mercado P2P',
    desc: 'Intercambio entre residentes y visitantes sin intermediarios.',
    gradient: 'from-green-400 to-bright-cyan',
  },
  {
    icon: Building2,
    title: 'Alianzas Comerciales',
    desc: 'Uso del token en restaurantes, traslados y operadores turísticos.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Gift,
    title: 'Recompensas Sociales',
    desc: 'Beneficios por participación activa y crecimiento de la comunidad.',
    gradient: 'from-pink-500 to-rose-500',
  },
]

export default function Beneficios() {
  const [lifestyleImg, setLifestyleImg] = useState('')

  useEffect(() => {
    const imgKeys = Object.keys(images)
    const lifestyle = imgKeys.find(k => k.includes('lifestyle'))
    if (lifestyle) {
      setLifestyleImg(images[lifestyle].default || images[lifestyle])
    }
  }, [])

  return (
    <section id="beneficios" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#07070f] to-deep-black pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Beneficios del <span className="text-gradient">Token</span>
          </h2>
          <p className="text-gray-400 text-lg">Ventajas exclusivas para holders de XLK</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {beneficios.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-6 h-full cursor-default relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <b.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-0.5 bg-gradient-to-r ${b.gradient} transition-all duration-500 rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>

        {lifestyleImg && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img
              src={lifestyleImg}
              alt="Estilo de vida Xelvatika"
              className="w-full h-[250px] md:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-black/60 via-transparent to-deep-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-xl md:text-3xl font-bold text-center px-4">
                Vive la experiencia <span className="text-gradient">Xelvatika</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
