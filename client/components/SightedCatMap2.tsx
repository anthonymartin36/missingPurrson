import react, {useState} from "react"

import {GoogleMap, useJsApiLoader} from "@react-google-maps/api"
import {AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps" // useApiIsLoaded, useApiLoadingStatus, APILoadingStatus, useAdvancedMarkerRef,

const libraries = ["places"] as any[]

export default function SightedCatMap2 () {
    const position = {lat: -41.291101, lng: 174.779485}
    //const libraries = ["places"] 
    const { isLoaded, loadError} = useJsApiLoader ({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
        libraries: libraries,
    })
    const mapsContainerStyle = {
        width: "95vw",
        height: "95vh",
    }
        
    const style = { border: "1px solid black"}

    if (!isLoaded) return <div>Loading...</div>
    if (loadError) return <div>Error...</div>
    
    return (<>
        <div>
            <h2>Hello World</h2>
                <GoogleMap
                mapContainerStyle={mapsContainerStyle}
                zoom={13}
                center={position}
                >
                    <AdvancedMarker position={{lat: -41.291101, lng: 174.779485}} >
                    <InfoWindow> Hello </InfoWindow>
                    </AdvancedMarker>
                </GoogleMap>
        </div>
    </>)
} 