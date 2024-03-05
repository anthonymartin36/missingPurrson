//"use client";

import { useState } from "react"
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow,
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
    //const position2 = { lat: -41.285575, lng: 174.763563}
    
    //console.log(catSightings)
    return (
        <>
        {catSightings.map((sighting) => {
            {return (
            <AdvancedMarker 
                onClick={Info(sighting)}
                key={sighting.sighted_cat_id} 
                position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} >
                <span style={{ fontSize:"2rem"}}>🐈‍</span>
                
            </AdvancedMarker> 
            )}
        })}  
        </>
    )

}

const Info = ({sighting}: any)=> {
    const [open, setOpen] = useState(true) 
    return (
        <>
            {open && (<InfoWindow onCloseClick={() => setOpen(false)} position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} key={sighting.sighted_cat_id} > <p>{sighting.description} </p> 
                </InfoWindow> )}
        
        </>
    )
} 