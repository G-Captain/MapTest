import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Circle,
  FeatureGroup,
  ImageOverlay,
  Popup
} from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});

const bounds = [
  [0, 0],
  [285, 400]
];

class test extends Component {
  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  state = {
    adminMode: true
  };

  _editableFG = null;

  onClickAdminButton = () => {
    this.state.adminMode = !this.state.adminMode;
    console.log(this.state.adminMode);
  };

  _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  };

  _onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
      layer.bindTooltip("dupa")
      layer.bindPopup("dupa 2")
    } else {
      console.log("_onCreated: something else created:", type, e);
      layer.bindTooltip("dupa")
    }
    // Do whatever else you need to. (save to db; etc)

    this._onChange();
    console.log("EFG");
    console.log(this._editableFG);
  };

  _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    this._onChange();
  };

  _onMounted = (drawControl) => {
    console.log("_onMounted", drawControl);
  };

  _onEditStart = (e) => {
    console.log("_onEditStart", e);
  };

  _onEditStop = (e) => {
    console.log("_onEditStop", e);
  };

  _onDeleteStart = (e) => {
    console.log("_onDeleteStart", e);
  };

  _onDeleteStop = (e) => {
    console.log("_onDeleteStop", e);
  };

  _onFeatureGroupReady = (reactFGref) => {
    // populate the leaflet FeatureGroup with the geoJson layers

    let leafletGeoJSON = new L.GeoJSON(getGeoJson());
    let leafletFG = reactFGref.leafletElement;

    leafletGeoJSON.eachLayer((layer) => {
      console.log(layer);
      leafletFG.addLayer(layer);
    });

    // store the ref for future access to content

    this._editableFG = reactFGref;
  };

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClickAdminButton}>admin mode</button>
        <Map crs={L.CRS.Simple} center={[156.45, 194.49]} zoom={0.7}>
          <ImageOverlay
            bounds={bounds}
            url="https://external-preview.redd.it/w9BVe9tGxELJs1GvR-50pCzPFlmeRj5h6ma8tN93SB0.jpg?auto=webp&s=c272d3687d831f334a1c7e32d9a7431b3d22040f"
          />

          <FeatureGroup
            ref={(reactFGref) => {
              this._onFeatureGroupReady(reactFGref);
            }}
          >
            {this.state.adminMode ? (
              <EditControl
                position="topright"
                onEdited={this._onEdited}
                onCreated={this._onCreated}
                onDeleted={this._onDeleted}
                onMounted={this._onMounted}
                onEditStart={this._onEditStart}
                onEditStop={this._onEditStop}
                onDeleteStart={this._onDeleteStart}
                onDeleteStop={this._onDeleteStop}
                draw={{
                  rectangle: false
                }}
              />
            ) : null}
           
          </FeatureGroup>
        </Map>
      </div>
    );
  }
}

export default test;

const getGeoJson = () => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [82.69, 205.25],
            [212.88, 54.8]
          ]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [82.69, 205.25]
        }
      },

      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [212.88, 54.8]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [130.68, 167.36],
              [142.64, 168.07],
              [141.16, 180.65],
              [135.76, 187.37],
              [131.07, 176.74]
            ]
          ]
        }
      }
    ]
  };
};
