import React, { FormEvent, useContext, useState } from 'react'
import { useMultistepForm } from './hooks/useMultistepForm'
import { BrandStep } from './BrandStep'
import { observer } from 'mobx-react-lite'
import { ModelData, ModelStep } from './ModelStep'
import { YearStep } from './YearStep'
import { CarStep } from './CarStep'
import { MileageStep } from './MileageStep'
import { Context } from '../../..'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../../../utils/constants'

type FormData = {
  brandId: number
  model: string
  year: number
  carId: number
  mileage: number
}

const initialState: FormData = {
  brandId: 0,
  model: '',
  year: 0,
  carId: 0,
  mileage: 0
}


const AddUserCars = observer(() => {
  const [data, setData] = useState(initialState)
  const navigate = useNavigate()
  const { user, userCars } = useContext(Context)
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields }
    })
    next()
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <BrandStep {...data} updateFields={updateFields} />,
      <ModelStep {...data} updateFields={updateFields} />,
      <YearStep {...data} updateFields={updateFields} />,
      <CarStep {...data} updateFields={updateFields} />,
      <MileageStep {...data} updateFields={updateFields} />,
    ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) {
      return next()
    }
    userCars.addUserCars(user.userId, data.carId, data.mileage).then(() => navigate(MAIN_ROUTE))
  }

  return (
    <div
      style={{
        position: 'relative',
        background: 'white',
        padding: '2rem',
        margin: '1rem',
        borderRadius: '.5rem',
        fontFamily: 'Arial',
        maxWidth: '100%',
      }}
    >
      {isFirstStep
        ? (
          <button type="button" onClick={() => navigate(MAIN_ROUTE)}>
            Return to main menu
          </button>
        )
        : (
          <button type="button" onClick={() => back()}>
            Back
          </button>
        )}
      <form onSubmit={onSubmit}>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '.5rem',
            justifyContent: 'flex-end',
          }}
        >

          {isLastStep && <button type="submit">Finish</button>}
        </div>
      </form>
    </div>
  )
})

export default AddUserCars
