import { $carHost } from "..";

export const getAllUserIds = async (): Promise<number[]> => {
    const { data } = await $carHost.get('user-cars/all-users/');
    return data;
};
