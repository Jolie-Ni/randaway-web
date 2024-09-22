import { APIProvider } from "@vis.gl/react-google-maps";

import React from "react";
import { LocationListProps } from "../types";
import GoogleMapContent from "./GoogleMapContent";

const GoogleMapBox: React.FC<LocationListProps> = ({ data }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider
      apiKey={apiKey!}
      // eslint-disable-next-line
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapContent data={data} />
      </div>
    </APIProvider>
  );
};

export default GoogleMapBox;
