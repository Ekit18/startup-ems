import { GoogleOAuthProvider } from '@react-oauth/google';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'

import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/authApi/userApi';
import { Context } from '../index';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constants';
import GoogleAuth from './GoogleAuth';
// import { SocketsTest } from '../components/SocketsTest';

const Auth:React.FC = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password);
      }

      user.setUser(data)
      console.log(data)
      user.setIsAuth(true)
      console.log(user.isAuth)
      navigate(MAIN_ROUTE)
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        const message = error.response.data.message
        if (Array.isArray(message)) {
          message.forEach((element: { [key: string]: any }) => {
            alert(Object.values(element))
          })
        } else {
          alert(message)
        }
      } else {
        console.error(error)
        alert("An error occurred")
      }
    }
  }

  return (
<>

<Container className="d-flex justify-content-center align-items-center">
  <Row>
    <Card className="p-5 col-md-12">
      <h2 className="m-auto">{isLogin
        ? 'Authorization'
        : 'Registration'}</h2>
      <div className="d-flex justify-content-center">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID || ""}>
          <GoogleAuth />
        </GoogleOAuthProvider>
      </div>
      <Form className="d-flex flex-column">
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter your email..." className="mt-2"
        />
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter your password..." className="mt-2"
        />
        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
          {isLogin

            ? <h4>Don't have account? <NavLink to={REGISTRATION_ROUTE}>Create account</NavLink></h4>

            : <h4>Have account? <NavLink to={LOGIN_ROUTE}>Login </NavLink></h4>
          }

          <Button className="align-self-end" onClick={submit} variant={"outline-success"}>
            {isLogin
              ? 'Login'
              : 'Register'}
          </Button>
        </Row>
      </Form>
    </Card>

  </Row>

</Container>
</>


  );
});

export default Auth
