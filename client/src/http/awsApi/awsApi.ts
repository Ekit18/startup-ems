import { HttpStatusCode } from "axios";
import { $awsHost } from "..";
import { ApiStatusCode } from "../../components/Aws/Aws";

export interface PartData {
    id: number,
    brand: string,
    name: string,
    type: string
}
export interface StaticImage {
    url: string,
    key: string,
    part: PartData,
    isGuide: boolean
}
export interface Static {
    partStatic: StaticImage[],
    guideStatic: StaticImage[]
}

export const getAllStatic = async (): Promise<Static> => {
    // selectedBrand, selectedType
    const { data } = await $awsHost.get('parts-guides-aws/:selectedBrand/:selectedType');
    return data;
};

export const deleteStatic = async (key: string): Promise<ApiStatusCode> => {
    try {
        const { data } = await $awsHost.delete(`parts-guides-aws/${key}`);
        return ApiStatusCode.NO_ERROR;
    } catch (error) {
        return ApiStatusCode.DELETE_ERROR;
    }
}
export const getAllBrands = async (): Promise<string[]> => {
    const { data } = await $awsHost.get('parts-guides-aws/part-brands');
    return data;
}
export interface TypeData {
    type: string
}
export const getAllPartTypes = async (selectedBrand: string): Promise<TypeData[]> => {
    const { data } = await $awsHost.get(`parts-guides-aws/part-types-of-brand/${selectedBrand}`);
    return data.filter((type: string) => type !== null);
}
export const getAllPartsByBrandAndType = async (selectedBrand: string, selectedType: string): Promise<Static> => {
    const { data } = await $awsHost.get(`parts-guides-aws/${selectedBrand}/${selectedType}`);
    return data;
}
