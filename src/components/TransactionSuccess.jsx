import { motion } from 'framer-motion'
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react'

export default function TransactionSuccess({ result, onClose }) {
  const abbreviate = (addr) =>
    addr ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : ''

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-2">
        Compra registrada correctamente
      </h3>
      <p className="text-gray-400 text-sm mb-8">
        Tu transacción ha sido enviada a la red Solana
      </p>

      <div className="w-full glass rounded-xl p-5 mb-6 text-left space-y-3">
        <DetailRow label="Wallet comprador" value={abbreviate(result.wallet || '')} />
        <DetailRow
          label="Wallet tesorería"
          value={abbreviate(result.treasuryWallet)}
        />
        <DetailRow
          label="Monto enviado"
          value={`${result.solAmount.toFixed(4)} SOL (${result.usdAmount} USD)`}
        />
        <DetailRow
          label="XLK estimados"
          value={`${result.xlkAmount.toLocaleString()} XLK`}
        />
        <DetailRow label="Hash de transacción" value={abbreviate(result.signature)} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <a
          href={`https://solscan.io/tx/${result.signature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex-1 px-6 py-3.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue flex items-center justify-center gap-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            Ver transacción en Solscan <ExternalLink size={18} />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3.5 border border-dark-border rounded-full text-gray-400 font-medium text-base transition-all duration-300 hover:border-gray-600 hover:text-white flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} /> Cerrar
        </button>
      </div>
    </motion.div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-gray-400 text-xs uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-white text-sm font-mono truncate">{value}</span>
    </div>
  )
}
