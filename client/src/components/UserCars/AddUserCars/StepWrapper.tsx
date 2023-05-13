import { ReactNode } from 'react'

type StepWrapperProps = {
  title: string
  children: ReactNode
}

export function StepWrapper({ title, children }: StepWrapperProps) {
  return (
    <>
      <h2 style={{ textAlign: 'center', margin: 0, marginBottom: '2rem' }}>
        {title}
      </h2>
      <div
        style={{

        }}
      >
        {children}
      </div>
    </>
  )
}
