//"use client";

//import { useState, useEffect } from "react"
import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps"
import { SightedCat } from '../../models/cats'

//import { fetchGoogleMapsAPIKey } from '../apis/api-map'


export default function GoogleMap( {catSightings}: any ){
    const position = { lat: -41.2924, lng: 174.7787}
    const apikey = import.meta.env.VITE_MAPS_API_KEY 
    
    return (
    <div><APIProvider apiKey={apikey} >
        <div style={{height:"75vh", width:"100%"}} >
            <Map zoom={13} center={position} mapId={import.meta.env.VITE_MAP_ID} > 
            <AdvancedMarker position={position} />
            <Markers sightedCats={catSightings}     />   
           </Map> 
        </div>
    </APIProvider> </div>)
}

const Markers = ({ sightedCats } : any ) => {
    const [latString, lngString] = sightedCats[0].location.split(', ')
    const newPosition = { lat:parseFloat(latString.trim()), lng:parseFloat(lngString.trim())} 
    console.log("Lng : " + newPosition.lng + " Lat : " + newPosition.lat)
    return (
        <>
            <AdvancedMarker 
            key={1} 
            position={newPosition}>
              <span style={{ fontSize: "2rem" }}>🌳</span>  
            </AdvancedMarker>
        </>
    )

}
