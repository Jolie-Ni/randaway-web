import { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import PoiMarkers from "./PoiMarkers";
import { LocationListProps } from "../types";
import { Map, useMap} from '@vis.gl/react-google-maps';
import { useEffect } from "react";
import { Location } from "../types";

const GoogleMapContent: React.FC<LocationListProps>= ({data}) => {

    const map = useMap();

      //from latAndLngs we will get lat and lng of all locations
  const latAndLngs = data?.map((location) => ({
    lat: location.businessLocation.lat,
    lng: location.businessLocation.lng,
  }));

  // avgLat and avgLng will give us average lat and average lng based on all latAndLngs
  const avgLat =
    latAndLngs?.reduce((total, pos) => total + pos.lat, 0) /
      latAndLngs?.length || 20.5937;
  const avgLng =
    latAndLngs?.reduce((total, pos) => total + pos.lng, 0) /
      latAndLngs?.length || 20.5937;

      const ZOOM_LEVEL_FOR_SINGLE_MARKER = 10;


      useEffect(() => {
        if (!map) return;
        if (data?.length > 0 && map) {
          fitMapToBounds(data);
        }
      }, [map, data]);

    //fitMapToBounds will add all the markers in a single view.
    const fitMapToBounds = (data: Location[]) => {
      const markers = data.map((location, index) => ({
        key: index,
        position: { lat: location.businessLocation.lat, lng: location.businessLocation.lng},
      }));
      if (markers.length > 0 && map) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.position));
        map.fitBounds(bounds, 250);
        if(markers.length === 1){
          map.setZoom(ZOOM_LEVEL_FOR_SINGLE_MARKER);
        }
      }
  };

    return (
    <Map
      mapId={"52b86c7c533a5c28"}
      defaultZoom={3}
      defaultCenter={{ lat: avgLat, lng: avgLng }}
      
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }
    >
        <PoiMarkers pois={data}/>
    </Map>
    )
}

export default GoogleMapContent;