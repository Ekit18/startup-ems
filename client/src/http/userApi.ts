import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';
import { UserData } from '../store/UserStore';


export const registration = async (email: string, password: string): Promise<UserData> => {
    const { data } = await $host.post('auth/registration', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (email: string, password: string): Promise<UserData> => {
    const { data } = await $host.post('auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const googleLogin = async (code: string): Promise<UserData> => {
    const { data } = await $host.get('auth/google/redirect', { params: { code } });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async (): Promise<UserData> => {
    const { data } = await $authHost.get('auth/check');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const getAllUserIds = async (): Promise<number[]> => {
    const { data } = await $authHost.get('user-cars/all-users/');
    return data;
};
