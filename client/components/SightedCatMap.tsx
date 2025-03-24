import react, {useState} from "react"
import { SightedCat } from '../../models/cats'

import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from "@react-google-maps/api" // useApiIsLoaded, useApiLoadingStatus, APILoadingStatus, useAdvancedMarkerRef,

const libraries = ["places"] as any[]
interface SightedCatMapProps {
    catSightings: SightedCat[]
  }

export default function SightedCatMap ( {catSightings}: SightedCatMapProps) {
    const position = {lat: -41.291101, lng: 174.779485}
    const catData = catSightings
    const data = (catData === undefined) ? false : true
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
                <GoogleMap key={'map-{$mapKey}'}
                options={{mapId: import.meta.env.VITE_MAP_ID}}
                mapContainerStyle={mapsContainerStyle}
                zoom={13}
                center={position} >
                {data && catData.map((sighting: SightedCat) => {
                    {return (<><Markers key={sighting.sightedCatId}  id={sighting.sightedCatId} sighting={sighting}/></>)}
                })}
                </GoogleMap>
            </div>
    </>)
} 

interface MarkersProps {
    id: number;
    sighting: SightedCat;
}

const Markers: React.FC<MarkersProps> = ({ id, sighting }) => {
    const [open, setOpen] = useState(false) 
    const toggleInfoWindow = () => setOpen(previousState => !previousState)
    const closeInfoWindow = () => setOpen(false)
    const options = import.meta.env.VITE_NODE_ENV === 'development' ? {icon: "../client/images/favicon-32x32.png"} : {icon: "/images/favicon-32x32.png"}
    //console.log("Cat Date Seen : " + typeof(sighting.dateSeen) )
    return (
        <>
            <Marker 
                onClick={toggleInfoWindow}
                key={id} 
                position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} 
                options={options} > 
                {open && (<InfoWindow 
                    key={id} 
                    onCloseClick={closeInfoWindow} > 

                    <div id="catmap-data" className="catmap-data" >
                        <p><b>Description : </b>{sighting.description} </p>
                        <p><b>Date : </b>{sighting.dateSeen.slice(0,10)}</p>
                        <p><b>Color : </b>{sighting.color}</p>
                    </div>
                 </InfoWindow> )}
            </Marker> 
        </>
    )

}
