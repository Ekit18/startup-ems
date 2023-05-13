import { CrashMap } from './components/Map/UserMap/CrashMap';
import { ServiceCrashMap } from "./components/Map/ServiceMap/ServiceCrashMap"
import Auth from "./pages/Auth"
import MainPage from "./pages/MainPage"
import { Redirect } from "./pages/Redirect"
import { RepairSigning } from "./pages/RepairSigning"
import {
    ADD_USER_CARS_ROUTE,
    GOOGLE_REDIRECT_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    REPAIR_SIGNING_ROUTE,
    SERVICE_MAP_ROUTE,
    USER_MAP_ROUTE,
} from "./utils/constants"
import AddUserCars from './components/UserCars/AddUserCars/AddUserCars';

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: REPAIR_SIGNING_ROUTE,
        Component: RepairSigning
    },
    {
        path: USER_MAP_ROUTE,
        Component: CrashMap
    },
    {
        path: ADD_USER_CARS_ROUTE,
        Component: AddUserCars
    },
]


export const roleAuthRoutes = [
    {
        path: SERVICE_MAP_ROUTE,
        Component: ServiceCrashMap
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
        path: GOOGLE_REDIRECT_ROUTE,
        Component: Redirect
    },
]
