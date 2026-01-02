import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapOverlay from "./MapOverlay";
import {
  MAPBOX_TOKEN,
  MAP_STYLE_DAY,
  MAP_STYLE_NIGHT,
  MAP_VIEW,
  ENERGY_POINTS,
  RIVER_POINT
} from "../config/mapConfig";

export default function MapContainer({ mode }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [riverMarker, setRiverMarker] = useState(null);

  const projectAll = useCallback((map) => {
    if (!map) return;
    setMarkers(
      ENERGY_POINTS.map((point) => {
        const { x, y } = map.project(point.coords);
        return { ...point, x, y };
      })
    );

    const riverPos = map.project(RIVER_POINT.coords);
    setRiverMarker({ ...RIVER_POINT, x: riverPos.x, y: riverPos.y });
  }, []);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAP_STYLE_DAY,
      center: MAP_VIEW.center,
      zoom: MAP_VIEW.zoom,
      bearing: MAP_VIEW.bearing,
      pitch: MAP_VIEW.pitch,
      antialias: true,
      maxBounds: MAP_VIEW.bounds
    });

    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    mapRef.current = map;

    map.on("load", () => projectAll(map));
    map.on("move", () => projectAll(map));
    map.on("zoom", () => projectAll(map));
    map.on("click", (e) => {
      console.log("Coordinates:", e.lngLat.lng, e.lngLat.lat);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [projectAll]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const style = mode === "night" ? MAP_STYLE_NIGHT : MAP_STYLE_DAY;

    map.setStyle(style);
    map.once("styledata", () => projectAll(map));
  }, [mode, projectAll]);

  return (
    <>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
      <MapOverlay markers={markers} riverMarker={riverMarker} />
    </>
  );
}
