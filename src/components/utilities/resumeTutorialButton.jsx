import { useState } from 'react'
import { useTour } from '@reactour/tour'
import { Button } from '@mantine/core'

const ResumeTutorialButton = ({ empire, kickOut }) =>
{
    const [loading, setLoading] = useState(false)
    const { meta, setCurrentStep, setIsOpen, setSteps, currentStep, isOpen, steps } = useTour()
    // console.log(repeatAction)
    const handleClick = async () =>
    {
        // resume tutorial at last step
        setIsOpen(true)
    }

    // console.log(currentStep, meta, isOpen)

    if (isOpen) { return null }
    if (currentStep === steps.length - 1) { return null }
    if (currentStep === 0) { return null }
    return (
        <div style={{ position: 'fixed', right: '20px', bottom: '11%', zIndex: 10 }}>
            <Button color='green.5' radius='xl' variant='filled' onClick={handleClick} loading={loading}>
                Resume Tutorial
            </Button>
        </div>
    )
}

export default ResumeTutorialButton