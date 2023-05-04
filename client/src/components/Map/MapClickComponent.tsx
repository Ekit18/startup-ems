import { useMapEvents } from "react-leaflet";
import { CrashModalState } from "./ServiceMap/ServiceCrashMap";

interface ClickInterface {
    clickedMarker: number | null,
    setCrashModal: React.Dispatch<React.SetStateAction<CrashModalState>>
}
export const MapClickComponent: React.FC<ClickInterface> = ({ clickedMarker, setCrashModal }) => {
    const map = useMapEvents({
        click: (e) => {
            if (clickedMarker === null) {
                setCrashModal({ show: true, latLngTuple: [e.latlng.lat, e.latlng.lng] })
            }
        }
    });
    return null;
}
