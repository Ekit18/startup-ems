import { googleLogout } from '@react-oauth/google'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import { SocketsTest } from '../components/SocketsTest'


const MainPage:React.FC = observer(() => {
  const { user } = useContext(Context)

  return (
    <>
      <h2>user id: {user.userId}</h2>
      <Button onClick={() => user.logOut()}>log out</Button>
    </>
  )
})


export default MainPage
