import { useState, useEffect, useCallback, useMemo } from 'react'
import { isMobileDevice, getMobileOS } from '../utils/isMobileDevice'
import { isInPhantomApp } from '../utils/phantomDeepLink'

export default function usePhantomWallet() {
  const [publicKey, setPublicKey] = useState(null)
  const [status, setStatus] = useState('disconnected')
  const [error, setError] = useState(null)

  const isMobile = useMemo(() => isMobileDevice(), [])
  const mobileOS = useMemo(() => getMobileOS(), [])
  const inPhantomApp = useMemo(() => isInPhantomApp(), [])

  const phantomAvailable = isInPhantomApp()

  const connect = useCallback(async () => {
    if (!phantomAvailable) {
      return { installed: false }
    }

    setStatus('connecting')
    setError(null)

    try {
      const provider = window.phantom.solana
      const response = await provider.connect()
      const pubKey = response.publicKey.toString()
      setPublicKey(pubKey)
      setStatus('connected')
      return { installed: true, success: true, publicKey: pubKey }
    } catch (err) {
      if (err.code === 4001) {
        setError('Conexión cancelada por el usuario')
      } else {
        console.error('Error connecting to Phantom:', err)
        setError('No fue posible conectar la wallet')
      }
      setStatus('disconnected')
      return { installed: true, success: false, error: err }
    }
  }, [phantomAvailable])

  const disconnect = useCallback(async () => {
    if (phantomAvailable) {
      try {
        await window.phantom.solana.disconnect()
      } catch (err) {
        console.error('Error disconnecting:', err)
      }
    }
    setPublicKey(null)
    setStatus('disconnected')
    setError(null)
  }, [phantomAvailable])

  useEffect(() => {
    if (!phantomAvailable) return

    window.phantom.solana
      .connect({ onlyIfTrusted: true })
      .then((response) => {
        setPublicKey(response.publicKey.toString())
        setStatus('connected')
      })
      .catch(() => {})

    const handleAccountChanged = (newPublicKey) => {
      if (newPublicKey) {
        setPublicKey(newPublicKey.toString())
        setStatus('connected')
      } else {
        setPublicKey(null)
        setStatus('disconnected')
      }
    }

    const handleDisconnect = () => {
      setPublicKey(null)
      setStatus('disconnected')
    }

    window.phantom.solana.on('accountChanged', handleAccountChanged)
    window.phantom.solana.on('disconnect', handleDisconnect)

    return () => {
      window.phantom.solana.removeListener('accountChanged', handleAccountChanged)
      window.phantom.solana.removeListener('disconnect', handleDisconnect)
    }
  }, [phantomAvailable])

  const abbreviateAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return {
    publicKey,
    status,
    error,
    connect,
    disconnect,
    isPhantomInstalled: phantomAvailable,
    isMobile,
    mobileOS,
    inPhantomApp,
    abbreviateAddress,
  }
}
