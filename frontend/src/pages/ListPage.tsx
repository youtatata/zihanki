import { Link } from 'react-router'
import { PageShell } from '../components/PageShell'
import { PaymentChips } from '../components/PaymentChips'
import { useVendingMachines } from '../hooks/useVendingMachines'
import type { VendingMachine } from '../types'

const UNKNOWN_PREFECTURE = '地域未設定'
const UNKNOWN_CITY = '市区町村不明'

type CityGroup = { city: string; machines: VendingMachine[] }
type PrefectureGroup = { prefecture: string; count: number; cities: CityGroup[] }

// 新しい登録日順。同じ日なら後から登録したものを先に
function byNewest(a: VendingMachine, b: VendingMachine): number {
  return b.date.localeCompare(a.date) || b.id - a.id
}

// 件数の多い順、同数なら名前順。「地域未設定」などの不明分は最後に回す
function compareGroups(a: { name: string; count: number }, b: { name: string; count: number }, unknown: string) {
  if (a.name === unknown) return 1
  if (b.name === unknown) return -1
  return b.count - a.count || a.name.localeCompare(b.name, 'ja')
}

// 都道府県 ＞ 市区町村 の2段階にまとめる
function groupByArea(machines: VendingMachine[]): PrefectureGroup[] {
  const tree = new Map<string, Map<string, VendingMachine[]>>()
  for (const m of [...machines].sort(byNewest)) {
    const prefecture = m.prefecture || UNKNOWN_PREFECTURE
    // 地域未設定のものは市区町村で分けない（空文字のまま1つにまとめる）
    const city = m.prefecture ? m.city || UNKNOWN_CITY : ''
    const cities = tree.get(prefecture) ?? new Map<string, VendingMachine[]>()
    cities.set(city, [...(cities.get(city) ?? []), m])
    tree.set(prefecture, cities)
  }

  const groups = [...tree].map(([prefecture, cities]) => ({
    prefecture,
    count: [...cities.values()].reduce((sum, list) => sum + list.length, 0),
    cities: [...cities]
      .map(([city, list]) => ({ city, machines: list }))
      .sort((a, b) =>
        compareGroups({ name: a.city, count: a.machines.length }, { name: b.city, count: b.machines.length }, UNKNOWN_CITY),
      ),
  }))
  return groups.sort((a, b) =>
    compareGroups({ name: a.prefecture, count: a.count }, { name: b.prefecture, count: b.count }, UNKNOWN_PREFECTURE),
  )
}

// /list 登録した自販機を地域ごとにまとめ、写真つきのカードで表示する
export function ListPage() {
  const { machines, loading, error } = useVendingMachines()
  const groups = groupByArea(machines)

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

      {groups.map((group) => (
        <details key={group.prefecture} className="area-group" open>
          <summary className="area-summary">
            {group.prefecture}
            <span className="area-count">{group.count}件</span>
          </summary>
          {group.cities.map((city) =>
            city.city === '' ? (
              <MachineGrid key="" machines={city.machines} />
            ) : (
              <details key={city.city} className="city-group" open>
                <summary className="city-summary">
                  {city.city}
                  <span className="area-count">{city.machines.length}件</span>
                </summary>
                <MachineGrid machines={city.machines} />
              </details>
            ),
          )}
        </details>
      ))}
    </PageShell>
  )
}

function MachineGrid({ machines }: { machines: VendingMachine[] }) {
  return (
    <ul className="machine-grid">
      {machines.map((m) => (
        <li key={m.id}>
          <MachineCard machine={m} />
        </li>
      ))}
    </ul>
  )
}

// 押すと地図画面に移り、そのピンを選んだ状態で表示する
function MachineCard({ machine }: { machine: VendingMachine }) {
  return (
    <Link to={`/?id=${machine.id}`} className="machine-card">
      <img className="machine-card-photo" src={machine.image_url} alt="" loading="lazy" />
      <div className="machine-card-body">
        <span className="machine-card-name">{machine.name || '機種名未選択'}</span>
        <span className="date-badge">{machine.date}</span>
        <PaymentChips methods={machine.payment_methods} />
        {machine.memo && <p className="machine-card-memo">{machine.memo}</p>}
      </div>
    </Link>
  )
}
