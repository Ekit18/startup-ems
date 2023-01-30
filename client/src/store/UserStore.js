import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
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

    logOut() {
        this._isAuth = false
        this._user = {} 
    }


}