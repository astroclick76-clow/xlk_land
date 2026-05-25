import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wind, Droplets, Leaf, Flame, Palmtree, Tent, Waves } from 'lucide-react'

const images = import.meta.glob('/public/assets/images/*.png', { eager: true, query: '?url' })

const parques = [
  { icon: Wind, nombre: 'Parque Aire', desc: 'Tirolesas y actividades aéreas', color: 'from-sky-400 to-blue-500' },
  { icon: Droplets, nombre: 'Parque Agua', desc: 'Cenote natural y toboganes', color: 'from-cyan-400 to-blue-500' },
  { icon: Leaf, nombre: 'Parque Tierra', desc: 'Vivero y jardín botánico', color: 'from-green-400 to-emerald-500' },
  { icon: Flame, nombre: 'Parque Fuego', desc: 'Spa, restaurantes y cabañas', color: 'from-orange-400 to-red-500' },
]

function HorseIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4c0 2-1 3-3 4c-2 1-4 2-5 4c-1 2-1 4-1 6v2" />
      <path d="M6 4c0 2 1 3 3 4c2 1 4 2 5 4" />
      <path d="M3 22c2-1 4-2 6-2s4 1 6 2" />
      <path d="M12 10V6" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  )
}

const extras = [
  { icon: Palmtree, label: 'Club de Playa' },
  { icon: Tent, label: 'Camping' },
  { icon: HorseIcon, label: 'Paseos a Caballo' },
  { icon: Waves, label: 'Experiencias Ecoturísticas' },
]

export default function Proyecto() {
  const [parkImg, setParkImg] = useState('')

  useEffect(() => {
    const imgKeys = Object.keys(images)
    const park = imgKeys.find(k => k.includes('parks'))
    if (park) {
      setParkImg(images[park].default || images[park])
    }
  }, [])

  return (
    <section id="proyecto" className="relative py-24 md:py-32 px-4">
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
            El <span className="text-gradient">Proyecto</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Xelvatika es un desarrollo turístico y habitacional de <strong className="text-white">66.5 hectáreas</strong> ubicado en Yucatán, que integra naturaleza, tecnología y exclusividad.
          </p>
        </motion.div>

        {parkImg && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden mb-16 group"
          >
            <img
              src={parkImg}
              alt="Xelvatika Yucatán"
              className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Xelvatika, Yucatán</h3>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl">
                Un ecosistema completo donde la naturaleza y la tecnología blockchain convergen para crear una experiencia turística única.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {parques.map((p, i) => (
            <motion.div
              key={p.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <p.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{p.nombre}</h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">Experiencias Incluidas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {extras.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-electric-blue/40 hover:text-electric-blue transition-all duration-300">
                <item.icon size={16} />
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
