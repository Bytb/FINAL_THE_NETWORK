// TODO: Restrict API key
import firebase from "firebase/compat/app";
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

  const showLocation = async () => {
    try {
      await addDoc(locationsRef, {
        latitude: latitude,
        longitude: longitude,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

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
      <button
        className="fixed bottom-10 right-10 rounded-lg hover:bg-turq hover:text-flat bg-flat border-2 border-turq text-turq h-1/4"
        onClick={showLocation}
      >
        Show Location
      </button>
    </GoogleMap>
  );

  // CHANGE HERE
}
