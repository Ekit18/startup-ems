import Auth from "./pages/Auth"
import MainPage from "./pages/MainPage"
import { Redirect } from "./pages/Redirect"
import {  GOOGLE_REDIRECT_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE,} from "./utils/constants"

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
    },
    {
        path:GOOGLE_REDIRECT_ROUTE,
        Component: Redirect
    },
]