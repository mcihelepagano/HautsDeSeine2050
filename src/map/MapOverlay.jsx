import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import MapMarker from "../components/MapMarker";
import MarkerPanel from "../components/MarkerPanel";
import { MAP_DESCRIPTIONS } from "../config/mapDescriptions";
import { ICONS } from "../config/mapConfig";
import { MAP_SOUNDS } from "../config/mapSounds";

export default function MapOverlay({
  markers,
  riverMarker,
  mode,
  forcedPopup,
  onUserInteract
}) {
  const [activePopup, setActivePopup] = useState(null);
  const [activeSoundType, setActiveSoundType] = useState(null);
  const soundRef = useRef(null);
  const lastForcedIdRef = useRef(null);

  const stopSound = () => {
    if (!soundRef.current) {
      setActiveSoundType(null);
      return;
    }
    soundRef.current.stop();
    soundRef.current = null;
    setActiveSoundType(null);
  };

  const playSound = (type) => {
    const sound = MAP_SOUNDS[type];
    if (!sound) return;

    const soundInstance = new Howl({
      src: [sound.src],
      loop: sound.loop,
      volume: sound.volume
    });
    soundRef.current = soundInstance;
    setActiveSoundType(type);

    const clearIfCurrent = () => {
      if (soundRef.current !== soundInstance) return;
      setActiveSoundType(null);
    };

    soundInstance.on("stop", clearIfCurrent);
    soundInstance.on("loaderror", clearIfCurrent);
    if (!sound.loop) {
      soundInstance.on("end", clearIfCurrent);
    }

    soundInstance.play();
  };

  useEffect(() => {
    return () => stopSound();
  }, []);

  const handleMarkerClick = (marker) => {
    if (onUserInteract) onUserInteract();
    stopSound();
    setActivePopup({ ...marker });
    playSound(marker.type);
  };

  const handleRiverClick = () => {
    if (!riverMarker) return;
    if (onUserInteract) onUserInteract();
    stopSound();
    setActivePopup({ ...riverMarker, type: "river" });
    playSound("river");
  };

  const showInDay = new Set(["solar", "arbres"]);
  const showInNight = new Set(["lamp", "piste"]);

  const visibleMarkers = markers.filter((marker) => {
    if (mode === "day") return !showInNight.has(marker.type);
    if (mode === "night") return !showInDay.has(marker.type);
    return true;
  });

  useEffect(() => {
    if (!forcedPopup) {
      if (lastForcedIdRef.current && activePopup?.id === lastForcedIdRef.current) {
        stopSound();
        setActivePopup(null);
      }
      lastForcedIdRef.current = null;
      return;
    }

    const forcedId = forcedPopup.id || forcedPopup.type;
    lastForcedIdRef.current = forcedId;
    stopSound();
    setActivePopup({ ...forcedPopup });
    if (forcedPopup.type) {
      playSound(forcedPopup.type);
    }
  }, [forcedPopup]);

  return (
    <>
      {activeSoundType && (
        <div className="sound-indicator" role="status" aria-live="polite">
          <span className="sound-indicator__pulse" aria-hidden="true" />
          <svg
            className="sound-indicator__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M3 9.5v5h3.6l4.4 3.6V5.9L6.6 9.5H3zm11.2-1.9a6 6 0 0 1 0 8.8m2.8-11.6a9.5 9.5 0 0 1 0 14.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
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
        {visibleMarkers.map((marker) => {
          const isLarge = marker.type === "hydra";
          const isMedium = [
            "sols",
            "piste",
            "lamp",
            "geotherm",
            "boat",
            "passerelle",
            "piezo",
            "bench",
            "solar"
          ].includes(marker.type);

          return (
            <MapMarker
              key={marker.id}
              x={marker.x}
              y={marker.y}
              type={marker.type}
              icon={ICONS[marker.type]}
              size={isLarge ? 64 : isMedium ? 40 : 32}
              onClick={() => handleMarkerClick(marker)}
            />
          );
        })}

        {riverMarker && (
          <MapMarker
            key={riverMarker.id}
            x={riverMarker.x}
            y={riverMarker.y}
            type="river"
            icon={ICONS.river}
            size={40}
            onClick={handleRiverClick}
          />
        )}
      </div>

      {activePopup && MAP_DESCRIPTIONS[activePopup.type] && (
        <MarkerPanel
          title={MAP_DESCRIPTIONS[activePopup.type].title}
          body={MAP_DESCRIPTIONS[activePopup.type].body}
          image={MAP_DESCRIPTIONS[activePopup.type].image}
          onClose={() => {
            stopSound();
            setActivePopup(null);
          }}
        />
      )}
    </>
  );
}
