import { Link } from 'react-router'
import { PageShell } from '../components/PageShell'
import { PaymentChips } from '../components/PaymentChips'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'

// 新しい登録日順。同じ日なら後から登録したものを先に
function byNewest(a: VendingMachine, b: VendingMachine): number {
  return b.date.localeCompare(a.date) || b.id - a.id
}

// /list 登録した自販機を写真つきのカードで一覧表示する
export function ListPage() {
  const { machines, loading, error } = useVendingMachines()
  const sorted = [...machines].sort(byNewest)

  return (
    <PageShell>
      <h2 className="page-title">
        登録一覧
        {!loading && !error && <span className="page-count">{machines.length}件</span>}
      </h2>

      {error && <p className="error">{error}</p>}
      {loading && <p className="muted">読み込み中…</p>}
      {!loading && !error && machines.length === 0 && (
        <div className="empty-state">
          <p>まだ登録がありません</p>
          <Link to="/create" className="button primary">
            追加する
          </Link>
        </div>
      )}

      <ul className="machine-grid">
        {sorted.map((m) => (
          <li key={m.id}>
            <MachineCard machine={m} />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

// 押すと地図画面に移り、そのピンを選んだ状態で表示する
function MachineCard({ machine }: { machine: VendingMachine }) {
  return (
    <Link to={`/?id=${machine.id}`} className="machine-card">
      <img className="machine-card-photo" src={machine.image_url} alt="" loading="lazy" />
      <div className="machine-card-body">
        <span className="machine-card-name">{machine.name || '名前なし'}</span>
        <span className="date-badge">{machine.date}</span>
        <PaymentChips methods={machine.payment_methods} />
        {machine.memo && <p className="machine-card-memo">{machine.memo}</p>}
      </div>
    </Link>
  )
}
