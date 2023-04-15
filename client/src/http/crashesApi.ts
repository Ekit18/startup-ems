import { CarInfo, CrashInfo } from "../components/CrashMap";
import { $authHost, $host } from './index';
import { getAllUserIds } from "./userApi";

export const getCrashesByUserId = async (userId: number): Promise<(CrashInfo | CarInfo)[]> => {
    const { data } = await $authHost.get(`crashes/user-crashes/${userId}`);
    return data;
};
export const getAllCrashes = async (): Promise<(CrashInfo | CarInfo)[][]> => {
    const userIds: number[] = await getAllUserIds();
    return (
        Promise.all(userIds.map((userId: number) => getCrashesByUserId(userId)))
    )
};
