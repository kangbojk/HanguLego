import React from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export interface BrickProps {
    hangul: string
    onPick?: (char: string) => void;
}

export default function Brick(props: BrickProps) {
    const { hangul } = props;
    const fill = 'black'
    const stroke = 'white'

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.HANGUL,
            item: { t: hangul },
            collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
        })
    )

    const handlePick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.onPick) {
            props.onPick(hangul)
        }
    }

    return (
        <div
            style={{
                backgroundColor: fill,
                color: stroke,
                width: '100%',
                height: '100%',
                margin: 6,
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
            }}
            ref={drag}
        >
            {hangul}
        </div>
    )
}

