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
  const [isMobile, setIsMobile] = useState(false);

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
    const startZoom = isMobile ? Math.max(MAP_VIEW.zoom - 1.2, 10) : MAP_VIEW.zoom;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAP_STYLE_DAY,
      center: MAP_VIEW.center,
      zoom: startZoom,
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
  }, [projectAll, isMobile]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const style = mode === "night" ? MAP_STYLE_NIGHT : MAP_STYLE_DAY;

    map.setStyle(style);
    map.once("styledata", () => projectAll(map));
  }, [mode, projectAll]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const handleChange = (event) => setIsMobile(event.matches);
    handleChange(media);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const targetZoom = isMobile ? Math.max(MAP_VIEW.zoom - 1.2, 10) : MAP_VIEW.zoom;
    map.easeTo({ zoom: targetZoom, duration: 600, easing: (t) => t * (2 - t) });
  }, [isMobile]);

  return (
    <>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
      <MapOverlay markers={markers} riverMarker={riverMarker} mode={mode} />
    </>
  );
}
