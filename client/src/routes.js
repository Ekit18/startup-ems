import Auth from "./pages/Auth"
import MainPage from "./pages/MainPage"
import {  LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE,} from "./utils/constants"

export const authRoutes = [
{
    path: MAIN_ROUTE,
    Component: MainPage
},
]


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },  
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]