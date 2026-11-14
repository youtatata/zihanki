import type { FormEvent, ReactNode } from 'react'
import { COORD_DISPLAY_DIGITS, MEMO_MAX_LENGTH, PAYMENT_METHOD_LABELS, PAYMENT_METHODS } from '../constants'
import type { LatLng, MachineDetails, PaymentMethod } from '../types'
import { BrandField } from './BrandField'
import { ImageDropZone } from './ImageDropZone'

type Props = {
  position: LatLng
  details: MachineDetails
  onDetailsChange: (details: MachineDetails) => void
  imageUrl: string | null // 新しく選んだ写真のプレビュー、または登録済みの写真
  onImageChange: (file: File) => void
  submitLabel: string
  canSubmit: boolean
  submitting: boolean
  onSubmit: () => void
  guide?: ReactNode // フォーム上部に出す手順表示など
}

// 追加画面・編集画面で共通の入力フォーム
export function MachineForm(props: Props) {
  const { position, details, onDetailsChange, imageUrl, onImageChange } = props

  function update(patch: Partial<MachineDetails>) {
    onDetailsChange({ ...details, ...patch })
  }

  function togglePayment(method: PaymentMethod, checked: boolean) {
    const others = details.payment_methods.filter((m) => m !== method)
    update({ payment_methods: checked ? [...others, method] : others })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (props.canSubmit && !props.submitting) props.onSubmit()
  }

  return (
    <form className="machine-form" onSubmit={handleSubmit}>
      {props.guide}

      <dl className="coords">
        <dt>緯度</dt>
        <dd>{position.lat.toFixed(COORD_DISPLAY_DIGITS)}</dd>
        <dt>経度</dt>
        <dd>{position.lng.toFixed(COORD_DISPLAY_DIGITS)}</dd>
      </dl>

      <ImageDropZone previewUrl={imageUrl} onFileChange={onImageChange} />

      <label className="field">
        <span className="field-label">登録日</span>
        <input type="date" required value={details.date} onChange={(e) => update({ date: e.target.value })} />
      </label>

      <BrandField value={details.name} onChange={(name) => update({ name })} />

      <fieldset className="field">
        <legend className="field-label">支払い方法（任意）</legend>
        <div className="checkbox-group">
          {PAYMENT_METHODS.map((method) => (
            <label key={method} className="checkbox-chip">
              <input
                type="checkbox"
                checked={details.payment_methods.includes(method)}
                onChange={(e) => togglePayment(method, e.target.checked)}
              />
              {PAYMENT_METHOD_LABELS[method]}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span className="field-label">メモ（任意）</span>
        <textarea
          rows={3}
          maxLength={MEMO_MAX_LENGTH}
          placeholder="例：冷たいおしるこがある"
          value={details.memo}
          onChange={(e) => update({ memo: e.target.value })}
        />
      </label>

      <button type="submit" className="button primary" disabled={!props.canSubmit || props.submitting}>
        {props.submitting ? '保存中…' : props.submitLabel}
      </button>
    </form>
  )
}
