import { useState, useCallback, useMemo } from 'react'
import {
  getSOLPrice,
  getUserBalance,
  buildTransferTransaction,
  signAndSendTx,
  confirmTx,
} from '../utils/solanaTransaction'

export default function usePurchaseXLK() {
  const [step, setStep] = useState('idle')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [solPrice, setSolPrice] = useState(null)
  const [balance, setBalance] = useState(null)

  const xlkAmount = useMemo(() => {
    const num = parseFloat(amount)
    return isNaN(num) || num < 0 ? 0 : num
  }, [amount])

  const prepare = useCallback(async (publicKey) => {
    setStep('preparing')
    setError(null)
    try {
      const [price, bal] = await Promise.all([
        getSOLPrice(),
        getUserBalance(publicKey),
      ])
      setSolPrice(price)
      setBalance(bal)
      setStep('idle')
    } catch (err) {
      console.error('Error preparing purchase:', err)
      setError('No fue posible preparar la compra')
      setStep('error')
    }
  }, [])

  const startPurchase = useCallback(
    async (publicKey) => {
      const usdAmount = parseFloat(amount)
      if (!amount || isNaN(usdAmount) || usdAmount <= 0) {
        setError('Ingresa un monto válido')
        return
      }

      setStep('preparing')
      setError(null)

      try {
        const solPrice = await getSOLPrice()
        const solAmount = usdAmount / solPrice

        const balance = await getUserBalance(publicKey)
        const lamportsNeeded = Math.floor(solAmount * 1e9)
        if (balance * 1e9 < lamportsNeeded + 5000) {
          throw new Error('INSUFFICIENT_FUNDS')
        }

        const { transaction, lamports } = await buildTransferTransaction(
          publicKey,
          solAmount
        )

        setStep('awaiting_confirmation')

        const signature = await signAndSendTx(transaction)

        setStep('sending')

        await confirmTx(signature)

        setStep('success')
        setResult({
          signature,
          solAmount: lamports / 1e9,
          solPrice,
          usdAmount,
          xlkAmount: usdAmount,
          treasuryWallet: '8DrjcuEzciWwaV5xP3qdYQdA8JqJ9mK8garm3rVPcrbz',
          wallet: publicKey,
        })
      } catch (err) {
        if (err.message === 'INSUFFICIENT_FUNDS') {
          setError('Saldo insuficiente para realizar la compra')
        } else if (err.code === 4001) {
          setError('Operación cancelada por el usuario')
        } else {
          console.error('Purchase error:', err)
          setError('No fue posible completar la transacción')
        }
        setStep('error')
      }
    },
    [amount]
  )

  const reset = useCallback(() => {
    setStep('idle')
    setAmount('')
    setResult(null)
    setError(null)
    setSolPrice(null)
    setBalance(null)
  }, [])

  return {
    step,
    amount,
    setAmount,
    xlkAmount,
    result,
    error,
    solPrice,
    balance,
    prepare,
    startPurchase,
    reset,
  }
}
