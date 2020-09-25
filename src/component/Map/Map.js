import React, { useCallback, useRef, useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import { GoogleMap, Marker,InfoWindow,useLoadScript } from '@react-google-maps/api';
import Mapstyle from './Mapstyle.js';
import {  formatRelative } from 'date-fns';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
const libraries = ["places"];
const mapContainerStyle = {
  width:'100%',
  height:'100vh'
}
const center ={
  lat:43.653225,
  lng:-79.383186,
}
const options ={
  styles: Mapstyle,
  disableDefaultUi:true,
  zoomControl:true,
}


 const  Map = () => {
 
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCRvqU-j_js92EBXRv4Zvjn5S2e4xovySg",
        libraries,
      });
    const [marker, setMarker] = useState([]);
    
    const mapRef = useRef();
      const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);
    
      const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
      }, []);
      if(loadError) return "Error loading maps";
      if(!isLoaded) return "Loading Maps";

    return (
        <div>
            <Search panTo={panTo} ></Search>
<GoogleMap
 mapContainerStyle={mapContainerStyle}
zoom={8}
 center={center} 
 options={options} 
 onClick={(event) => {
   setMarker()
 }}

></GoogleMap>
        </div>
    );
};

function Search({ panTo }) {
  const localstrogeData = JSON.parse(sessionStorage.getItem('name'))

    const {
      
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });
  
    const handleInput = (e) => {
        setValue(e.target.value);
      };
    
      const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
        } catch (error) {
          console.log("😱 Error: ", error);
        }
      };
    
      return (
        <div >
          <Combobox onSelect={handleSelect}>
            <ComboboxInput
              value={localstrogeData }
              onChange={handleInput}
         
              placeholder="Search your location"
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
      );
    }
    export default Map;