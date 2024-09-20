import { APIProvider, Map, MapCameraChangedEvent, useMap} from '@vis.gl/react-google-maps';

import React from 'react';
import { LocationListProps } from '../types';
import PoiMarkers from './PoiMarkers';

const GoogleMapBox: React.FC<LocationListProps> = ( {data} )  => {

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const map = useMap();

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