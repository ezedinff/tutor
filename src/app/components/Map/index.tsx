/**
 *
 * Map
 *
 */
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { LocationOn } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Box } from '@material-ui/core';
import { googleAPIKey } from 'app/constants';

export interface ILocation {
  lat: number;
  lng: number;
  locationStr?: string;
}

interface Props {
  currentLocation: ILocation;
  setCurrentLocation: (loc: ILocation) => void;
}

const Marker = (props: { lat: number; lng: number }) => (
  <LocationOn style={{ width: 50, height: 50 }} color="primary" />
);

interface AutoCompleteProps {
  setLatLng: (any: ILocation) => void;
}

const PlacesAutoCompleteI = ({ setLatLng }: AutoCompleteProps) => {
  const [adress, setAdress] = useState('');

  const onAddresSelected = async (value: string) => {
    try {
      const geoCoded = await geocodeByAddress(value);
      const latLng = await getLatLng(geoCoded[0]);
      setLatLng({ ...latLng, locationStr: value });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlacesAutoComplete
      value={adress}
      onChange={val => setAdress(val)}
      onSelect={onAddresSelected}
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
        return (
          <>
            <Autocomplete
              options={suggestions ? [...suggestions] : []}
              getOptionLabel={option => (option ? option.description : '')}
              renderInput={param => (
                <TextField
                  {...getInputProps({ placeholder: 'Search a place' })}
                  {...param}
                  variant="outlined"
                />
              )}
              renderOption={option =>
                (
                  <div {...getSuggestionItemProps(option)}>
                    <span>{option.description}</span>
                  </div>
                ) || ''
              }
            />
          </>
        );
      }}
    </PlacesAutoComplete>
  );
};

export function Map(props: Props) {
  const [isMapDraggable, setIsMapDraggable] = useState(true);
  const [zoom, setZoom] = useState(12);

  const onMarkerInteracton = (childKey, childProps, mouse: ClickEventValue) => {
    setIsMapDraggable(false);
    props.setCurrentLocation({ lat: mouse.lat, lng: mouse.lng });
  };

  const onMarkerMouseUp = (childKe, childProps, mouse: ClickEventValue) => {
    setIsMapDraggable(true);
  };

  const setFromAutoComplete = (location: ILocation) => {
    props.setCurrentLocation(location);
    setTimeout(() => {
      setZoom(15);
    }, 500);
  };

  // useEffect(() => {
  //   retriveUserAddress();
  // }, []);

  return (
    <Div p={2}>
      <PlacesAutoCompleteI setLatLng={setFromAutoComplete} />
      <Box my={2} height="400px" width="100%">
        <GoogleMapReact
          center={props.currentLocation}
          zoom={zoom}
          bootstrapURLKeys={{
            key: typeof googleAPIKey === 'string' ? googleAPIKey : '',
          }}
          draggable={isMapDraggable}
          onChildMouseDown={onMarkerInteracton}
          onChildMouseUp={onMarkerMouseUp}
          onChildMouseMove={onMarkerInteracton}
        >
          <Marker
            lat={props.currentLocation.lat}
            lng={props.currentLocation.lng}
          />
        </GoogleMapReact>
      </Box>
      {/* <Button fullWidth variant="outlined" color="primary">
        Set Current Location
      </Button> */}
    </Div>
  );
}

const Div = styled(Box)`
  width: 600px;
  height: 600px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
