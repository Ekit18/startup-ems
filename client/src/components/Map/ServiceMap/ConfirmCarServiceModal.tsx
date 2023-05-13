import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { CarServiceInfo } from "./ServiceCrashMap";
import { observer } from "mobx-react-lite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from "lodash";
import { useState } from 'react';


interface DetailsProps {
   handleConfirm: () => void,
//    show: boolean
}
export const CarServiceDetails: React.FC<DetailsProps> = observer(({ handleConfirm }: DetailsProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Car Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure in this Car Service?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ () => {
                        handleConfirm();
                        handleClose();
                        }
                    }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
})
