//"use client";

//import { useState, useEffect } from "react"
import {
    APIProvider,
    Map,
    AdvancedMarker,
} from "@vis.gl/react-google-maps"
import { SightedCat } from '../../models/cats'

//import { fetchGoogleMapsAPIKey } from '../apis/api-map'


export default function GoogleMap( {catSightings}: SightedCat ){
    const position = { lat: -41.285575, lng: 174.763563}
    
    //const anotherPosition = {lat: -41.298924, lng: 174.785708}
    //const sightings = {catSightings}
    //console.log("Id : " + catSightings[0].sighted_cat_id)
    const apikey = import.meta.env.VITE_MAPS_API_KEY 
    
    return (
    <div><APIProvider apiKey={apikey} >
        <div style={{height:"75vh", width:"100%"}} >
        <Map zoom={13} center={position} mapId={import.meta.env.VITE_MAP_ID} > 
        <Markers catSightings={catSightings}/>
        </Map> 
        </div>
    </APIProvider> </div>)
}


{/* <AdvancedMarker key={2} position={position} /> */}
// {}
const Markers = ( {catSightings} : any ) => {
    //const sightedCat = catSightings
    const position2 = { lat: -41.285575, lng: 174.763563}
    // const sightedCat = catSightings.map(sighting => { 
    //     return sighting
    // })
    //console.log("ID : " + JSON.stringify(sightedCat[0].sighted_cat_id) + " Lat " + sightedCat[0].lat + " and  Lng: " + sightedCat[0].lng)
    // console.log("Sighted Cat ID : " + JSON.stringify(sightedCat[0].sighted_cat_id))
    // console.log("Location : " + JSON.stringify(sightedCat[0].location))
    
    // const position = catSightings.map((sighting) => {  
    //     return { lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)} //{ lat: -41.285575, lng: 174.763563}
    // })
    // console.log('Processing sighting:', JSON.stringify(position))
    return (
        <>
        {catSightings.map((sighting) => {
            {return (<AdvancedMarker key={sighting.sighted_cat_id} position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} /> )}
        })}  
        </>
    )
    // { lat: sighting.lat, lng: sighting.lng }

}

{/* <AdvancedMarker 
key={sighting.sighted_cat_id} 
position={anotherPosition}>
  <span style={{ fontSize: "2rem" }}>🌳</span>  
</AdvancedMarker> */}