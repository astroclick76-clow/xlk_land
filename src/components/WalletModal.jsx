import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Wallet, Smartphone } from 'lucide-react'
import { redirectToPhantom } from '../utils/phantomDeepLink'

export default function WalletModal({ isOpen, onClose, mode = 'install', mobileOS = null }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass rounded-2xl p-8 max-w-md w-full relative border border-neon-purple/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {mode === 'mobile-deeplink' ? (
              <MobileDeepLinkContent mobileOS={mobileOS} onClose={onClose} />
            ) : (
              <InstallContent onClose={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InstallContent({ onClose }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center mb-4">
        <Wallet className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3">Conecta tu Wallet</h3>

      <p className="text-gray-400 text-sm mb-2 leading-relaxed">
        Para participar en la preventa de{' '}
        <span className="text-gradient font-semibold">XLK</span>{' '}
        necesitas una wallet compatible con Solana.
      </p>

      <p className="text-gray-400 text-sm mb-6">
        Instala{' '}
        <span className="text-white font-semibold">Phantom Wallet</span>{' '}
        para continuar.
      </p>

      <a
        href="https://phantom.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue mb-3 flex items-center justify-center gap-2"
      >
        <span className="relative z-10 flex items-center gap-2">
          Instalar Phantom Wallet <ExternalLink size={18} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>

      <button
        onClick={onClose}
        className="w-full px-6 py-3 border border-dark-border rounded-full text-gray-400 font-medium text-base transition-all duration-300 hover:border-gray-600 hover:text-white"
      >
        Cancelar
      </button>
    </div>
  )
}

function MobileDeepLinkContent({ mobileOS, onClose }) {
  const osLabel = mobileOS === 'iOS' ? 'iPhone' : 'Android'

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center mb-4">
        <Smartphone className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3">
        Abrir con Phantom Wallet
      </h3>

      <p className="text-gray-400 text-sm mb-2 leading-relaxed">
        Para continuar con la preventa de{' '}
        <span className="text-gradient font-semibold">XLK</span>,
        abre esta página dentro de Phantom Wallet.
      </p>

      <p className="text-gray-400 text-xs mb-6">
        {osLabel}: Si ya tienes Phantom instalado, pulsa "
        <span className="text-electric-blue">Abrir en Phantom</span>" para
        continuar la compra.
      </p>

      <button
        onClick={redirectToPhantom}
        className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue mb-3 flex items-center justify-center gap-2"
      >
        <span className="relative z-10 flex items-center gap-2">
          Abrir en Phantom <ExternalLink size={18} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <a
        href="https://phantom.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-6 py-3 border border-dark-border rounded-full text-gray-400 font-medium text-base transition-all duration-300 hover:border-gray-600 hover:text-white mb-2"
      >
        Instalar Phantom Wallet
      </a>

      <button
        onClick={onClose}
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        Cancelar
      </button>
    </div>
  )
}
