import { APIProvider } from "@vis.gl/react-google-maps";

import React from "react";
import GoogleMapContent from "./GoogleMapContent";
import "../App.css";

const GoogleMapBox: React.FC = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      <APIProvider
        apiKey={apiKey!}
        // eslint-disable-next-line
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapContent />
        </div>
      </APIProvider>
    </div>
  );
};

export default GoogleMapBox;
