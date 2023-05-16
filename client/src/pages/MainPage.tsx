import { googleLogout } from '@react-oauth/google'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
// import { SocketsTest } from '../components/SocketsTest'
import { RepairSigning } from './RepairSigning'
import { UserCars } from '../components/UserCars/UserCars'
import { CreateCar } from '../components/Car/CreateCar'
import { useNavigate } from 'react-router-dom'
import { AWS_STATIC_FILES_ROUTE, CHAT_GPT_ROUTE, SERVICE_MAP_ROUTE, USER_MAP_ROUTE, REPAIR_SIGNING, AWS_ADD_STATIC_FILE_ROUTE } from '../utils/constants'


const MainPage: React.FC = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  return (
    <>
      <h2>user id: {user.userId}</h2>
      <Button onClick={() => user.logOut()} className="me-5 ms-3">log out</Button>
      <Button variant="danger" onClick={() => navigate(SERVICE_MAP_ROUTE)} className="me-5">Service map</Button>
      <Button onClick={() => navigate(USER_MAP_ROUTE)} className="me-5">User map</Button>
      <Button onClick={() => navigate(CHAT_GPT_ROUTE)} className="me-5">Chat Page</Button>
      <Button variant="danger" onClick={() => navigate(AWS_STATIC_FILES_ROUTE)} className="me-5">AWS Static Files Page</Button>
      <Button variant="danger" onClick={() => navigate(AWS_ADD_STATIC_FILE_ROUTE)} className="me-5">AWS Add Static File Page</Button>
      <Button variant="danger" onClick={() => navigate(REPAIR_SIGNING)} className="me-5">Repair Signing</Button>
      <hr />
      <UserCars />
      {/* <RepairSigning/> */}
      <CreateCar />
    </>
  )
})


export default MainPage
