import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'

// 地図を使わない画面（一覧など）の外枠
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <AppHeader />
      <main className="page">{children}</main>
    </div>
  )
}
