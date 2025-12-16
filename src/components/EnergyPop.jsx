import { motion as Motion} from "framer-motion";

export default function EnergyPop({ x, y, onClose, children }) {
  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      style={{
        position: "absolute",
        left: x,
        top: y - 40, // un po' sopra l’icona
        transform: "translate(-50%, -100%)",
        padding: "12px 16px",
        background: "rgba(20, 20, 20, 0.85)",
        color: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 12px rgba(0,255,180,0.4)",
        border: "1px solid rgba(0,255,200,0.4)",
        backdropFilter: "blur(6px)",
        minWidth: "180px",
        zIndex: 9999,
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "14px", lineHeight: "1.4" }}>{children}</div>

      <button
        onClick={onClose}
        style={{
          marginTop: "8px",
          width: "100%",
          border: "none",
          padding: "6px",
          cursor: "pointer",
          borderRadius: "8px",
          background: "rgba(0,255,200,0.2)",
          color: "#00ffd0",
        }}
      >
        Close
      </button>
    </Motion.div>
  );
}
