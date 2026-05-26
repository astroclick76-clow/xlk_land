import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Shield, Trees, Mountain, Users } from 'lucide-react'

const images = import.meta.glob('/public/assets/images/*.png', { eager: true, query: '?url' })
const videos = import.meta.glob('/public/assets/video/**/*.{mp4,webm,mov}', { eager: true, query: '?url' })

const metrics = [
  { icon: Trees, label: 'Hectáreas', value: '66.5' },
  { icon: Mountain, label: 'Parques Temáticos y Deportivo' , value: '4 - 1' },
  { icon: Shield, label: 'XLK Máximo', value: '21M' },
  { icon: Users, label: 'Visitantes Diarios', value: '+1000' },
]

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const videoRef = useRef(null)

  useEffect(() => {
    const videoKeys = Object.keys(videos)
    if (videoKeys.length > 0) {
      setVideoSrc(videos[videoKeys[0]].default || videos[videoKeys[0]])
    }
    const imgKeys = Object.keys(images)
    const cover = imgKeys.find(k => k.includes('cover'))
    if (cover) {
      setCoverImg(images[cover].default || images[cover])
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-[#0a0a1a] to-[#0d0d20]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black/50 to-deep-black/85" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-deep-black/20 to-deep-black/60" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          {coverImg ? (
            <img
              src={coverImg}
              alt="Xelvatika"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl neon-glow-blue shadow-2xl"
            />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center neon-glow-blue">
              <span className="text-4xl md:text-5xl font-black text-white">XLK</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-electric-blue/10 border border-electric-blue/30 text-electric-blue mb-4">
            Utility Token del Ecosistema Xelvatika
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
        >
          <span className="text-gradient">XLK:</span>
          <br />
          <span className="text-white">El Token Oficial del</span>
          <br />
          <span className="text-gradient-cyan">Ecosistema Xelvatika</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-10 font-light leading-relaxed"
        >
          Participa en la evolución del turismo inteligente mediante un ecosistema blockchain diseñado para recompensar la fidelidad, generar beneficios reales y conectar experiencias únicas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo('preventa')}
            className="group relative px-8 py-4 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue"
          >
            <span className="relative z-10 flex items-center gap-2">
              Participar en Preventa <ArrowRight size={18} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => window.open('https://xelvatika.com/', '_blank', 'noopener,noreferrer')}
            className="px-8 py-4 border border-electric-blue/50 text-electric-blue rounded-full font-semibold text-lg transition-all duration-300 hover:bg-electric-blue/10 hover:border-electric-blue hover:neon-glow-blue"
          >
            Conocer el Proyecto
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
        >
          {metrics.map((m, i) => (
            <div key={m.label} className="glass rounded-xl p-4 text-center group hover:border-electric-blue/30 transition-all duration-300">
              <m.icon className="w-5 h-5 text-electric-blue mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl md:text-2xl font-black text-white">{m.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollTo('proyecto')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-electric-blue/60 hover:text-electric-blue transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </motion.button>
      </motion.div>
    </section>
  )
}
