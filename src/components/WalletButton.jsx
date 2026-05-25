import { useState, useCallback } from 'react'
import { ArrowRight, Loader2, Wallet } from 'lucide-react'
import usePhantomWallet from '../hooks/usePhantomWallet'
import WalletModal from './WalletModal'
import PurchaseModal from './PurchaseModal'
import Toast from './Toast'

export default function WalletButton() {
  const {
    publicKey,
    status,
    connect,
    isPhantomInstalled,
    isMobile,
    mobileOS,
    abbreviateAddress,
  } = usePhantomWallet()

  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('install')
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false })

  const showToast = useCallback((message, type) => {
    setToast({ message, type, visible: true })
  }, [])

  const openModal = (mode) => {
    setModalMode(mode)
    setShowModal(true)
  }

  const handleClick = async () => {
    if (status === 'connected') {
      setShowPurchaseModal(true)
      return
    }

    if (isPhantomInstalled) {
      const result = await connect()
      if (result.success) {
        showToast('Wallet Phantom conectada correctamente', 'success')
      }
      return
    }

    if (isMobile) {
      openModal('mobile-deeplink')
    } else {
      openModal('install')
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={status === 'connecting'}
        className="group relative px-10 py-4 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 neon-glow-blue disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'connecting' ? (
          <span className="relative z-10 flex items-center gap-2">
            <Loader2 size={20} className="animate-spin" />
            Conectando...
          </span>
        ) : status === 'connected' ? (
          <span className="relative z-10 flex items-center gap-2">
            <Wallet size={20} />
            {abbreviateAddress(publicKey)}
          </span>
        ) : (
          <span className="relative z-10 flex items-center gap-2">
            Participar en la Preventa <ArrowRight size={20} />
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <WalletModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode={modalMode}
        mobileOS={mobileOS}
      />

      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  )
}
