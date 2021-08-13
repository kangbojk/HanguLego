import { useState, CSSProperties, useRef, useCallback } from "react";
import { DropTargetMonitor, useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { DragItem } from "./interfaces"
import update from 'immutability-helper'
import Brick from "./Brick";

import * as hanguljs from 'hangul-js';

export interface TargetProps {
}

export default function Target(params: TargetProps) {
    const [hanguls, setHanguls] = useState<{
        [key: string]: {
            top: number
            left: number
            from: string
            hangul: string
            id: string
        }
    }>({})

    // local variable resets to 0 after render
    // useRef stores the previous vale
    const uniqueKey = useRef(0);

    function addHangul(hangul: string, top: number, left: number) {

        const idx = `${hangul}${uniqueKey.current++}`

        //check for duplicate?

        setHanguls(prevState => ({
            ...prevState,

            // use hangul as key for the time being -> no duplicate?
            [hangul]: {
                top: top,
                left: left,
                from: "target",
                hangul: hangul,
                id: idx
            }

        }));
    }

    //why useCallback -> store coord?
    const moveHangul = useCallback(
        (id: string, left: number, top: number) => {
            setHanguls(
                update(hanguls, { [id]: { $merge: { left, top } } })
            )
        }, [hanguls, setHanguls]
    )

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.HANGUL,
        drop(item: DragItem, monitor: DropTargetMonitor) {

            if (item.from == "source")
                addHangul(item.hangul, item.top, item.left)
            else {
                const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                moveHangul(item.hangul, left, top)
            }

        },
        collect: monitor => ({ isOver: !!monitor.isOver() }),
    })

    let letters = []
    let word = ""
    const combineHangul = []
    for (let key in hanguls) {
        combineHangul.push(
            <Brick key={hanguls[key].id} hangul={hanguls[key].hangul} left={hanguls[key].left} top={hanguls[key].top} from="target" />
        )
        letters.push(key)
    }
    word = hanguljs.assemble(letters)

    return (
        <div style={{
            backgroundColor: isOver ? 'rgb(182, 199, 151)' : 'gray',
            margin: 12,
            padding: 12,
        }} ref={drop}>
            <h2>👉 {word}</h2>
            <div style={{ display: 'flex', position: 'relative', }} >
                {combineHangul}
            </div>
            <button onClick={() => setHanguls({})}>
                Clear
            </button>
        </div>
    )
}