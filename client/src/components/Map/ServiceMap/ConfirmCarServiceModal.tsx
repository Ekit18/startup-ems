import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { CarServiceInfo } from "./ServiceCrashMap";
import { observer } from "mobx-react-lite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from "lodash";
import { CrashInfo, CarInfo } from "../UserMap/CrashMap";
import { DIAGNOSTIC_OPERATION } from "../../../utils/constants";
import { postCarHistory } from "../../../http/carServiceApi/repairsHistoryApi";


interface DetailsProps {
   handleDeleteCrashEmit: (userCarId: number) => void,
   currCrashToChooseCarServiceFor: CarInfo | CrashInfo,
   currCarService: CarServiceInfo
   setShow: (flag:boolean) => void,
   setChooseServiceMode: (flag:boolean) => void,
   show: boolean,
}
export const ConfirmCarServiceModal: React.FC<DetailsProps> = observer(({ currCarService, setChooseServiceMode, handleDeleteCrashEmit, currCrashToChooseCarServiceFor, setShow, show }) => {
    const handleClose = () => {
        handleDeleteCrashEmit(currCrashToChooseCarServiceFor.userCarId);
        postCarHistory(currCrashToChooseCarServiceFor.userCarId, currCarService.id, DIAGNOSTIC_OPERATION)
        setShow(false);
        setChooseServiceMode(false);
    }
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
