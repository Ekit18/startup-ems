import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
  } from "react-simple-maps";

interface MapProps {

}

const geoUrl = 'https://parts-guides.s3.eu-central-1.amazonaws.com/ua.json';

export const Map: React.FC<MapProps> = observer(({}) => {
    return (
        <ComposableMap projection="geoAlbers">
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) =>
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#DDD"
                            stroke="#FFF"
                        />
                    )
                }
            </Geographies>
            <Marker coordinates={[-74.006, 40.7128]}>
                <circle r={8} fill="#F53" />
            </Marker>
        </ComposableMap>
    );
})
