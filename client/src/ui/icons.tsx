
import { ReactComponent as Google } from './google.svg'
import Service from './service.svg'
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

export const GoogleIcon = () => {
    return (
        <Google />
    )
}


export const CrashIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});


export const ServiceIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: Service,
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});
