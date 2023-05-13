import { $carHost } from "..";
import { BrandData } from "../../components/UserCars/AddUserCars/BrandStep";

export const getAllBrands = async (): Promise<BrandData[]> => {
    const { data } = await $carHost.get('brand');
    return data;
};
