import { Link } from 'react-router'

type Props = {
  loading: boolean
  isEmpty: boolean
}

// 地図の上に重ねる「読み込み中」「登録0件」の案内（MapView の children に渡す）
export function MapNotice({ loading, isEmpty }: Props) {
  if (loading) {
    return <div className="map-notice">読み込み中…</div>
  }
  if (isEmpty) {
    return (
      <div className="map-notice">
        <p>まだ登録がありません</p>
        <Link to="/create" className="button primary">
          追加する
        </Link>
      </div>
    )
  }
  return null
}
