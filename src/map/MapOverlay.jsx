import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import MapMarker from "../components/MapMarker";
import MarkerPanel from "../components/MarkerPanel";
import { MAP_DESCRIPTIONS } from "../config/mapDescriptions";
import { ICONS } from "../config/mapConfig";
import { MAP_SOUNDS } from "../config/mapSounds";

export default function MapOverlay({ markers, riverMarker, mode }) {
  const [activePopup, setActivePopup] = useState(null);
  const soundRef = useRef(null);

  const stopSound = () => {
    if (!soundRef.current) return;
    soundRef.current.stop();
    soundRef.current = null;
  };

  const playSound = (type) => {
    const sound = MAP_SOUNDS[type];
    if (!sound) return;

    soundRef.current = new Howl({
      src: [sound.src],
      loop: sound.loop,
      volume: sound.volume
    });
    soundRef.current.play();
  };

  useEffect(() => {
    return () => stopSound();
  }, []);

  const handleMarkerClick = (marker) => {
    stopSound();
    setActivePopup({ ...marker });
    playSound(marker.type);
  };

  const handleRiverClick = () => {
    if (!riverMarker) return;
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

  return (
    <>
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
        {visibleMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            x={marker.x}
            y={marker.y}
            icon={ICONS[marker.type]}
            size={
              marker.type === "hydra"
                ? 64
                : ["sols", "piste", "lamp", "geotherm"].includes(marker.type)
                  ? 40
                  : 32
            }
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {riverMarker && (
          <MapMarker
            key={riverMarker.id}
            x={riverMarker.x}
            y={riverMarker.y}
            icon={ICONS.river}
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
