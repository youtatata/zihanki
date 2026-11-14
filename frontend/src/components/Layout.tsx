import type { ReactNode } from 'react'
import { Link } from 'react-router'

export type NavLink = { to: string; label: string }

type Props = {
  mapTitle: string
  map: ReactNode
  panelTitle: string
  panel: ReactNode
  links: NavLink[]
  error?: string | null
}

// 全画面共通の「地図 + 右パネル + 下部リンク」レイアウト
export function Layout({ mapTitle, map, panelTitle, panel, links, error }: Props) {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/">自販機マップ</Link>
      </header>

      {error && <p className="error">{error}</p>}

      <main className="app-main">
        <section className="card map-card">
          <h2 className="card-title">{mapTitle}</h2>
          {map}
        </section>
        <section className="card panel-card">
          <h2 className="card-title">{panelTitle}</h2>
          <div className="card-body">{panel}</div>
        </section>
      </main>

      <nav className="app-nav">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="button">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
