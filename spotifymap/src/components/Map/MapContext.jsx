import { createContext } from "react";

const MapContext = createContext({
  selectedCountry: null,
  setSelectedCountry: {},
});

export default MapContext;
