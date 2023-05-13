import { $carServiceHost } from "..";
import { RepairHistoryData } from "../../components/UserCars/UserCars";


export const getAllCarHistoryByUserUserCarId = async (userCarId: number): Promise<RepairHistoryData[]> => {
    const { data } = await $carServiceHost.get(`repairs-history/all-car-history/${userCarId}`);
    return data;
};
export const postCarHistory = async (userCarId: number, carServiceId: number, carOperationId: number): Promise<RepairHistoryData[]> => {
    const { data } = await $carServiceHost.post(`repairs-history/begin-service`, { userCarId, carServiceId, carOperationId, isSigned: true });
    return data;
};
