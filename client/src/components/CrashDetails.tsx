/* eslint-disable no-undefined */
/* eslint-disable no-extra-parens */
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { CarInfo, CrashInfo } from "./CrashMap"

interface DetailsProps {
    marker: CrashInfo | CarInfo,
    index: number,
    isListDetails: boolean
    handleDeleteCrashEmit: (userCarId: number) => void,
    handleClickMarker?: (index: number) => void,
}
export const CrashDetails: React.FC<DetailsProps> = observer(({ marker, index, handleClickMarker, handleDeleteCrashEmit, isListDetails }) => {
    const formattedDate = new Date(marker.date).toUTCString();
    return (
        <div onClick={isListDetails
            ? () => handleClickMarker!(index)
            : undefined}>
            <hr />
            <h4>
                Crash No. {index + 1} <br />
                UserCarId: {marker.userCarId}<br />
                Date: {formattedDate}<br />
                Latitude: {(marker as Required<CrashInfo>).latLngTuple[0]}<br />
                Longitude: {(marker as Required<CrashInfo>).latLngTuple[1]}<br />
                Brand: {marker.brand}<br />
                Model: {marker.model}<br />
                BodyType: {marker.bodyType}<br />
                FuelType: {marker.fuelType}<br />
                Year: {marker.year}<br />
            </h4>
            <Button variant={'success'} onClick={() => handleDeleteCrashEmit(marker.userCarId)}>Mark solved</Button>
            <hr />

        </div>
    )
})
