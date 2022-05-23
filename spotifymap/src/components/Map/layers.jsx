export const layer_selected = {
  id: "country-boundaries",
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
  },
  "source-layer": "country_boundaries",
  type: "fill",
  paint: {
    "fill-color": "#1DB954",
    "fill-opacity": 1,
  },
};

export const layer_hovered = {
  id: "country-boundaries",
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
  },
  "source-layer": "country_boundaries",
  type: "fill",
  paint: {
    "fill-color": "#1DB954",
    "fill-opacity": 0.3,
  },
};
