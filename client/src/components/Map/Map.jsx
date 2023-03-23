import { useState, memo, Marker } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const center = {
    lat: 49.9935,
    lng: 36.2304
};

const Map = () => {
    const [placeName, setPlaceName] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA5pkafPkgGyqmmTjvWR87ER6SbE2xzKqs"
    });

    const handleMapClick = event => {
        const geocoder = new window.google.maps.Geocoder();
        const { latLng } = event;
    
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

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px'}}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {markerPosition && (
            <Marker position={markerPosition} />
          )}
        </GoogleMap>
    ) : <></>
};

export default memo(Map);