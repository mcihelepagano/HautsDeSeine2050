export default function ModeToggleButton({ mode, onToggle }) {
  const isDay = mode === "day";

  return (
    <button
      onClick={onToggle}
      aria-pressed={!isDay}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "10px 20px",
        borderRadius: "8px",
        background: isDay ? "#222" : "#fff",
        color: isDay ? "#fff" : "#000",
        zIndex: 999,
        cursor: "pointer"
      }}
    >
      {isDay ? "Night" : "Day"}
    </button>
  );
}
