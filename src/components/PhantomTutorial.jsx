import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clapperboard, ChevronUp } from 'lucide-react'

export default function PhantomTutorial() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-[#080818] to-deep-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center mx-auto mb-5">
              <Clapperboard className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              ¿No tienes <span className="text-gradient">Phantom Wallet</span>?
            </h2>

            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Mira esta guía rápida para instalar y configurar Phantom Wallet antes de participar en la preventa de{' '}
              <span className="text-gradient font-semibold">XLK</span>.
            </p>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 neon-glow-blue inline-flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isOpen ? (
                  <>
                    Ocultar Tutorial <ChevronUp size={18} />
                  </>
                ) : (
                  <>
                    Ver Tutorial de Instalación <Clapperboard size={18} />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-8">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden glass-card neon-glow-purple">
                    <iframe
                      src="https://www.youtube.com/embed/jy419-alLXk"
                      title="Tutorial de instalación de Phantom Wallet"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-4">
                    Video oficial de Phantom Wallet — Sigue los pasos para instalar y configurar tu wallet.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
