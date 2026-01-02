import { useState } from "react";
import ModeToggleButton from "./components/ModeToggleButton";
import MapContainer from "./map/MapContainer";

export default function App() {
  const [mode, setMode] = useState("day");

  return (
    <>
      <ModeToggleButton
        mode={mode}
        onToggle={() => setMode(mode === "day" ? "night" : "day")}
      />
      <MapContainer mode={mode} />
    </>
  );
}
