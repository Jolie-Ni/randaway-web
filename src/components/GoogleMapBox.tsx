import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

const GoogleMapBox = () => {

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    return (
        <APIProvider apiKey={apiKey!} onLoad={() => console.log('Maps API has loaded.')}>
            <div style={{ height: '100vh', width: '100%' }}>
            <Map
      defaultZoom={13}
      defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
</Map>
</div>
        </APIProvider>
    )
}

export default GoogleMapBox;