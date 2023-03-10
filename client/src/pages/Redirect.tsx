import { useContext, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "..";
import { googleLogin } from "../http/userApi";
import { UserData } from "../store/UserStore";
import { MAIN_ROUTE } from "../utils/constants";

export const Redirect = () => {
    const [searchParams] = useSearchParams();
    const { user } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        googleLogin(searchParams.get('code') || "").then((data: UserData) => {
            user.setUser(data)
            console.log(data)
            user.setIsAuth(true)
            console.log(user.isAuth)
            navigate(MAIN_ROUTE)
        })
    }, [navigate, searchParams, user])

    return (
        <h2>Redirecting</h2>
    );
}
