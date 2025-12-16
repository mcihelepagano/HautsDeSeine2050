import { useState } from "react";
import MapView from "./MapView";

export default function App() {
  const [mode, setMode] = useState("day");

  return (
    <>
      <button
        onClick={() => setMode(mode === "day" ? "night" : "day")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          background: mode === "day" ? "#222" : "#fff",
          color: mode === "day" ? "#fff" : "#000",
          zIndex: 999,
          cursor: "pointer"
        }}
      >
        {mode === "day" ? "🌙 Night" : "🌞 Day"}
      </button>

      <MapView mode={mode} />
    </>
  );
}
