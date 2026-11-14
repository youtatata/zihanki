import { PAYMENT_METHOD_LABELS, PAYMENT_METHODS } from '../constants'
import type { PaymentMethod } from '../types'

// 支払い方法を小さなラベルで並べる（並び順は定数の順に揃える）
export function PaymentChips({ methods }: { methods: PaymentMethod[] }) {
  const sorted = PAYMENT_METHODS.filter((m) => methods.includes(m))
  if (sorted.length === 0) return null

  return (
    <ul className="chips" aria-label="支払い方法">
      {sorted.map((m) => (
        <li key={m} className="chip">
          {PAYMENT_METHOD_LABELS[m]}
        </li>
      ))}
    </ul>
  )
}
