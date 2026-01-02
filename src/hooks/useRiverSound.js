import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const SOUND_PATH = "/sounds/river.mp3";

export default function useRiverSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [SOUND_PATH],
      loop: true,
      volume: 0.6
    });

    return () => {
      soundRef.current?.stop();
    };
  }, []);

  const play = () => {
    if (!soundRef.current) return;
    soundRef.current.play();
    setIsPlaying(true);
  };

  const stop = () => {
    if (!soundRef.current) return;
    soundRef.current.stop();
    setIsPlaying(false);
  };

  return { play, stop, isPlaying };
}
