import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin, useMap} from '@vis.gl/react-google-maps';

import React, {useEffect, useState, useRef, useCallback} from 'react';
import {createRoot} from "react-dom/client";
  import {MarkerClusterer} from '@googlemaps/markerclusterer';
  import type {Marker} from '@googlemaps/markerclusterer';

const GoogleMapBox: React.FC<LocationListProps> = ( {data} )  => {

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const map = useMap();

    useEffect(() => {
        if (!map) return;
        if (data?.length) {
        const bounds = new google.maps.LatLngBounds();
        data.forEach(({ businessLocation }) => {
            bounds.extend(businessLocation);
        });
        map.fitBounds(bounds);
    }
  }, [map, data]);


    const PoiMarkers = (props: {pois: Location[]}) => {

        const map = useMap();

        const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
    
        const clusterer = useRef<MarkerClusterer | null>(null);


        useEffect(() => {
            if (!map) return;
            if (!clusterer.current) {
              clusterer.current = new MarkerClusterer({map});
            }
          }, [map]);

          useEffect(() => {
            clusterer.current?.clearMarkers();
            clusterer.current?.addMarkers(Object.values(markers));
          }, [markers]);

          const setMarkerRef = (marker: Marker | null, key: string) => {
            if (marker && markers[key]) return;
            if (!marker && !markers[key]) return;
        
            setMarkers(prev => {
              if (marker) {
                return {...prev, [key]: marker};
              } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
              }
            });
          };

        return (
          <>
            {props.pois.map( (location: Location) => (
              <AdvancedMarker
                key={location.businessName}
                position={location.businessLocation}
                ref={marker => setMarkerRef(marker, location.businessName)}>
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
              </AdvancedMarker>
            ))}
          </>
        );
      };

    return (
        <APIProvider apiKey={apiKey!} onLoad={() => console.log('Maps API has loaded.')}>
            <div style={{ height: '100vh', width: '100%' }}>
            <Map
      defaultZoom={13}
      mapId={"52b86c7c533a5c28"}
      
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }
      >
        <PoiMarkers pois={data}/>
</Map>

</div>
        </APIProvider>
    )
}

export default GoogleMapBox;