import React, { Fragment } from "react";

import "./App.css";

import { Map, TileLayer } from "react-leaflet";
import Test from "./test";

const App = () => {
  return (
    <div>
      <h1>React Leaflet Map of Poland</h1>
      <Test />
    </div>
  );
};
export default App;
