import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../config/firebase-config";
import "../styling/chat.css";
