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


export default function SightedCatMap( {catSightings}: any ){
    const position = { lat: -41.285575, lng: 174.763563}
    //const anotherPosition = {lat: -41.298924, lng: 174.785708}
    const apikey = import.meta.env.VITE_MAPS_API_KEY 
    //console.log("catSightings : " + JSON.stringify(catSightings) )
    //const sightings = catSightings.catSightings
    return (
    <><APIProvider apiKey={apikey} >
        <div style={{height:"75vh", width:"100%"}} >
        <Map key={catSightings[0].cat_id_mc + 100} zoom={13} center={position} mapId={import.meta.env.VITE_MAP_ID} > 
        {catSightings.map((sighting: any) => {
        {return (<><Markers key={sighting.sighted_cat_id} sighting={sighting}/></>)}
        })}
        </Map> 
        </div>
    </APIProvider> </>)
}


const Markers = ( {sighting} : any ) => {
    //console.log({sighting})
    const [open, setOpen] = useState(false) 
    const [markerRef, marker] = useAdvancedMarkerRef()
    const toggleInfoWindow = () => setOpen(previousState => !previousState)
    const closeInfoWindow = () => setOpen(false)
    
    return (
        <>
            <AdvancedMarker 
                onClick={toggleInfoWindow}
                key={sighting.sighted_cat_id} 
                ref={markerRef}
                position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} > 
                <span style={{ fontSize:"2rem"}}>🐈‍</span>
            </AdvancedMarker> 
            {open && (<InfoWindow anchor={marker} key={sighting.sighted_cat_id + 500} onCloseClick={closeInfoWindow} > <p>{sighting.description} </p> 
                </InfoWindow> )}
            </>
    )

}