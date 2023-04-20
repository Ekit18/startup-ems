import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import { check } from './http/userApi';
import AppRouter from './components/AppRouter';
import { UserData } from './store/UserStore';

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return setLoading(false)
        }
        check().then((data: UserData) => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <h2>loading</h2>
    }

    return (
        <React.StrictMode>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </React.StrictMode>
    );
})

export default App;
