import { useState, Suspense } from "react"
// const Guide = lazy(() => import('./guide'));
import Guide from "./guide";
import { Button, Modal, Title, Loader } from '@mantine/core'

const GuideModalButton = ({ pageName, empire, protection }) =>
{
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div>
            <Button compact variant='outline' onClick={() =>
            {
                setModalOpened(true)
            }}
                // rightIcon={<Compass size={18} />}
                sx={() =>
                {
                    if (empire.turnsUsed <= protection * 2) {
                        return {
                            border: '1px solid #40c057',
                            boxShadow: '0 0 2px 1px #40c057',
                            color: '#40c057',
                        }
                    }
                }
                }
                className='sixth-step'>{pageName} Guide</Button>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={<Title order={2}>Game Guide</Title>}
                centered
                overflow="inside"
                size="xl"
            >
                <Suspense fallback={<Loader size='xl' />}>
                    <Guide empire={empire} />
                </Suspense>
            </Modal>
        </div>
    )
}

export default GuideModalButton