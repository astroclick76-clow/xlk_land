import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Copy, Info, AlertTriangle } from 'lucide-react'
import QRCode from 'qrcode'
import Toast from './Toast'

const WALLET_ADDRESS = '8DrjcuEzciWwaV5xP3qdYQdA8JqJ9mK8garm3rVPcrbz'
const SOLANA_URI = `solana:${WALLET_ADDRESS}`

export default function ManualTransferCard() {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false })

  useEffect(() => {
    QRCode.toDataURL(SOLANA_URI, {
      width: 280,
      margin: 2,
      color: {
        dark: '#00D4FF',
        light: '#111118',
      },
    })
      .then(setQrDataUrl)
      .catch(console.error)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS)
      setToast({ message: 'Dirección copiada correctamente', type: 'success', visible: true })
    } catch {
      setToast({ message: 'No se pudo copiar la dirección', type: 'error', visible: true })
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 pt-8 border-t border-white/5"
      >
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm mb-3">
            ¿Prefieres realizar una transferencia manual?
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple mx-auto rounded-full" />
        </div>

        <div className="max-w-md mx-auto">
          <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {qrDataUrl && (
                <div className="flex justify-center">
                  <div className="bg-dark-card rounded-2xl p-3 border border-dark-border shadow-lg">
                    <img
                      src={qrDataUrl}
                      alt="QR Wallet Oficial XLK"
                      className="w-40 h-40 md:w-48 md:h-48"
                    />
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
                  Wallet Oficial de Tesorería XLK
                </p>
                <div className="bg-dark-surface rounded-xl px-4 py-3 border border-dark-border">
                  <p className="text-sm font-mono text-gray-300 break-all select-all leading-relaxed">
                    {WALLET_ADDRESS}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.02] neon-glow-blue flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy size={16} />
                Copiar Dirección
              </button>

              <div className="p-3.5 rounded-xl bg-electric-blue/5 border border-electric-blue/10">
                <div className="flex gap-2.5">
                  <Info size={15} className="text-electric-blue shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    También puede participar en la preventa enviando fondos manualmente
                    desde cualquier wallet compatible con Solana utilizando el código QR
                    o la dirección oficial de tesorería.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                <div className="flex gap-2.5">
                  <AlertTriangle size={15} className="text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-400/80 leading-relaxed">
                    Verifique siempre que la dirección coincida con la wallet oficial
                    publicada por XLK antes de realizar cualquier transferencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  )
}
