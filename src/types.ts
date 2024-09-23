import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Location {
  instagram_id: string;
  request_id: string;
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

export interface DeleteRequest {
  locationIds: string[];
}

export interface RandawayContextType {
  locations: Location[];
  setLocations: Dispatch<SetStateAction<Location[]>>;
}

export interface ReactNodeProps {
  children: ReactNode;
}
