
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import { check } from './http/userApi';
import AppRouter from './components/AppRouter';
import './style.css';

const App = observer(()=> {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return <h2>loading</h2>
  }

  return (
   
    <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
  );
})

export default App;