import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

import Brick from "./Brick";

export interface TargetProps {
}

export default function Target(params: TargetProps) {

    const [hanguls, setHanguls] = useState<Array<string>>([])

    function addHangul(t: string) {
        setHanguls(oldItem => [...oldItem, t])
    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.HANGUL,
        drop(item) { addHangul(item.t) },
        collect: monitor => ({ isOver: !!monitor.isOver() }),
    })


    // Use local variable instead of useRef cause variable resets to 0 and align with letters count
    // , useRef stores the vale and keep changing the index
    let uniqueKey = 0;
    const combineHangul = hanguls.map((hangul) => <Brick key={`${hangul}${uniqueKey++}`} hangul={hangul} />)

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
        </div>
    )
}