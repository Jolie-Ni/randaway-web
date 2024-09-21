import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { Location } from '../types';

const PoiMarkers = (props: { pois: Location[] }) => {
  const map = useMap();

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {props.pois.map((location: Location) => (
        <AdvancedMarker
          key={location.businessName}
          position={location.businessLocation}
          ref={(marker) => setMarkerRef(marker, location.businessName)}
        >
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
