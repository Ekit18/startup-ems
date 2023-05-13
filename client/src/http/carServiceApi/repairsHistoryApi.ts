import { $carServiceHost } from "..";
import { RepairHistoryData } from "../../components/UserCars/UserCars";


export const getAllCarHistoryByUserUserCarId = async (userCarId: number): Promise<RepairHistoryData[]> => {
    const { data } = await $carServiceHost.get(`repairs-history/all-car-history/${userCarId}`);
    return data;
};
