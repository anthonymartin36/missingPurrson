import { useState, useMemo } from "react"
//import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { useLoadScript} from "@react-google-maps/api"
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

export default function Location() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY ,
    libraries: ["places"],
  })
  
  const [selected, setSelected] = useState(null) 

  if (!isLoaded) return <div>Loading...</div>

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
    </>
  )
}

const PlacesAutocomplete = ({ setSelected }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address : any) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setSelected({ lat, lng })
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