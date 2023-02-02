import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'


const MainPage = observer(() => {

  const {user} = useContext(Context)
  
  return (
<>
<h2>test {user.userId}</h2>
</>
  )
  
})




export default MainPage