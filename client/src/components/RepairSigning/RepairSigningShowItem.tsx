import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import io, { Socket } from 'socket.io-client'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { CarOperationItem } from '../../pages/RepairSigning'
import { getAllCarOperations } from '../../http/carServiceApi/carOperationsApi'

interface RepairSigningShowItemProps {
  item: CarOperationItem
  isSigning: boolean
  handleCarOperationDelete: (id: number) => void
}

export const RepairSigningShowItem: React.FC<RepairSigningShowItemProps> =
  observer(({ item, handleCarOperationDelete, isSigning }) => {
    return (
      <>
        <Container>
          <Row>
            <Col md={12} className="d-flex justify-content-between">
              <h2>{item.name}</h2>
              <h2>{item.price}</h2>
              <Button
                disabled={isSigning}
                onClick={() => handleCarOperationDelete(item.id)}
              >
                delete
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    )
  })
