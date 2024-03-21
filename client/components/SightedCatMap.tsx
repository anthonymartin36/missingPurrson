
import { useState, useMemo, useEffect } from "react"
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow,
    useApiIsLoaded,
    useApiLoadingStatus,
    APILoadingStatus,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps"
//import {useJsApiLoader} from '@react-google-maps/api'
import { SightedCat } from '../../models/cats'

interface SightedCatMapProps {
    catSightings: SightedCat[];
  }

export default function SightedCatMap( {catSightings}: SightedCatMapProps){
    const position = useMemo(()=> ({ lat: -41.285575, lng: 174.763563}), [])
    const apiKey = import.meta.env.VITE_MAPS_API_KEY 
    const catData = catSightings
    const [mapLoaded, setMapLoaded] = useState(false)
    // console.log("DeConstruct : " + JSON.stringify({catSightings}))
    // console.log("Origional : " + JSON.stringify(catSightings))
    let mapKey = self.crypto.randomUUID()
    // const apiIsLoaded = useApiIsLoaded()
    //console.log("mapkey : " + mapKey )
    const apiIsLoaded = useApiIsLoaded()
    const status = useApiLoadingStatus()

    useEffect(() => {
        if (!apiIsLoaded) return;
        if (status === APILoadingStatus.FAILED) {
          console.log("Google Maps API loading failed")
          return
        }
        initMap()
        // Handle other loading status if needed
      }, [apiIsLoaded, status])

    return (
    <><APIProvider apiKey={apiKey} >
        <div  id="catmap" className="catmap" style={{height:"75vh", width:"100%"}} >
        <Map key={mapKey} zoom={13} center={position} mapId={import.meta.env.VITE_MAP_ID}> 
        {catData.map((sighting: SightedCat) => {
        {return (<><div key={sighting.sightedCatId}><Markers sighting={sighting}/></div></>)}
        })}
        </Map> 
        </div>
    </APIProvider> </>)
}


let map: google.maps.Map;

// Initialize the map
async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById("catmap") as HTMLElement, {
    center: { lat: -41.285575, lng: 174.763563 },
    zoom: 13,
    mapId: import.meta.env.VITE_MAP_ID
  });
}

interface MarkersProps {
    sighting: SightedCat;
  }

const Markers: React.FC<MarkersProps> = ({ sighting }) => {
    //console.log({sighting})
    const [open, setOpen] = useState(false) 
    const [markerRef, marker] = useAdvancedMarkerRef()
    const toggleInfoWindow = () => setOpen(previousState => !previousState)
    const closeInfoWindow = () => setOpen(false)
    
    return (
        <>
            <AdvancedMarker 
                onClick={toggleInfoWindow}
                key={sighting.sightedCatId} 
                ref={markerRef}
                position={{lat: JSON.parse(sighting.lat), lng: JSON.parse(sighting.lng)}} > 
                <span style={{ fontSize:"2rem"}}>🐈‍</span>
            </AdvancedMarker> 
            {open && (<InfoWindow anchor={marker} key={sighting.sightedCatId} onCloseClick={closeInfoWindow} > <p>{sighting.description} </p> 
                </InfoWindow> )}
            </>
    )

}