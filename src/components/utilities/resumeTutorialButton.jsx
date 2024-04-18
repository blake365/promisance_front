import { useTour } from '@reactour/tour'
import { Button } from '@mantine/core'

const ResumeTutorialButton = () =>
{
    const { setMeta, setCurrentStep, setIsOpen, setSteps, currentStep, isOpen, steps, meta } = useTour()
    // console.log(repeatAction)
    const handleClick = async () =>
    {
        // resume tutorial at last step
        setIsOpen(true)
    }

    console.log(currentStep, meta, isOpen)

    if (isOpen) { return null }
    if (currentStep === steps.length - 1) { return null }
    if (currentStep === 0) { return null }
    return (
        <div style={{ position: 'fixed', right: '20px', bottom: '11%', zIndex: 10 }}>
            <Button.Group>
                <Button color='green.6' variant='filled' onClick={handleClick}>
                    Resume Tutorial
                </Button>
                <Button color='gray.7' variant='filled' p='xs' onClick={() =>
                {
                    setMeta(null)
                    setSteps([])
                    setCurrentStep(0)
                }}>X</Button>
            </Button.Group>

        </div>
    )
}

export default ResumeTutorialButton