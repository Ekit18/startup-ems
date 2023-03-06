import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"


export const registration = async (email,password) => {
    
    const {data} = await $host.post('auth/registration',{email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}

export const login = async (email,password) => {
    const {data} = await $host.post('auth/login',{email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}

export const googleLogin = async (code) => {
    const {data} = await $host.get('auth/google/redirect',{params: {code}})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('auth/check')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}