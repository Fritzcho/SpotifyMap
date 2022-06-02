import React, { useState, useEffect, useRef, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
import { layer_selected, layer_hovered } from "./layers";
import MapContext from "./MapContext";

function Map() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZWxpYXMwMDQwIiwiYSI6ImNsMzRmaXMybTAyNjQza3J1YTB1a2o1MXQifQ.id3jv1QrmMUTdVZ5zdub0Q";

  const { selectedCountry, setSelectedCountry } = useContext(MapContext);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0);

  //const [hoveredCountry, setHoveredCountry] = useState(null);

  let focusedCountry = null;
  let hoveredCountry = null;

  useEffect(() => {
    if (hoveredCountry == null) return;

    console.log(hoveredCountry);
  }, [hoveredCountry]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/elias0040/cl34hbw1j009114mm3kxt3hg1/",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", function () {
      map.current.addSource("country-boundaries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      map.current.addLayer({
        id: "countries",
        source: {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1",
        },
        "source-layer": "country_boundaries",
        maxzoom: 10,
        type: "fill",
        paint: {
          "fill-color": "gray",
          "fill-opacity": 1,
        },
      });

      map.current.addLayer({
        id: "selected",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        type: "fill",
        maxzoom: 10,
        paint: {
          "fill-color": "#1DB954",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            1,
            ["boolean", ["feature-state", "hover"], false],
            0.2,
            0,
          ],
        },
      });

      /*map.current.addLayer({
        id: "selected-country",
        source: "country-boundaries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "#1DB954",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.5,
            0,
          ],
        },
      });*/

      map.current.on("mousemove", "selected", (e) => {
        if (e.features.length > 0) {
          if (hoveredCountry !== null) {
            map.current.setFeatureState(
              {
                source: "country-boundaries",
                sourceLayer: "country_boundaries",
                id: hoveredCountry,
              },
              { hover: false }
            );
          }
          hoveredCountry = e.features[0].id;
          map.current.setFeatureState(
            {
              source: "country-boundaries",
              sourceLayer: "country_boundaries",
              id: hoveredCountry,
            },
            { hover: true }
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.current.on("mouseleave", "selected", () => {
        if (hoveredCountry !== null) {
          map.current.setFeatureState(
            {
              source: "country-boundaries",
              sourceLayer: "country_boundaries",
              id: hoveredCountry,
            },
            { hover: false }
          );
        }
        hoveredCountry = null;
      });

      map.current.on("click", "selected", (e) => {
        if (hoveredCountry !== null) {
          map.current.setFeatureState(
            {
              source: "country-boundaries",
              sourceLayer: "country_boundaries",
              id: focusedCountry,
            },
            { hover: false, click: false }
          );

          map.current.setFeatureState(
            {
              source: "country-boundaries",
              sourceLayer: "country_boundaries",
              id: hoveredCountry,
            },
            { hover: true, click: true }
          );

          focusedCountry = e.features[0].id;
          setSelectedCountry(e.features[0]);
        }

        hoveredCountry = null;
      });
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
