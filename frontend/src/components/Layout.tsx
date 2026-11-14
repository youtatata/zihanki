import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { LOGO_URL } from '../constants'

const TABS = [
  { to: '/', label: 'マップ' },
  { to: '/create', label: '追加' },
  { to: '/edit', label: '編集' },
]

type Props = {
  mapTitle: string
  map: ReactNode
  panelTitle: string
  panel: ReactNode
  // スマホ表示で下部パネルを開いているか（PC表示では常に表示）
  panelOpen: boolean
  onPanelOpenChange: (open: boolean) => void
  error?: string | null
}

// 全画面共通の「ヘッダー + 地図 + パネル」レイアウト
export function Layout({ mapTitle, map, panelTitle, panel, panelOpen, onPanelOpenChange, error }: Props) {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-title">
          <img className="app-logo" src={LOGO_URL} alt="" />
          自販機マップ
        </span>
        <nav className="tabs">
          {TABS.map((tab) => (
            // NavLink は表示中の画面のリンクに active クラスを付ける
            <NavLink key={tab.to} to={tab.to} end className="tab">
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {error && <p className="error">{error}</p>}

      <main className="app-main">
        <section className="card map-card">
          <h2 className="card-title">{mapTitle}</h2>
          {map}
        </section>
        <section className={`card panel-card${panelOpen ? ' is-open' : ''}`}>
          {/* PC表示では見出し、スマホ表示では開閉ボタンを出す（CSSで切り替え） */}
          <h2 className="card-title panel-heading">{panelTitle}</h2>
          <button
            type="button"
            className="card-title sheet-toggle"
            aria-expanded={panelOpen}
            onClick={() => onPanelOpenChange(!panelOpen)}
          >
            {panelTitle}
            <span className="sheet-toggle-icon" aria-hidden="true">
              {panelOpen ? '▼' : '▲'}
            </span>
          </button>
          <div className="card-body">{panel}</div>
        </section>
      </main>
    </div>
  )
}
