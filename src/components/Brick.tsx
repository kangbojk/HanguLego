import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { CSSProperties, useEffect } from "react";

import useAudio, { AudioMap } from "./Sound";

export interface BrickProps {
  hangul: string;
  left: number;
  top: number;
  from: string;
  id: string;
}

const style: CSSProperties = {
  margin: 6,
  cursor: "move",
  position: "relative",
};

export default function Brick(props: BrickProps) {
  const { id, hangul, top, left, from } = props;
  const fill = "black";
  const stroke = "white";

  const audioURL: string = AudioMap[hangul];
  const toggleAudio = useAudio(audioURL);

  //  pass required variables to drop target in dependency list
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.HANGUL,
      item: { id, hangul, top, left, from },
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }),
    [id, top, left, from]
  );

  useEffect(() => {
    if (audioURL && toggleAudio && isDragging) toggleAudio();
  }, [isDragging, audioURL, toggleAudio]);

  // add offset for movable brick
  if (from === "target") {
    return (
      <div
        style={{
          ...style,
          backgroundColor: fill,
          color: stroke,
          opacity: isDragging ? 0.5 : 1,
          left,
          top,
        }}
        ref={drag}
      >
        {hangul}
      </div>
    );
  }

  // oiginal bricks in source
  return (
    <div
      style={{
        ...style,
        backgroundColor: fill,
        color: stroke,
        margin: 6,
      }}
      ref={drag}
    >
      {hangul}
    </div>
  );
}
