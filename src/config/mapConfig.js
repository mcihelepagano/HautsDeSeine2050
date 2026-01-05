import iconPiezo from "../icons/piezo.png";
import iconSolar from "../icons/solar.png";
import iconBench from "../icons/bench.png";
import iconRiver from "../icons/river.png";
import iconBoat from "../icons/boat-icon.png";
import iconPasserelle from "../icons/Passerelle.png";
import iconHydra from "../icons/centre-hydr.png";
import iconGeotherm from "../icons/geotherm.png";
import iconPisteCycl from "../icons/piste-cycl.png";
import iconLamp from "../icons/lampaiders.png";
import iconSols from "../icons/sols-permeable.png";
import iconArbres from "../icons/arbres.png";

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const MAP_STYLE_DAY = import.meta.env.VITE_MAPBOX_STYLE_DAY;
export const MAP_STYLE_NIGHT = import.meta.env.VITE_MAPBOX_STYLE_NIGHT;

export const MAP_VIEW = {
  center: [16.3738, 48.2082],
  zoom: 13.0,
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
  passerelle: iconPasserelle,
  hydra: iconHydra,
  geotherm: iconGeotherm,
  piste: iconPisteCycl,
  lamp: iconLamp,
  sols: iconSols,
  arbres: iconArbres
};

export const ENERGY_POINTS = [
  { id: "piezo-1", type: "piezo", coords: [16.39382263184521, 48.2162766864067] },
  { id: "solar-1", type: "solar", coords: [16.367652992176914, 48.23137697467379] },
  { id: "bench-1", type: "bench", coords: [16.389464101007633, 48.22941672119089] },
  { id: "boat-1", type: "boat", coords: [16.39607969849243, 48.23627216501569] },
  { id: "passerelle-1", type: "passerelle", coords: [16.38950562530448, 48.2436468978519] },
  { id: "hydra-1", type: "hydra", coords: [16.36897646492804, 48.24616698039807] },
  { id: "geotherm-1", type: "geotherm", coords: [16.40543625400457, 48.215890142496164] },
  { id: "piste-1", type: "piste", coords: [16.38891938177099, 48.22511475552568] },
  { id: "lamp-1", type: "lamp", coords: [16.386676179151266, 48.221886637218034] },
  { id: "sols-1", type: "sols", coords: [16.372346214869424, 48.22484014986861] },
  { id: "arbres-1", type: "arbres", coords: [16.377451446633614, 48.22563399090751] }
];

export const RIVER_POINT = {
  id: "river-1",
  type: "river",
  coords: [16.408246509133562, 48.226081015831085]
};
