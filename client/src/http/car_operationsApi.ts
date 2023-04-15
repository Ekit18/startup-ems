import { $authHost } from ".";
import { CarOperationItem } from "../pages/RepairSigning";

export const getAllCarOperations = async (): Promise<CarOperationItem[]> => {
    const { data } = await $authHost.get('car-operation');
    return data;
};
