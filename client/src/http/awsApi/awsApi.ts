import { $awsHost } from "..";

export interface Part {
    id: number,
    brand: string,
    name: string,
    type: string
}
export interface StaticImage {
    url: string
    part: Part
}
export interface Static {
    partStatic: StaticImage[],
    guideStatic: StaticImage[]
}

export const getAllStatic = async (): Promise<StaticImage[]> => {
    const { data } = await $awsHost.get('parts-guides-aws');
    return data;
};

