/* eslint-disable no-extra-parens */
import { CarInfo, CrashInfo } from "../../components/Map/UserMap/CrashMap";
import { getAllUserIds } from "../carApi/userCarsApi";
import { $carServiceHost } from '../index';

export const getCrashesByUserId = async (userId: number): Promise<(CrashInfo | CarInfo)[]> => {
    const { data } = await $carServiceHost.get(`crashes/user-crashes/${userId}`);
    console.log(data)
    const dataWithLatLng: Required<CrashInfo | CarInfo>[] = data.map(
        (crash: CrashInfo | CarInfo) => {
            if ((crash as CrashInfo).location) {
                const [lat, lng] = (crash as CrashInfo).location.split(" ").map((val) => parseFloat(val));
                return { ...crash, latLngTuple: [lat, lng] };
            }
            return crash;
        })
    return dataWithLatLng;
};
export const getAllCrashes = async (): Promise<Required<CrashInfo | CarInfo>[]> => {
    const userIds: number[] = await getAllUserIds();
    const data = await Promise.all(userIds.map((userId: number) => getCrashesByUserId(userId)))

    const dataFlattened = data.flat()
    const dataWithLatLng: Required<CrashInfo | CarInfo>[] = dataFlattened.map(
        (crash) => {
            if ((crash as CrashInfo).location) {
                const [lat, lng] = (crash as CrashInfo).location.split(" ").map((val) => parseFloat(val));
                return { ...crash, latLngTuple: [lat, lng] };
            }
            return crash;
        })
    return dataWithLatLng;
};
