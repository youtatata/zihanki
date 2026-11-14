import type { Area, PaymentMethod } from './types'

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
// まとめ表示の丸を、個別のピンより手前に出す
export const CLUSTER_Z_INDEX = 1000
// 一覧から選んだとき・編集するときの地図の拡大率
export const FOCUS_ZOOM = 17

// 画面に表示する緯度・経度の小数点以下の桁数
export const COORD_DISPLAY_DIGITS = 5

// 現在地ボタン：移動後のズームと、位置取得を諦めるまでの時間
export const CURRENT_LOCATION_ZOOM = 17
export const GEOLOCATION_TIMEOUT_MS = 10_000

// トースト通知を表示しておく時間
export const TOAST_DURATION_MS = 3_000

// 詳細情報（バックエンドの制限と合わせる）
export const NAME_MAX_LENGTH = 50
export const MEMO_MAX_LENGTH = 500
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: '現金',
  ic: '交通系IC・電子マネー',
  qr: 'QRコード',
  credit: 'クレジット',
}
export const PAYMENT_METHODS = Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]

// 機種名の選択肢。ここにないものは「その他」で自由に入力する
export const MACHINE_BRANDS = [
  'コカ・コーラ',
  'サントリー（BOSS）',
  'キリン',
  'アサヒ',
  'ダイドー',
  '伊藤園',
  'ポッカサッポロ',
  '大塚製薬',
  'チェリオ',
  'アペックス（カップ式）',
]

// 地域を調べられなかったときの値（一覧では「地域未設定」にまとめる）
export const EMPTY_AREA: Area = { prefecture: '', city: '' }

// 登録できる画像（バックエンドの制限と合わせる）
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
