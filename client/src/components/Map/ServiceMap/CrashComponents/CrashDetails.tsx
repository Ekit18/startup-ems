/* eslint-disable no-undefined */
/* eslint-disable no-extra-parens */
import { observer } from 'mobx-react-lite'
import { Button, Col, Row } from 'react-bootstrap'
import { CarInfo, CrashInfo } from '../../UserMap/CrashMap'

interface DetailsProps {
  marker: CrashInfo | CarInfo
  index: number
  isListDetails: boolean
  handleDeleteCrashEmit: (userCarId: number) => void
  handleClickMarker: (index: number) => void
  handleChooseCarServiceModeEmit: (flag: boolean) => void
  setClickedMarker: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrCrashToChooseCarServiceFor: React.Dispatch<React.SetStateAction<CarInfo | CrashInfo | null>>
}
export const CrashDetails: React.FC<DetailsProps> = observer(
  ({
    marker,
    index,
    handleClickMarker,
    handleDeleteCrashEmit,
    isListDetails,
    handleChooseCarServiceModeEmit,
    setClickedMarker,
    setCurrCrashToChooseCarServiceFor
  }) => {
    const formattedDate = new Date(marker.date).toUTCString()
    return (
      <div onClick={isListDetails
        ? () => handleClickMarker(index)
        : undefined}>
        <hr />
        <h4>
          Crash No. {index + 1} <br />
          UserCarId: {marker.userCarId}
          <br />
          Date: {formattedDate}
          <br />
          Latitude: {(marker as Required<CrashInfo>).latLngTuple[0]}
          <br />
          Longitude: {(marker as Required<CrashInfo>).latLngTuple[1]}
          <br />
          Brand: {marker.brand}
          <br />
          Model: {marker.model}
          <br />
          BodyType: {marker.bodyType}
          <br />
          FuelType: {marker.fuelType}
          <br />
          Year: {marker.year}
          <br />
        </h4>
        <Row>
          <Col md={12} className="mb-3">
            <Button
              className="w-100"
              variant={'danger'}
              onClick={(event) => {
                event.stopPropagation()
                handleDeleteCrashEmit(marker.userCarId)
                setClickedMarker(null)
              }}
            >
              Delete
            </Button>
          </Col>
          <Col md={12} className="mb-3">
            <Button
              className="w-100"
              variant={'success'}
              onClick={() => {
                  setCurrCrashToChooseCarServiceFor(marker);
                  handleChooseCarServiceModeEmit(true);
                }
              }
            >
              Choose Car service station
            </Button>
          </Col>
        </Row>
        <hr />
      </div>
    )
  },
)
