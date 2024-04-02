import react, {useState} from "react"
import { SightedCat } from '../../models/cats'

import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from "@react-google-maps/api" // useApiIsLoaded, useApiLoadingStatus, APILoadingStatus, useAdvancedMarkerRef,

const libraries = ["places"] as any[]
interface SightedCatMapProps {
    catSightings: SightedCat[];
  }

export default function SightedCatMap2 ( {catSightings}: SightedCatMapProps) {
    const position = {lat: -41.291101, lng: 174.779485}
    const catData = catSightings
    const { isLoaded, loadError} = useJsApiLoader ({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
        libraries: libraries,
    })
    const mapsContainerStyle = {
        width: "50vw",
        height: "75vh",
    }        
    const style = { border: "1px solid black"}
    let mapKey = self.crypto.randomUUID()
    if (!isLoaded) return <div>Loading...</div>
    if (loadError) return <div>Error...</div>
    
    return (<>
            <div  id="catmap" className="catmap" style={{height:"75vh", width:"100%"}} >     
                <GoogleMap key={mapKey}
                options={{mapId: import.meta.env.VITE_MAP_ID}}
                mapContainerStyle={mapsContainerStyle}
                zoom={13}
                center={position} >
                {catData.map((sighting: SightedCat) => {
                    {return (<><Markers sighting={sighting}/></>)}
                })}
                </GoogleMap>
            </div>
    </>)
} 

interface MarkersProps {
    sighting: SightedCat;
}

const Markers: React.FC<MarkersProps> = ({ sighting }) => {
    const [open, setOpen] = useState(false) 
    const toggleInfoWindow = () => setOpen(previousState => !previousState)
    const closeInfoWindow = () => setOpen(false)
    
    //console.log("Cat ID : " + JSON.stringify(sighting.sightedCatId + 500) )
    return (
        <>
            <Marker 
                onClick={toggleInfoWindow}
                key={sighting.sightedCatId} 
                position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} > 
                {/* <span style={{ fontSize:"2rem"}}>🐈‍</span> */}
                {open && (<InfoWindow 
                    key={sighting.sightedCatId + 500} 
                    onCloseClick={closeInfoWindow} > 
                    <div><p>{sighting.description} </p></div>
                 </InfoWindow> )}
            </Marker> 
        </>
    )

}