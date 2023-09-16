import React from "react";
import { useEffect, useState, useContext } from "react";
import { GlobalVariables } from "../App";
import { Link } from "react-router-dom";

const Preferences = () => {
  const { destLong, setDestLong, destLat, setDestLat } = useContext(
    GlobalVariables
  );
  return <div className=""></div>;
};

export default Preferences;
