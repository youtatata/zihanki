export const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''

// Advanced Marker に必要なマップID。DEMO_MAP_ID は Google が提供する開発用の値
export const MAP_ID = 'DEMO_MAP_ID'

// 地図の初期表示（京都駅付近）
export const MAP_DEFAULT_CENTER = { lat: 34.987594, lng: 135.7506212 }
export const MAP_DEFAULT_ZOOM = 12

export const PIN_ICON_URL = '/hata.png'
export const CROSSHAIR_ICON_URL = '/icon.png'
export const MAP_ICON_SIZE_PX = 32

// 画面に表示する緯度・経度の小数点以下の桁数
export const COORD_DISPLAY_DIGITS = 5
