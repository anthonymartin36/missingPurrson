import { useState, useMemo } from "react"
//import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { useJsApiLoader } from "@react-google-maps/api"
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

const libraries = ["places"] as any[]

export default function Location(props: any) {
  //const [ libraries ] = useState(['places']);  
  const { isLoaded, loadError } = useJsApiLoader({
    //loading: async,
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY ,
    libraries: libraries, 
  })
  const [selected, setSelected] = useState({address: '', lat:'', lng: ''})
  if (!isLoaded) return <div>Loading...</div>
  if (loadError) return <div>Error...</div>
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={() => props.changeAddress(ReturnAddress)} />
      </div>
    </>
  )
}

const ReturnAddress = (addressValue: addressType) => {  
  return addressValue
}

const PlacesAutocomplete = ({ setSelected }: any) => {
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
    console.log("Location Component: " + JSON.stringify({address}) + " Lat : " + lat + " Lng " + lng)
    ReturnAddress({address, lat: lat, lng: lng})
  }

  return (
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
  )
}