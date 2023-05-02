import { $carServiceHost } from "..";

export async function getAllCarServices() {
    const { data } = await $carServiceHost.get('car-operation');
    return data;
}

