import { googleLogout } from '@react-oauth/google'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'




const MainPage = observer(() => {

  const { user } = useContext(Context)



  return (
    <>
      <h2>test {user.userId}</h2>
      <Button onClick={()=>user.logOut()}>log out</Button>
    </>
  )

})




export default MainPage