import { motion as Motion } from "framer-motion";

const DRIFT_TYPES = new Set(["river", "boat", "passerelle", "piste"]);
const BREATHE_TYPES = new Set(["arbres", "sols"]);
const PULSE_TYPES = new Set(["piezo", "solar", "bench", "hydra", "geotherm", "lamp"]);

const DRIFT_PRESETS = {
  river: { duration: 18, x: [-6, 6, -6], y: [2, -2, 2] },
  boat: { duration: 14, x: [-5, 5, -5], y: [1.5, -1.5, 1.5] },
  passerelle: { duration: 16, x: [-4, 4, -4], y: [2, -2, 2] },
  piste: { duration: 12, x: [-3, 3, -3], y: [1.5, -1.5, 1.5] }
};

const BREATHE_PRESETS = {
  arbres: { duration: 9, scale: [1, 1.06, 1], opacity: [1, 0.92, 1] },
  sols: { duration: 11, scale: [1, 1.04, 1], opacity: [1, 0.9, 1] }
};

const PULSE_PRESETS = {
  piezo: { duration: 3.2, delay: 0 },
  solar: { duration: 3.4, delay: 0.3 },
  bench: { duration: 3.6, delay: 0.6 },
  hydra: { duration: 3.1, delay: 0.15 },
  geotherm: { duration: 3.8, delay: 0.45 },
  lamp: { duration: 3.3, delay: 0.25 }
};

const getAnimationPreset = (type) => {
  if (DRIFT_TYPES.has(type)) {
    const preset = DRIFT_PRESETS[type] || DRIFT_PRESETS.river;
    return {
      icon: {
        animate: { x: preset.x, y: preset.y },
        transition: {
          duration: preset.duration,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };
  }

  if (BREATHE_TYPES.has(type)) {
    const preset = BREATHE_PRESETS[type] || BREATHE_PRESETS.arbres;
    return {
      icon: {
        animate: { scale: preset.scale, opacity: preset.opacity },
        transition: {
          duration: preset.duration,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };
  }

  if (PULSE_TYPES.has(type)) {
    const preset = PULSE_PRESETS[type] || PULSE_PRESETS.piezo;
    return {
      icon: {
        animate: { scale: [1, 1.08, 1], opacity: [1, 0.85, 1] },
        transition: {
          duration: preset.duration,
          delay: preset.delay,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      aura: {
        animate: { scale: [1, 1.25, 1], opacity: [0.18, 0.35, 0.18] },
        transition: {
          duration: preset.duration,
          delay: preset.delay,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };
  }

  return null;
};

export default function MapMarker({ x, y, icon, onClick, size = 32, type }) {
  const animation = getAnimationPreset(type);
  const auraSize = Math.max(size * 1.6, 36);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }}
    >
      {animation?.aura && (
        <Motion.div
          animate={animation.aura.animate}
          transition={animation.aura.transition}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${auraSize}px`,
            height: `${auraSize}px`,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "rgba(255, 215, 120, 0.25)",
            filter: "blur(10px)",
            pointerEvents: "none"
          }}
        />
      )}

      <Motion.img
        src={icon}
        onClick={onClick}
        initial={{ scale: 1 }}
        animate={animation?.icon?.animate}
        transition={animation?.icon?.transition}
        whileHover={{ scale: 1.2 }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: "pointer",
          zIndex: 10,
          pointerEvents: "auto"
        }}
      />
    </div>
  );
}
