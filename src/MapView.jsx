import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Howl } from "howler";
import "mapbox-gl/dist/mapbox-gl.css";

import MapMarker from "./components/MapMarker";
import EnergyPop from "./components/EnergyPop";

import iconPiezo from "./icons/piezo.png";
import iconSolar from "./icons/solar.png";
import iconBench from "./icons/bench.png";
import iconRiver from "./icons/river.png";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const STYLE_DAY = import.meta.env.VITE_MAPBOX_STYLE_DAY;
const STYLE_NIGHT = import.meta.env.VITE_MAPBOX_STYLE_NIGHT;

// Marker icons
const ICONS = {
  piezo: iconPiezo,
  solar: iconSolar,
  bench: iconBench,
  river: iconRiver
};

// Marker positions (energia futuristica)
const ENERGY_POINTS = [
  { id: "piezo-1", type: "piezo", coords: [16.358, 48.21] },
  { id: "solar-1", type: "solar", coords: [16.365, 48.212] },
  { id: "bench-1", type: "bench", coords: [16.37, 48.208] }
];

// Marker speciale per il fiume
const RIVER_POINT = {
  id: "river-1",
  type: "river",
  coords: [16.408246509133562, 48.226081015831085] // regolalo se vuoi spostarlo lungo il fiume
};

// Suono del fiume
const riverSound = new Howl({
  src: ["/sounds/river.mp3"],
  loop: true,
  volume: 0.6
});

export default function MapView({ mode }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const [markerPositions, setMarkerPositions] = useState([]); // piezo/solar/bench
  const [riverMarker, setRiverMarker] = useState(null);       // marker fiume (x,y)
  const [activePopup, setActivePopup] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);     // suono attivo (solo fiume per ora)

  // ===========================
  //   MAP INITIALIZATION
  // ===========================
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: STYLE_DAY,
      center: [16.3738, 48.2082],
      zoom: 12,
      bearing: 90,
      pitch: 0,
      antialias: true,
      maxBounds: [
        [16.15, 48.11],
        [16.6, 48.33]
      ]
    });

    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    mapRef.current = map;

    const updatePositions = () => {
      // proiettiamo i marker energia
      const energyPos = ENERGY_POINTS.map((p) => {
        const { x, y } = map.project(p.coords);
        return { ...p, x, y };
      });
      setMarkerPositions(energyPos);

      // proiettiamo il marker fiume
      const riverProj = map.project(RIVER_POINT.coords);
      setRiverMarker({
        ...RIVER_POINT,
        x: riverProj.x,
        y: riverProj.y
      });
    };

    map.on("load", updatePositions);
    map.on("click", (e) => {
    console.log("Coordinates:", e.lngLat.lng, e.lngLat.lat);
    });
    map.on("move", updatePositions);
    map.on("zoom", updatePositions);

    return () => {
      map.remove();
      mapRef.current = null;
      if (currentSound) {
        currentSound.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===========================
  //   STYLE SWITCH (DAY/NIGHT)
  // ===========================
  useEffect(() => {
    if (!mapRef.current) return;
    const style = mode === "night" ? STYLE_NIGHT : STYLE_DAY;

    mapRef.current.setStyle(style);

    mapRef.current.once("styledata", () => {
      const map = mapRef.current;
      if (!map) return;

      const energyPos = ENERGY_POINTS.map((p) => {
        const { x, y } = map.project(p.coords);
        return { ...p, x, y };
      });
      setMarkerPositions(energyPos);

      const riverProj = map.project(RIVER_POINT.coords);
      setRiverMarker({
        ...RIVER_POINT,
        x: riverProj.x,
        y: riverProj.y
      });
    });
  }, [mode]);

  // ===========================
  //          RENDER
  // ===========================
  return (
    <>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />

      {/* MARKERS OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        {/* Marker energia futuristica */}
        {markerPositions.map((m) => (
          <MapMarker
            key={m.id}
            x={m.x}
            y={m.y}
            icon={ICONS[m.type]}
            onClick={() => {
              // chiudi suono se attivo (es. fiume)
              if (currentSound) {
                currentSound.stop();
                setCurrentSound(null);
              }

              setActivePopup({
                id: m.id,
                x: m.x,
                y: m.y,
                type: m.type
              });
            }}
          />
        ))}

        {/* Marker del fiume */}
        {riverMarker && (
          <MapMarker
            key={riverMarker.id}
            x={riverMarker.x}
            y={riverMarker.y}
            icon={ICONS.river}
            onClick={() => {
              // se c'è già un suono attivo, fermalo
              if (currentSound) {
                currentSound.stop();
              }

              // apri popup dedicato al fiume
              setActivePopup({
                id: riverMarker.id,
                x: riverMarker.x,
                y: riverMarker.y,
                type: "river"
              });

              // avvia suono del fiume
              riverSound.play();
              setCurrentSound(riverSound);
            }}
          />
        )}
      </div>

      {/* POPUP FUTURISTICO */}
      {activePopup && (
        <EnergyPop
          x={activePopup.x}
          y={activePopup.y}
          onClose={() => {
            setActivePopup(null);
            if (currentSound) {
              currentSound.stop();
              setCurrentSound(null);
            }
          }}
        >
          {activePopup.type === "piezo" && (
            <>
              <b>Piezzoelectric Pavement</b>
              <br />
              Tiles that convert footsteps into clean electricity.
            </>
          )}

          {activePopup.type === "solar" && (
            <>
              <b>Transparent Solar Panels</b>
              <br />
              Produce up to 40 kWh/day.
            </>
          )}

          {activePopup.type === "bench" && (
            <>
              <b>Connected Bench</b>
              <br />
              Charge your phone using stored clean energy.
            </>
          )}

          {activePopup.type === "river" && (
            <>
              <b>River Soundscape</b>
              <br />
              Listen to the relaxing water flowing through the 2050 district.
            </>
          )}
        </EnergyPop>
      )}
    </>
  );
}
