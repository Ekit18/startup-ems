import React, { FormEvent, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'react-bootstrap'
import { BrandStep } from './AwsSteps/BrandStep'
// import { NameStep } from './AwsSteps/NameStep'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../../utils/constants'
import { useMultistepForm } from '../UserCars/AddUserCars/hooks/useMultistepForm'
import { TypeStep } from './AwsSteps/TypeStep'
import { NameStep } from './AwsSteps/NameStep'
import { Context } from '../..'


export enum ApiStatusCode {
    DELETE_ERROR = -1,
    NO_ERROR = 0
}

export interface FormData {
    brand: string,
    type: string
}

const initialState: FormData = {
    brand: '',
    type: ''
}
export const AwsComponent: React.FC = observer(() => {
    const [data, setData] = useState<FormData>(initialState)
    const navigate = useNavigate()
    function updateFields(fields: Partial<FormData>) {
        setData((prev) => {
            return { ...prev, ...fields }
        })
        next()
    }
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
        useMultistepForm([
            <BrandStep updateFields={updateFields} />,
            <TypeStep updateFields={updateFields} selectedBrand={data.brand} />,
            <NameStep updateFields={updateFields} selectedBrand={data.brand} selectedType={data.type} />
        ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) {
            return next()
        }
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
                </div>
            </form>
        </div>

    )
})

