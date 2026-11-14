import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'

type Props = {
  mapTitle: string
  map: ReactNode
  panelTitle: string
  panel: ReactNode
  // 狭い画面で下部パネルを開いているか（広い画面では常に表示）
  panelOpen: boolean
  onPanelOpenChange: (open: boolean) => void
  error?: string | null
}

// 地図を使う画面共通の「ヘッダー + 地図 + パネル」レイアウト
export function Layout({ mapTitle, map, panelTitle, panel, panelOpen, onPanelOpenChange, error }: Props) {
  return (
    <div className="app">
      <AppHeader />

      {error && <p className="error">{error}</p>}

      <main className="app-main">
        <section className="card map-card">
          <h2 className="card-title">{mapTitle}</h2>
          {map}
        </section>
        <section className={`card panel-card${panelOpen ? ' is-open' : ''}`}>
          {/* 広い画面では見出し、狭い画面では開閉ボタンを出す（CSSで切り替え） */}
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
