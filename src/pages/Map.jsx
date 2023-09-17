// TODO: Restrict API key

import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { GlobalVariables } from "../App";
import { getDocs, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

// CHANGE HERE
const locationsRef = collection(db, "locations");

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

  // CHANGE HERE
}

export const showLocation = async () => {
  try {
    await addDoc(locationsRef, {
      latitude: latitude,
      longitude: longitude,
    });
  } catch (err) {
    console.log(err);
  }
};
