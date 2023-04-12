import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { Socket } from "socket.io-client"

interface CrashModalProps {
    showState: boolean,
    handleClose: () => void,
    socket: Socket
}
interface Test {
    a?: number
}

export const AddCrashModal: React.FC<Test> = observer(({ a }) => {
return (
        <Modal>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
})
