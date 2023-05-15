import { CrashMap } from './components/Map/UserMap/CrashMap';
import { ServiceCrashMap } from "./components/Map/ServiceMap/ServiceCrashMap"
import Auth from "./pages/Auth"
import MainPage from "./pages/MainPage"
import { Redirect } from "./pages/Redirect"
import { RepairSigning } from "./pages/RepairSigning"
import {
    ADD_USER_CARS_ROUTE,
    AWS_STATIC_FILES_ROUTE,
    CHAT_GPT_ROUTE,
    GOOGLE_REDIRECT_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    SERVICE_MAP_ROUTE,
    USER_MAP_ROUTE,
    REPAIR_SIGNING,
    USER_SIGNING
} from "./utils/constants"
import AddUserCars from './components/UserCars/AddUserCars/AddUserCars';
import { ChatPage } from './components/ChatGPT/ChatPage';
import { AwsComponent } from './components/Aws/Aws';
import { UserRepairSigning } from './pages/UserRepairSigning';

export const authRoutes = [
    {
        path: CHAT_GPT_ROUTE,
        Component: ChatPage
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: USER_MAP_ROUTE,
        Component: CrashMap
    },
    {
        path: ADD_USER_CARS_ROUTE,
        Component: AddUserCars
    },
    {
        path: USER_SIGNING,
        Component: UserRepairSigning
    }
]


export const roleAuthRoutes = [
    {
        path: SERVICE_MAP_ROUTE,
        Component: ServiceCrashMap
    },
    {
        path: AWS_STATIC_FILES_ROUTE,
        Component: AwsComponent
    },
    {
        path: REPAIR_SIGNING,
        Component: RepairSigning
    },
    {
        path: `${REPAIR_SIGNING}/:id`,
        Component: RepairSigning
    }
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
