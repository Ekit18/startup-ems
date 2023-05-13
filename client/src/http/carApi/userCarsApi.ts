import { $carHost } from "..";
import { UserCarData } from "../../store/UserCarsStore";

export const getAllUserIds = async (): Promise<number[]> => {
    const { data } = await $carHost.get('user-cars/all-users/');
    return data;
};


export const fetchUserCars = async (userId: number): Promise<UserCarData[]> => {
    const { data } = await $carHost.get(`user-cars/all-cars/${userId}`);
    return data;
}


export const deleteUserCars = async (userId: number, carId: number) => {
    const { data } = await $carHost.delete(`user-cars/${userId}/cars/${carId}`);
    return data;
}

export const changeUserCars = async (userId: number, carId: number, carMileage: number): Promise<UserCarData[]> => {
    const { data } = await $carHost.put(`user-cars/${userId}/cars/${carId}`, { carMileage });
    return data;
}


export const addUserCars = async (userId:number, carId: number, carMileage: number): Promise<UserCarData> => {
    const { data } = await $carHost.post("user-cars/", { userId, carId, carMileage });
    return data;
};

