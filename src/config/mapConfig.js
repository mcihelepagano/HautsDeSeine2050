import iconPiezo from "../icons/piezo.png";
import iconSolar from "../icons/solar.png";
import iconBench from "../icons/bench.png";
import iconRiver from "../icons/river.png";
import iconBoat from "../icons/boat-icon.png";
import iconPasserelle from "../icons/Passerelle.png";

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const MAP_STYLE_DAY = import.meta.env.VITE_MAPBOX_STYLE_DAY;
export const MAP_STYLE_NIGHT = import.meta.env.VITE_MAPBOX_STYLE_NIGHT;

export const MAP_VIEW = {
  center: [16.3738, 48.2082],
  zoom: 12,
  bearing: 90,
  pitch: 0,
  bounds: [
    [16.15, 48.11],
    [16.6, 48.33]
  ]
};

export const ICONS = {
  piezo: iconPiezo,
  solar: iconSolar,
  bench: iconBench,
  river: iconRiver,
  boat: iconBoat,
  passerelle: iconPasserelle
};

export const ENERGY_POINTS = [
  { id: "piezo-1", type: "piezo", coords: [16.358, 48.21] },
  { id: "solar-1", type: "solar", coords: [16.365, 48.212] },
  { id: "bench-1", type: "bench", coords: [16.37, 48.208] },
  { id: "boat-1", type: "boat", coords: [16.39607969849243, 48.23627216501569] },
  { id: "passerelle-1", type: "passerelle", coords: [16.38950562530448, 48.2436468978519] }
];

export const RIVER_POINT = {
  id: "river-1",
  type: "river",
  coords: [16.408246509133562, 48.226081015831085]
};
