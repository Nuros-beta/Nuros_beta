import { useEffect, useState } from "react";
import { useVideoContext } from "context/VideoProvider";

export default function useDominantSpeaker() {
  const { room } = useVideoContext();
  const [dominantSpeaker, setDominantSpeaker] = useState(room?.dominantSpeaker);

  useEffect(() => {
    if (!room) return;
    room.on("dominantSpeakerChanged", setDominantSpeaker);
    return () => {
      room.off("dominantSpeakerChanged", setDominantSpeaker);
    };
  }, [room]);

  return dominantSpeaker;
}