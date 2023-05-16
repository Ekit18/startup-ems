import { $partsHost } from ".."
import { PartData } from "../awsApi/awsApi"

export const getAllParts = async (): Promise<PartData[]> => {
    const { data } = await $partsHost.get('parts')
    return data;
}
