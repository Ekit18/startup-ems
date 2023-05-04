import { $carServiceHost } from "..";
import { CarServiceInfo } from "../../components/Map/ServiceMap/ServiceCrashMap";

type carServiceInfoNoLatLng = Omit<CarServiceInfo, 'latLngTuple'>
export async function getAllCarServices() {
    const { data } = await $carServiceHost.get('car-service');
    return data.map((carService: carServiceInfoNoLatLng) => {
        const [lat, lng] = carService.location.split(", ").map((val: string) => parseFloat(val));
        return { ...carService, latLngTuple: [lat, lng] };
    });
}

