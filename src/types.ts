export interface Location {
  businessName: string;
  businessAddress: string;
  businessLocation: google.maps.LatLngLiteral;
}

export interface LocationListProps {
  data: Location[];
}

export interface Poi {
  key: string;
  location: google.maps.LatLngLiteral;
}
