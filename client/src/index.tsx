import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCarsStore from './store/UserCarsStore';
export const Context = createContext<{ user: UserStore, userCars: UserCarsStore }>({ user: new UserStore(), userCars: new UserCarsStore() });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <Context.Provider value={{
      user: new UserStore(),
      userCars: new UserCarsStore(),
    }}>
      <App />
    </Context.Provider>

);


