//"use client";

import { useState } from "react"
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
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


const Markers = ( {catSightings} : any ) => {
    
    const [open, setOpen] = useState(false) 
    const [markerRef, marker] = useAdvancedMarkerRef()
    const toggleInfoWindow = () => setOpen(previousState => !previousState)

    const closeInfoWindow = () => setOpen(false)
    
    return (
        <>
        {catSightings.map((sighting) => {
            {return (
            <AdvancedMarker 
                onClick={toggleInfoWindow}
                key={sighting.sighted_cat_id} 
                ref={markerRef}
                position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} > 
                <span style={{ fontSize:"2rem"}}>🐈‍</span>
                {open && (<InfoWindow key={sighting.sighted_cat_id} anchor={marker} onCloseClick={closeInfoWindow} > <p>{sighting.description} </p> 
                </InfoWindow> )}
            </AdvancedMarker> 
            )}
        })}  
        </>
    )

}

// const Info = ({sighting}: any)=> {
    
//     return (
//         <>
            
        
//         </>
//     )
// } 