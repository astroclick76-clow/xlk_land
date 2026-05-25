import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileDown, ExternalLink, CheckCircle, Copy, Check, ArrowLeft } from 'lucide-react'
import { generatePDF } from '../utils/generatePDF'

export default function PurchaseTicket({ ticket, onClose }) {
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  const abbreviate = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const blob = await generatePDF(ticket)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `comprobante-xlk-${ticket.idCompra}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error generating PDF:', err)
    }
    setDownloading(false)
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(ticket.idCompra)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

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
        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-1">
        Pago confirmado correctamente
      </h3>
      <p className="text-gray-400 text-sm mb-6 max-w-sm">
        Su comprobante ha sido generado y puede descargarse ahora.
      </p>

      <div className="w-full glass rounded-xl p-5 mb-6 text-left space-y-3 border border-electric-blue/10">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-400">
            ID de Compra
          </span>
          <button
            onClick={handleCopyId}
            className="flex items-center gap-1 text-xs text-electric-blue hover:text-bright-cyan transition-colors"
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-400" /> Copiado
              </>
            ) : (
              <>
                <Copy size={12} /> Copiar
              </>
            )}
          </button>
        </div>
        <p className="text-white font-mono text-sm font-bold -mt-1">
          {ticket.idCompra}
        </p>
        <div className="border-t border-dark-border pt-3 space-y-2">
          <TicketRow label="Fecha" value={formatDate(ticket.fecha)} />
          <TicketRow
            label="Wallet Comprador"
            value={abbreviate(ticket.walletComprador)}
          />
          <TicketRow
            label="Wallet Tesorería"
            value={abbreviate(ticket.walletTesorería)}
          />
          <TicketRow
            label="Monto USD"
            value={`$${ticket.montoUSD.toLocaleString()} USD`}
          />
          <TicketRow
            label="Monto SOL"
            value={`${ticket.montoSOL.toFixed(6)} SOL`}
          />
          <TicketRow
            label="XLK Estimados"
            value={`${ticket.xlkEstimados.toLocaleString()} XLK`}
          />
          <TicketRow label="Estado" value="Confirmada" />
        </div>
        <div className="border-t border-dark-border pt-3">
          <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
            Hash Blockchain
          </span>
          <p className="text-gray-500 font-mono text-xs break-all">
            {ticket.txHash}
          </p>
        </div>
      </div>

      <p className="text-gray-500 text-xs mb-6 max-w-sm leading-relaxed">
        La asignación y entrega de XLK será gestionada según el proceso oficial
        de la preventa. Conserve este comprobante como respaldo de su operación.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="group relative flex-1 px-6 py-3.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            {downloading ? (
              'Generando...'
            ) : (
              <>
                <FileDown size={18} /> Descargar Comprobante PDF
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <a
          href={`https://solscan.io/tx/${ticket.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-3.5 border border-dark-border rounded-full text-gray-400 font-medium text-base transition-all duration-300 hover:border-gray-600 hover:text-white flex items-center justify-center gap-2"
        >
          <ExternalLink size={18} /> Solscan
        </a>
      </div>

      <button
        onClick={onClose}
        className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
      >
        <ArrowLeft size={14} /> Cerrar
      </button>
    </motion.div>
  )
}

function TicketRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  )
}
