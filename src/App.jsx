import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Preferences from "./pages/Preferences";
import Map from "./pages/Map";

export const GlobalVariables = createContext();

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(()=>{
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
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <GlobalVariables.Provider value={{longitude, setLongitude, latitude, setLatitude}}>
      <Routes>
          <Route path="/" element={<Auth />} className="h-full" />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/map" element={<Map />} />
        </Routes>
        <Link to="/map" className="p-3 bg-black text-offwhite rounded-lg">
          MAP BUTTON
        </Link>
      </GlobalVariables.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
