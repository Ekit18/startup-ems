import { $carServiceHost } from "..";
import { CarOperationItem } from "../../pages/RepairSigning";

export const getAllCarOperations = async (): Promise<CarOperationItem[]> => {
    const { data } = await $carServiceHost.get('car-operation');
    return data;
};
