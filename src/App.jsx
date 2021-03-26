import React, { Fragment } from "react";
// import ReactDOM from "react-dom";
import DrawTools from "./components/DrawTools";

// import { GlobalStateProvider, useGlobalState } from "./services/Store";
import { Map, TileLayer } from "react-leaflet";
import Test from "./test";

// import { EditControl } from "react-leaflet-draw";
// import "./styles.css";
// import "react-leaflet-fullscreen/dist/styles.css";
import FullscreenControl from "react-leaflet-fullscreen";

const App = () => {
  const mapConfig = {
    lat: 22,
    lng: -72,
    zoom: 6
  };

  return <Test />;
};

export default App;
