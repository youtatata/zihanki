import { APIProvider } from '@vis.gl/react-google-maps'
import { Route, Routes } from 'react-router'
import { ToastProvider } from './components/ToastProvider'
import { GOOGLE_MAPS_API_KEY } from './constants'
import { CreatePage } from './pages/CreatePage'
import { EditMachinePage } from './pages/EditMachinePage'
import { EditPage } from './pages/EditPage'
import { HomePage } from './pages/HomePage'
import { ListPage } from './pages/ListPage'

export default function App() {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <p className="error">
        Google Maps の API キーが設定されていません。frontend/.env に VITE_GOOGLE_MAPS_API_KEY
        を設定し、開発サーバーを再起動してください。
      </p>
    )
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="ja" region="JP">
      {/* 画面を切り替えても通知が消えないよう、ルーティングの外側に置く */}
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit/:id" element={<EditMachinePage />} />
        </Routes>
      </ToastProvider>
    </APIProvider>
  )
}
