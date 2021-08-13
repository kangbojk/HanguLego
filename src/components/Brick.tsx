import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { CSSProperties } from 'react';

export interface BrickProps {
    hangul: string
    left: number
    top: number
    from: string
    id?: string
}

const style: CSSProperties = {
    margin: 6,
    cursor: 'move',
    position: 'relative',
}

export default function Brick(props: BrickProps) {
    const { hangul, top, left, from } = props;
    const fill = 'black'
    const stroke = 'white'

    //  depends on sent variable
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.HANGUL,
            item: { hangul, top, left, from },
            collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
        }), [top, left, from]
    )

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
        )
    }

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
    )
}

