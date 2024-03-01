//"use client";

//import { useState, useEffect } from "react"
import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps"
import { SightedCat } from '../../models/cats'

//import { fetchGoogleMapsAPIKey } from '../apis/api-map'


export default function GoogleMap( catSightings: SightedCat ){
    const position = { lat: -41.2924, lng: 174.7787}
    const apikey = import.meta.env.VITE_MAPS_API_KEY 
    
    return (
    <div><APIProvider apiKey={apikey} >
        <div style={{height:"75vh", width:"100%"}} >
            <Map zoom={13} center={position} mapId={import.meta.env.VITE_MAP_ID} > 
            
            <Markers catSightings={catSightings}     />   
           </Map> 
        </div>
    </APIProvider> </div>)
}

const Markers = ({catSightings} : any ) => {
    const sightedCat = catSightings.catSightings
    console.log("Sighted Cat ID : " + JSON.stringify(sightedCat[0].sighted_cat_id))
    console.log("Location : " + JSON.stringify(sightedCat[0].location))
    //const position = { lat: -41.2924, lng: 174.7787}
    return (
        <div id="pinpoint">
            {sightedCat.map(sighting => { 
                //const [latString, lngString] = sighting.location.split(', ')
                //const newPosition = { lat:parseFloat(latString.trim()), lng:parseFloat(lngString.trim())} 
                <AdvancedMarker 
                key={sighting.sighted_cat_id} 
                position={{lat: latString, lng: lngString}}>
                  <span style={{ fontSize: "2rem" }}>🌳</span>  
                </AdvancedMarker>

            })}
        </div>
    )

}
