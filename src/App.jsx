import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, createContext, useEffect, useRef } from "react";
import Map from "./pages/Map";
import Homepage from "./pages/Homepage";
import "./styling/chat.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCGtYKA3Kp5KLomnrh2Sjw0fKL181MOhVs",
  authDomain: "socialbond-f91d5.firebaseapp.com",
  projectId: "socialbond-f91d5",
  storageBucket: "socialbond-f91d5.appspot.com",
  messagingSenderId: "803426290051",
  appId: "1:803426290051:web:7e8d8bfc05392498838eb6",
  measurementId: "G-7VNYXCJ8CC",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const GlobalVariables = createContext();

function App() {
  const [user] = useAuthState(auth);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [destLong, setDestLong] = useState(0);
  const [destLat, setDestLat] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      setLatitude(() => position.coords.latitude);
      setLongitude(() => position.coords.longitude);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalVariables.Provider
          value={{
            longitude,
            setLongitude,
            latitude,
            setLatitude,
            destLong,
            setDestLong,
            destLat,
            setDestLat,
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} className="h-full" />
            <Route
              path={user ? "/chatroom" : "/login"}
              element={user ? <ChatRoom /> : <Auth />}
              className="h-full"
            />
            <Route path="/map" element={<Map />} />
          </Routes>
        </GlobalVariables.Provider>
      </BrowserRouter>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
