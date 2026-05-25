import { useState, useCallback, useMemo } from 'react'
import {
  getSOLPrice,
  getUserBalance,
  buildTransferTransaction,
  signAndSendTx,
  confirmTx,
} from '../utils/solanaTransaction'
import { createTicketData } from '../utils/generateTicket'
import { savePurchase } from '../utils/localStorage'

export default function usePurchaseXLK() {
  const [step, setStep] = useState('idle')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [ticket, setTicket] = useState(null)
  const [error, setError] = useState(null)
  const [solPrice, setSolPrice] = useState(null)
  const [balance, setBalance] = useState(null)

  const xlkAmount = useMemo(() => {
    const num = parseFloat(amount)
    return isNaN(num) || num < 0 ? 0 : num
  }, [amount])

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

        const txData = {
          signature,
          solAmount: lamports / 1e9,
          solPrice,
          usdAmount,
          xlkAmount: usdAmount,
          treasuryWallet: '8DrjcuEzciWwaV5xP3qdYQdA8JqJ9mK8garm3rVPcrbz',
          wallet: publicKey,
        }

        const ticketData = createTicketData(txData)
        savePurchase(ticketData)

        setResult(txData)
        setTicket(ticketData)
        setStep('success')
      } catch (err) {
        if (err.message === 'INSUFFICIENT_FUNDS') {
          setError('Fondos insuficientes para completar la compra')
        } else if (err.code === 4001) {
          setError('Transacción cancelada por el usuario')
        } else {
          console.error('Purchase error:', err)
          setError('No fue posible procesar la operación. Intente nuevamente.')
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
    setTicket(null)
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
    ticket,
    error,
    solPrice,
    balance,
    startPurchase,
    reset,
  }
}
