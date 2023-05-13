import { makeAutoObservable } from "mobx";

export interface UserData {
    email?: string;
    id: number;
    roles?: UserRole[];
    iat?: number;
    exp?: number;
}

interface UserRole {
    id?: number;
    value?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    UserRoles?: {
        id?: number;
        userId?: number;
        roleId?: number;
    }
}

export default class UserStore {
    _isAuth: boolean
    _user: UserData
    constructor() {
        this._isAuth = true
        this._user = { id: -1 }
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool
    }

    setUser(user: UserData) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get userId() {
        return this._user.id
    }

    get user() {
        return this._user
    }

    isService() {
        return Boolean(this._user.roles?.find((role) => role.value === "ADMIN"))
    }

    logOut() {
        this._isAuth = false
        this._user = { id: -1 }
        localStorage.clear()
    }
}
