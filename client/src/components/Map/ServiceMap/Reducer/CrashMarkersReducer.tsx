import { CarInfo, CrashInfo } from "../../UserMap/CrashMap";
import { Socket } from "socket.io-client";
import { CrashModalState } from "../ServiceCrashMap";
import { ModalData } from "../ServiceAddCrashModal";

interface CrashMarkersAction {
    data?: (CrashInfo | CarInfo)[],
    crashInfo?: CrashInfo
    userCarId?: number;
    socket?: Socket;
    crashModal?: CrashModalState
    modalData?: ModalData;
}
export function crashMarkersInit(
    setCrashMarkers: React.Dispatch<(CrashInfo | CarInfo)[]>,
    action: Required<Pick<CrashMarkersAction, 'data'>>
) {
    if (action.data) {
        setCrashMarkers(action.data)
    }
}

export function crashMarkersUserAdded(
    setCrashMarkers: CallableFunction,
    action: Required<Pick<CrashMarkersAction, 'crashInfo'>>
) {
    if (!action.crashInfo) {
        return
    }
    console.log("ADD!")
    const [lat, lng] = action.crashInfo.location.split(" ").map((val) => parseFloat(val));
    action.crashInfo.latLngTuple = [lat, lng]
    setCrashMarkers(
        (prevState: (CrashInfo | CarInfo)[]) => [...prevState, action.crashInfo!] as (CrashInfo | CarInfo)[]
    )
}

export function crashMarkersUserDeleted(
    setCrashMarkers: CallableFunction,
    action: Required<Pick<CrashMarkersAction, 'userCarId'>>
) {
    if (!action.userCarId) {
        return
    }
    console.log("DELETE!")
    setCrashMarkers((prevState: (CrashInfo | CarInfo)[]) => {
        return prevState.map((carOrCrash: (CrashInfo | CarInfo)) => {
            if (carOrCrash.userCarId !== action.userCarId) {
                return { ...carOrCrash };
            }
            return ({
                ...carOrCrash, location: '', description: '', latLngTuple: []
            });
        })
    })
}

export function crashMarkersHandleAdd(
    setCrashMarkers: CallableFunction,
    action: Required<Pick<CrashMarkersAction, 'modalData' | 'crashModal' | 'socket'>>
) {
    if (!action.crashModal || !action.modalData) {
        return
    }
    const location = action.crashModal.latLngTuple.join(", ")
    let createdAt: Date = new Date();
    action.socket?.emitWithAck('user_add_crash', { ...action.modalData, location })!.then(
        (dateStr) => {
            createdAt = new Date(dateStr)
        }
    )
    console.log(createdAt)
    setCrashMarkers((prevState: (CrashInfo | CarInfo)[]) => {
        return prevState.map((carOrCrash) => {
            if (carOrCrash.userCarId !== action.modalData.userCarId) {
                return { ...carOrCrash };
            }
            return {
                ...carOrCrash,
                description: action.modalData.description,
                location,
                latLngTuple: action.crashModal.latLngTuple,
                date: createdAt
            };
        })
    })
}

export function crashMarkersHandleDelete(
    setCrashMarkers: CallableFunction,
    action: Required<Pick<CrashMarkersAction, 'socket' | 'userCarId'>>
) {
    if (!action.userCarId || !action.socket) {
        return
    }
    action.socket?.emit('user_delete_crash', action.userCarId)
    setCrashMarkers((oldMarkers: (CrashInfo | CarInfo)[]) => {
        return oldMarkers.map((carOrCrash) => {
            if (carOrCrash.userCarId !== action.userCarId) {
                return { ...carOrCrash };
            }
            return {
                ...carOrCrash, location: '', description: '', latLngTuple: []
            };
        })
    })
}
