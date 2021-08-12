import { memo } from "react";
import Brick from "./Brick";

export interface SourceProps {
    hanguls: string
}

function AreEqual(prev: SourceProps, next: SourceProps) {
    return prev.hanguls === next.hanguls;
}

export const Source = memo(function Source({ hanguls }) {
    const letters = hanguls.split(" ").map((hangul) => <Brick key={hangul} hangul={hangul} />)
    return (
        <div style={{
            backgroundColor: 'gray',
            margin: 12,
            padding: 12,
        }}>

            <h2>Source</h2>
            <div
                style={{
                    display: 'flex'
                }}
            >
                {letters}
            </div>
        </div>
    )
}
    , AreEqual)