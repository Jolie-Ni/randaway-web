  interface Location {
      businessName: string,
      businessAddress: string,
      businessLocation: google.maps.LatLngLiteral
  }

  interface LocationListProps {
    data: Location[]
  }

  interface Poi { key: string, location: google.maps.LatLngLiteral }
  