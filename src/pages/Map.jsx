// TODO: Restrict API key

import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { GlobalVariables } from "../App";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [activeMarker, setActiveMarker] = useState(false);
  const { longitude, setLongitude, latitude, setLatitude } = useContext(
    GlobalVariables
  );

  useEffect(() => {
    setActiveMarker((prev) => true);
  });
  return (
    <GoogleMap zoom={10} center={{ lat: latitude, lng: longitude }}>
      <div className="h-screen">
        {activeMarker && (
          <Marker position={{ lat: latitude, lng: longitude }} />
        )}
      </div>
    </GoogleMap>
  );
}