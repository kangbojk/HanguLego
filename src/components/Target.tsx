import { useState, CSSProperties, useRef, useCallback, useEffect } from "react";
import { DropTargetMonitor, useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";
import Brick from "./Brick";

import * as hanguljs from "hangul-js";

export interface TargetProps {}

interface DragItem {
  id: string;
  from: string;
  hangul: string;
  top: number;
  left: number;
}

const btnStyle: CSSProperties = {
  margin: 2,
};

export default function Target(params: TargetProps) {
  const [hanguls, setHanguls] = useState<{
    [key: string]: {
      top: number;
      left: number;
      from: string;
      hangul: string;
      id: string;
    };
  }>({});

  // local variable resets to 0 after render
  // useRef stores the previous vale
  const uniqueKey = useRef(0);

  function addHangul(hangul: string, top: number, left: number) {
    const idx = `${hangul}${uniqueKey.current++}`;

    setHanguls((prevState) => ({
      ...prevState,

      // use "hangul+idx" as key, so word like 밥 can have duplicate letters ㅂ
      [idx]: {
        top: top,
        left: left,
        from: "target",
        hangul: hangul,
        id: idx,
      },
    }));
  }

  // cache moveHangul during re-rendering, ie: dragging hangul to modify position in Target box
  const moveHangul = useCallback(
    (id: string, left: number, top: number) => {
      setHanguls(update(hanguls, { [id]: { $merge: { left, top } } }));
    },
    [hanguls, setHanguls]
  );

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.HANGUL,
    drop(item: DragItem, monitor: DropTargetMonitor) {
      if (item.from == "source") addHangul(item.hangul, item.top, item.left);
      else {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveHangul(item.id, left, top);
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  let letters = [];
  let word = "";
  const combineHangul = [];
  for (let key in hanguls) {
    combineHangul.push(
      <Brick
        key={key}
        id={key}
        hangul={hanguls[key].hangul}
        left={hanguls[key].left}
        top={hanguls[key].top}
        from="target"
      />
    );
    letters.push(hanguls[key].hangul);
  }
  word = hanguljs.assemble(letters);

  const wordURL = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${word}&tl=ko-KR`;

  const msg = new SpeechSynthesisUtterance(word);
  msg.lang = "ko-KR";
  msg.rate = 0.5;

  return (
    <div
      style={{
        backgroundColor: isOver ? "rgb(182, 199, 151)" : "gray",
        margin: 12,
        padding: 12,
      }}
      ref={drop}
    >
      <meta name="referrer" content="no-referrer"></meta>
      <h2>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.speechSynthesis.speak(msg);
          }}
        >
          👉
        </span>{" "}
        {word}
      </h2>
      <div style={{ display: "flex", position: "relative" }}>
        {combineHangul}
      </div>
      <button style={btnStyle} onClick={() => setHanguls({})}>
        Clear
      </button>
      <button
        style={btnStyle}
        onClick={() => {
          const togglePronunciation = new Audio(wordURL);
          togglePronunciation.play();
        }}
      >
        ▶
      </button>
    </div>
  );
}
