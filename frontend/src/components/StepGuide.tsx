export type Step = { label: string; done: boolean }

// 「① ② ③」の手順表示。終わった手順にはチェックを付け、次にやる手順を強調する
export function StepGuide({ steps }: { steps: Step[] }) {
  const currentIndex = steps.findIndex((s) => !s.done)

  return (
    <ol className="steps">
      {steps.map((step, i) => {
        const state = step.done ? 'done' : i === currentIndex ? 'current' : ''
        return (
          <li key={step.label} className={`step ${state}`}>
            <span className="step-mark" aria-hidden="true">
              {step.done ? '✓' : i + 1}
            </span>
            {step.label}
          </li>
        )
      })}
    </ol>
  )
}
