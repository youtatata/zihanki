import { NavLink } from 'react-router'
import { LOGO_URL } from '../constants'

const TABS = [
  { to: '/', label: 'マップ' },
  { to: '/list', label: '一覧' },
  { to: '/create', label: '追加' },
  { to: '/edit', label: '編集' },
]

// ロゴと画面切り替えタブ
export function AppHeader() {
  return (
    <header className="app-header">
      <span className="app-title">
        <img className="app-logo" src={LOGO_URL} alt="" />
        自販機マップ
      </span>
      <nav className="tabs">
        {TABS.map((tab) => (
          // NavLink は表示中の画面のリンクに active クラスを付ける。
          // 「マップ」だけは完全一致にし、/edit/1 などでは「編集」を光らせる
          <NavLink key={tab.to} to={tab.to} end={tab.to === '/'} className="tab">
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
