//Map.tsx
import React, { useState, useEffect, useRef } from 'react'
import {
  useGoogleMap,
  GoogleMapsProvider,
} from '@ubilabs/google-maps-react-hooks'

import { fetchGoogleMapsAPIKey } from '../apis/api-map'

const mapOptions = {
  zoom: 14,
  center: { lat: -41.2924, lng: 174.7787},
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: { position: 3 } // Right top
}

export default function Map({ catSightings } : any)  {
  //console.log(catSightings)
  const [mapContainer, setMapContainer] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const map = useGoogleMap()
  const markerRef = useRef()
  const [googleMapsAPIKey, setGoogleMapsAPIKey] = useState('')

  useEffect(() => {
    const getGoogleMapsKey = async () => {
      try {
        const apiKey = await fetchGoogleMapsAPIKey()
        //console.log("API Key" + apiKey)
        setGoogleMapsAPIKey(apiKey)
      } catch (error) {
        console.error('Error setting Google Maps API key:', error)
      }
    }

    getGoogleMapsKey()
  }, [])

  const handleLoad = (map) => {
    setMapLoaded(true)
  }

  function Location({ sighting }) {

  
    useEffect(() => {
      if (!map || !sighting) {
        return
      }

  
      console.log(map)
  
      const [latString, lngString] = sighting.location.split(', ')
      const lat = parseFloat(latString.trim())
      const lng = parseFloat(lngString.trim())
  
      if (window.google && window.google.maps) {
        console.log('running - aka Google Maps')
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
        })
        markerRef.current = marker
      }
  
      // Pan to the first sighting's location
      const [firstLatString, firstLngString] = sighting.location.split(', ')
      const firstLat = parseFloat(firstLatString.trim())
      const firstLng = parseFloat(firstLngString.trim())
  
      map.panTo({ lat: firstLat, lng: firstLng })
    }, [map, sighting])
  
  }

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={googleMapsAPIKey}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      onLoad={handleLoad}
    >
      <div
        ref={(node) => setMapContainer(node)}
        style={{ height: '100%', borderRadius: '15px' }}
      />
      {catSightings.map((sighting) => (
        <Location key={sighting.id} sighting={sighting} />
      ))} 

       {mapLoaded && <Location catSightings={catSightings} />}
    </GoogleMapsProvider>
  )
}


