// TODO: Restrict API key

import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { GlobalVariables } from "../App";

export default function Home() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyB0O1XNs5m_YOaBI-yniNxOTjL1NKGk0zg",
  });
  
  if (!isLoaded) return <div>Loading...</div>;
  return <Map/ >;
}


function Map() {
  const [activeMarker, setActiveMarker] = useState(false);
  const { longitude, setLongitude, latitude, setLatitude} = useContext(GlobalVariables);

  useEffect(() => {
    setActiveMarker((prev) => true)
    })
  return <GoogleMap zoom={10} center={{lat: latitude, lng: longitude}} ><div className="h-screen">{activeMarker && (<Marker position={{lat:latitude, lng: longitude}}/>)}</div></GoogleMap>
}
