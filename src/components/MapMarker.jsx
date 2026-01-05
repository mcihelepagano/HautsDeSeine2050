import { motion as Motion } from "framer-motion";

export default function MapMarker({ x, y, icon, onClick, size = 32 }) {
  return (
    <>
      {/* Effetto GLOW */}
      <Motion.div
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "rgba(234, 41, 202, 0.25)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      {/* Icona vera */}
      <Motion.img
        src={icon}
        onClick={onClick}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.25 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: `${size}px`,
          height: `${size}px`,
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      />
    </>
  );
}
