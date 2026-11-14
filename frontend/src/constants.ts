export const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''

// Advanced Marker に必要なマップID。DEMO_MAP_ID は Google が提供する開発用の値
export const MAP_ID = 'DEMO_MAP_ID'

// 地図の初期表示（京都駅付近）
export const MAP_DEFAULT_CENTER = { lat: 34.987594, lng: 135.7506212 }
export const MAP_DEFAULT_ZOOM = 12

export const LOGO_URL = '/logo.svg'
export const PIN_ICON_URL = '/pin.svg'
export const CROSSHAIR_ICON_URL = '/crosshair.svg'
export const CROSSHAIR_SIZE_PX = 40
// ピンの横幅（高さは画像の縦横比に合わせて自動で決まる）
export const MAP_ICON_SIZE_PX = 32
// 選択中のピンは大きく表示して目立たせる
export const SELECTED_PIN_SIZE_PX = 48

// 画面に表示する緯度・経度の小数点以下の桁数
export const COORD_DISPLAY_DIGITS = 5

// 現在地ボタン：移動後のズームと、位置取得を諦めるまでの時間
export const CURRENT_LOCATION_ZOOM = 17
export const GEOLOCATION_TIMEOUT_MS = 10_000

// トースト通知を表示しておく時間
export const TOAST_DURATION_MS = 3_000

// 登録できる画像（バックエンドの制限と合わせる）
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
