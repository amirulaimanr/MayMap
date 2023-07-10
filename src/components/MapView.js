import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];

const center = {
  lat: 4.2,
  lng: 101,
};

const MapView = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleSelect = async (address) => {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedMarker({ lat, lng });
    } catch (error) {
      console.log("Error fetching geocode", error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <PlacesAutocomplete onSelect={handleSelect} />
      <GoogleMap
        mapContainerClassName="w-9 h-screen mt-6 mb-8 m-auto border-round-xl"
        zoom={10}
        center={selectedMarker ? selectedMarker : center}
      >
        {selectedMarker && <Marker position={selectedMarker} />}
      </GoogleMap>
    </div>
  );
};

const PlacesAutocomplete = ({ onSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    onSelect(address);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <div className="w-full">
        <div className="w-4 mx-auto pt-4">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <ComboboxInput
              value={value}
              onChange={handleChange}
              disabled={!ready}
              className="combobox-input h-3rem w-full pl-6 text-xl border-round-2xl"
              placeholder="Where are you going?"
            />
          </span>
        </div>
      </div>

      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default MapView;
