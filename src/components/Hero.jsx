import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'

const images = import.meta.glob('/public/assets/images/*.png', { eager: true, query: '?url' })
const videos = import.meta.glob('/public/assets/video/**/*.{mp4,webm,mov}', { eager: true, query: '?url' })

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState('')
  const [logoImg, setLogoImg] = useState('')
  const videoRef = useRef(null)

  useEffect(() => {
    const videoKeys = Object.keys(videos)
    if (videoKeys.length > 0) {
      setVideoSrc(videos[videoKeys[0]].default || videos[videoKeys[0]])
    }
    const imgKeys = Object.keys(images)
    const cover = imgKeys.find(k => k.includes('cover'))
    if (cover) {
      setLogoImg(images[cover].default || images[cover])
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black/70 via-deep-black/40 to-deep-black/80" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-deep-black/20 to-deep-black/60" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          {logoImg ? (
            <img
              src={logoImg}
              alt="XLK Logo"
              className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-2xl neon-glow-blue"
            />
          ) : (
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center neon-glow-blue">
              <span className="text-4xl md:text-5xl font-black text-white">XLK</span>
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
        >
          <span className="text-gradient">Welcome to</span>
          <br />
          <span className="text-white">Xelvatika</span>{' '}
          <span className="text-gradient-cyan">(XLK)</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 font-light"
        >
          A next-generation decentralized ecosystem built for the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo('about')}
            className="group relative px-8 py-4 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue"
          >
            <span className="relative z-10 flex items-center gap-2">
              Buy XLK <ExternalLink size={18} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="px-8 py-4 border border-electric-blue/50 text-electric-blue rounded-full font-semibold text-lg transition-all duration-300 hover:bg-electric-blue/10 hover:border-electric-blue hover:neon-glow-blue"
          >
            Whitepaper
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollTo('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-electric-blue/70 hover:text-electric-blue transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  )
}
