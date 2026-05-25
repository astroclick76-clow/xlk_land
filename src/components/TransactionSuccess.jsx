import PurchaseTicket from './PurchaseTicket'

export default function TransactionSuccess({ ticket, onClose }) {
  return <PurchaseTicket ticket={ticket} onClose={onClose} />
}
