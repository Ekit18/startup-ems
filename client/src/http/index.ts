import axios from "axios";


const $host = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_URL
})

const $awsHost = axios.create({
    baseURL: process.env.REACT_APP_AWS_API_URL
})

const $carHost = axios.create({
    baseURL: process.env.REACT_APP_CAR_API_URL
})

const $carServiceHost = axios.create({
    baseURL: process.env.REACT_APP_CAR_SERVICE_API_URL
})

const $chatGptHost = axios.create({
    baseURL: process.env.REACT_APP_CHAT_GPT_API_URL
})

const $partsHost = axios.create({
    baseURL: process.env.REACT_APP_PARTS_API_URL
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$awsHost.interceptors.request.use(authInterceptor)
$carHost.interceptors.request.use(authInterceptor)
$carServiceHost.interceptors.request.use(authInterceptor)
$chatGptHost.interceptors.request.use(authInterceptor)
$partsHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $authHost,
    $awsHost,
    $carHost,
    $carServiceHost,
    $chatGptHost,
    $partsHost
}
