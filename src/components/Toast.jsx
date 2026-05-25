import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
}

const borderColors = {
  success: 'border-green-500/30',
  error: 'border-red-500/30',
  info: 'border-electric-blue/30',
}

const iconColors = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-electric-blue',
}

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }) {
  const Icon = icons[type]

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl glass border ${borderColors[type]} shadow-2xl min-w-[320px]`}
        >
          <Icon size={20} className={`shrink-0 ${iconColors[type]}`} />
          <span className="text-sm font-medium text-white flex-1">{message}</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
