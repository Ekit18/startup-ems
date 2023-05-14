import { $carServiceHost } from "..";
import { RepairHistoryData } from "../../components/UserCars/UserCars";
import { RepairHistoryStrippedData } from "../../components/RepairSigning/RepairSigningUnsignedItem";

export const getAllCarHistoryByUserUserCarId = async (userCarId: number): Promise<RepairHistoryData[]> => {
    const { data } = await $carServiceHost.get(`repairs-history/all-car-history/${userCarId}`);
    return data;
};
export const postCarHistory = async (userCarId: number, carServiceId: number, carOperationId: number): Promise<RepairHistoryData[]> => {
    const { data } = await $carServiceHost.post(`repairs-history/begin-service`, { userCarId, carServiceId, carOperationId, isSigned: false });
    return data;
};

export const getAllUnsignedCarServiceHistory = async (carServiceId: number): Promise<RepairHistoryStrippedData[]> => {
    const { data } = await $carServiceHost.get(`repairs-history/car-service-unsigned-history/${carServiceId}`);
    return data;
}

export const postAllSignedCarHistory = async (userCarId: number, carServiceId: number, initialRepairHistoryId:number, carOperationIds: number[]): Promise<RepairHistoryStrippedData[]> => {
    const { data } = await $carServiceHost.post(`repairs-history/end-service`, { userCarId, carServiceId, carOperationIds, isSigned: true, initialRepairHistoryId });
    return data;
}
