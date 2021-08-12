import { useState, CSSProperties, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { DragItem } from "./interfaces"
import update from 'immutability-helper'
import Brick from "./Brick";

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

        setHanguls(prevState => ({
            ...prevState,

            [idx]: {
                top: top,
                left: left,
                from: "target",
                hangul: hangul,
                id: idx
            }

        }));
    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.HANGUL,
        drop(item: DragItem) {
            if (item.from == "source")
                addHangul(item.hangul, item.top, item.left)
        },
        collect: monitor => ({ isOver: !!monitor.isOver() }),
    })


    const combineHangul = []
    for (let key in hanguls) {
        combineHangul.push(<Brick key={hanguls[key].id} hangul={hanguls[key].hangul} left={hanguls[key].left} top={hanguls[key].top} from="target" />)
    }


    return (
        <div style={{
            backgroundColor: isOver ? 'rgb(182, 199, 151)' : 'gray',
            margin: 12,
            padding: 12,

        }} ref={drop}>
            <h2>Target</h2>
            <div
                style={{
                    display: 'flex'
                }}
            >
                {combineHangul}
            </div>
            <button onClick={() => setHanguls({})}>
                Clear
            </button>
        </div>
    )
}