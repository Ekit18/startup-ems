import { CrashInfo } from "../components/CrashMap";
import { $authHost, $host } from './index';

export const getCrashesByUserId = async (userId: number): Promise<CrashInfo[]> => {
    const { data } = await $authHost.get(`crashes/user-crashes/${userId}`);
    return data;
};