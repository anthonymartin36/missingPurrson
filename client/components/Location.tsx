import { useState, useMemo } from "react"
//import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { useJsApiLoader } from "@react-google-maps/api"
//import type { Libraries } from '@googlemaps/js-api-loader';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import '../styles/Location.css'

type addressType = {address: string, lat: number, lng: number}

const libraries =  ["places"] as any[]

export default function Location(props: any) {
  //const libraries = ['places'] as any[]
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries, 
  })
  const [selected, setSelected] = useState({address: '', lat: 0, lng: 0})
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address : string) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setSelected({address, lat: lat, lng: lng})
    console.log("selected : ", selected)
    props.changeAddress({ address:"53B Hankey Street, Mount Cook, Wellington, New Zealand", lat: -41.30576427, lng: 174.77076460})
    console.log("returnAddress: " + JSON.stringify(selected))
  }
  if (!isLoaded) return <div>Loading...</div>
  if (loadError) return <div>Error...</div>
  return (
    <>
      <div className="places-container">
      <Combobox onSelect={handleSelect}>
      <ComboboxInput 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="cat-sightings-form-input"
        placeholder="Search an address" 
      />
      <ComboboxPopover>
        <ComboboxList className="pac-item">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
      </div>
    </>
  )
}

// const returnAddress = (addressValue: addressType) => {  
//   console.log("returnAddress: " + JSON.stringify(addressValue.address) + " Lat : " + addressValue.lat + " Lng " + addressValue.lng)
//   return addressValue
// }

// const PlacesAutocomplete = (props: any) => {
  

//   return (<>
//     )
// }