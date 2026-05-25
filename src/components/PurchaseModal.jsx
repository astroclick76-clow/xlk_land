import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Wallet,
  Copy,
  Check,
  Loader2,
  ArrowRight,
  AlertCircle,
  Landmark,
} from 'lucide-react'
import usePhantomWallet from '../hooks/usePhantomWallet'
import usePurchaseXLK from '../hooks/usePurchaseXLK'
import TransactionSuccess from './TransactionSuccess'
import { TREASURY_WALLET } from '../utils/solanaTransaction'

const QUICK_AMOUNTS = [50, 100, 500, 1000]

export default function PurchaseModal({ isOpen, onClose }) {
  const { publicKey, abbreviateAddress } = usePhantomWallet()
  const {
    step,
    amount,
    setAmount,
    xlkAmount,
    result,
    error,
    startPurchase,
    reset,
  } = usePurchaseXLK()

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handleAmountChange = (e) => {
    const val = e.target.value
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val)
    }
  }

  const handleQuickAmount = (val) => {
    setAmount(String(val))
  }

  const handleBuy = () => {
    if (!publicKey) return
    startPurchase(publicKey)
  }

  const handleClose = () => {
    if (step === 'awaiting_confirmation' || step === 'sending') return
    onClose()
  }

  const isValid =
    amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0

  const usdNum = parseFloat(amount) || 0

  const isProcessing =
    step === 'preparing' ||
    step === 'awaiting_confirmation' ||
    step === 'sending'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass rounded-2xl max-w-lg w-full relative border border-electric-blue/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isProcessing && step !== 'success' && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>
            )}

            {step === 'success' && result ? (
              <div className="p-8">
                <TransactionSuccess
                  result={{
                    ...result,
                    wallet: publicKey,
                  }}
                  onClose={onClose}
                />
              </div>
            ) : step === 'error' ? (
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Error en la compra
                </h3>
                <p className="text-gray-400 text-sm mb-6">{error}</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleBuy}
                    className="px-6 py-3 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Intentar de nuevo
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 border border-dark-border rounded-full text-gray-400 transition-all duration-300 hover:border-gray-600 hover:text-white"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : isProcessing ? (
              <div className="p-8 flex flex-col items-center text-center">
                <Loader2
                  size={40}
                  className="text-electric-blue animate-spin mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-2">
                  {step === 'preparing' && 'Preparando compra...'}
                  {step === 'awaiting_confirmation' &&
                    'Confirma la transacción desde Phantom Wallet'}
                  {step === 'sending' && 'Enviando transacción...'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {step === 'awaiting_confirmation' &&
                    'Revisa la ventana de Phantom para firmar la transacción'}
                </p>
                {step === 'awaiting_confirmation' && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-4 px-4 py-2 rounded-lg bg-electric-blue/5 border border-electric-blue/20"
                  >
                    <span className="text-xs text-electric-blue">
                      Esperando firma...
                    </span>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-blue to-neon-purple flex items-center justify-center">
                    <Wallet className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Comprar XLK
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Conectado como{' '}
                    <span className="text-electric-blue font-mono">
                      {abbreviateAddress(publicKey)}
                    </span>
                  </p>
                </div>

                <div className="glass rounded-xl p-4 mb-4">
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                    Monto a invertir (USD)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="w-full bg-transparent text-4xl font-black text-white outline-none placeholder-gray-600 tabular-nums"
                  />
                  <div className="flex gap-2 mt-3">
                    {QUICK_AMOUNTS.map((val) => (
                      <button
                        key={val}
                        onClick={() => handleQuickAmount(val)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                          usdNum === val
                            ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/40'
                            : 'bg-dark-border/50 text-gray-400 border border-dark-border hover:border-electric-blue/30 hover:text-electric-blue'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl p-4 mb-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      Precio del Token
                    </span>
                    <span className="text-white font-semibold">
                      1 XLK = 1 USD
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      XLK estimados
                    </span>
                    <span className="text-gradient font-bold text-lg tabular-nums">
                      {xlkAmount.toLocaleString()} XLK
                    </span>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 mb-6 border border-neon-purple/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shrink-0">
                      <Landmark size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-300">
                        Wallet Oficial de Tesorería
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Fondo de bóveda oficial
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-dark-border/50 rounded-lg px-3 py-2">
                    <span className="text-white font-mono text-xs truncate flex-1">
                      {TREASURY_WALLET}
                    </span>
                    <CopyButton text={TREASURY_WALLET} />
                  </div>
                </div>

                {usdNum > 0 && isValid && (
                  <div className="glass rounded-xl p-4 mb-6 border border-electric-blue/20">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                      Resumen de compra
                    </p>
                    <div className="space-y-2">
                      <Row
                        label="Monto invertido"
                        value={`$${usdNum.toLocaleString()} USD`}
                      />
                      <Row
                        label="Cantidad estimada XLK"
                        value={`${xlkAmount.toLocaleString()} XLK`}
                      />
                      <Row
                        label="Wallet de destino"
                        value={`${TREASURY_WALLET.slice(0, 4)}...${TREASURY_WALLET.slice(-4)}`}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBuy}
                  disabled={!isValid}
                  className="group relative w-full px-6 py-4 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] neon-glow-blue disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Comprar XLK <ArrowRight size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    }
  }, [copied])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-gray-400 hover:text-electric-blue transition-colors shrink-0"
      title="Copiar dirección completa"
    >
      {copied ? (
        <Check size={14} className="text-green-400" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  )
}
