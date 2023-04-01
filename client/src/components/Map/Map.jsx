import { useState, memo, useRef } from 'react';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';

import styles from './Map.module.scss';

const libraries = ['places'];

const Map = () => {
    const [placeName, setPlaceName] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [center, setCenter] = useState({  lat: 49.9935, lng: 36.2304 });
    const [map, setMap] = useState(null);
    const searchBox = useRef(null);

    const onMapLoad = (map) => setMap(map);
    const onSBLoad = (ref) => searchBox.current = ref;

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
      libraries,
      language: 'en',
    });

    const handleMapClick = event => {
      const geocoder = new window.google.maps.Geocoder();
      const { latLng } = event;
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
              setPlaceName(results[0].formatted_address);
              console.log(results[0].formatted_address);
          } else {
            console.log('No results found');
          }
        } else {
          console.log(`Geocoder failed due to: ${status}`);
        }
      });
    };

    const onPlacesChanged = () => {
      const places = searchBox.current.getPlaces();
      const bounds = new window.google.maps.LatLngBounds();

      places.forEach((place) => {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
          // console.log(place.geometry.viewport);
          // setMarkerPosition({ lat: place.geometry.viewport.Va.hi, lng: place.geometry.viewport.Ga.hi });
        } else {
          bounds.extend(place.geometry.location);
          console.log(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    };

    return (
      <div>
        <h3 className={styles.heading}>Місце події</h3>
        {isLoaded &&
          <div className={styles.mapContainer}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '600px', borderRadius: '10px'}}
              center={center}
              zoom={10}
              onClick={handleMapClick}
              onLoad={onMapLoad}
            >
              {markerPosition && (
                <Marker position={markerPosition} />
              )}
            </GoogleMap>
            <div>
            <StandaloneSearchBox
              onLoad={onSBLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input type="text" className={styles.input} placeholder='Search...'/>
            </StandaloneSearchBox>
            </div>
          </div>}
          <div className={styles.pickedLocation}>
            {placeName && <span>{placeName}</span>}
          </div>
      </div>
    )
};

export default memo(Map);