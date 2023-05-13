import { $carHost } from "..";
import { CarData } from "../../components/Car/CreateCarModal";
import { ModelData } from "../../components/UserCars/AddUserCars/ModelStep";
import { YearData } from "../../components/UserCars/AddUserCars/YearStep";
import { UserCarData } from "../../store/UserCarsStore";

export const getAllModelsByBrandId = async (brandId: number): Promise<ModelData[]> => {
    const { data } = await $carHost.get(`car/brand/${brandId}`);
    return data;
};


export const getAllYearsByBrandIdAndModel = async (brandId: number, model: string): Promise<YearData[]> => {
    const { data } = await $carHost.get(`car/years/brand/${brandId}/model/${model}`);
    return data;
};


export const getAllCarsByBrandAndModelAndYear = async (brandId: number, model: string, year: number): Promise<UserCarData[]> => {
    const { data } = await $carHost.get(`car/brand/${brandId}/model/${model}/year/${year}`);
    return data;
};

export const createCar = async ({ ...params }: CarData): Promise<CarData> => {
    const { data } = await $carHost.post(`car`, { ...params });
    return data;
}
