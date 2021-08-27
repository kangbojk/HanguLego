import { memo } from "react";
import Brick from "./Brick";

export interface SourceProps {
    consonants: string
    vowels: string
}

function AreEqual(prev: SourceProps, next: SourceProps) {
    return prev.consonants === next.consonants && prev.vowels === next.vowels;
}

export const Source = memo(function Source({ consonants, vowels }) {
    // id will be set after dropped
    const c19 = consonants.split(" ").map((hangul) => <Brick key={hangul} id={''} hangul={hangul} left={0} top={0} from="source" />)
    const v21 = vowels.split(" ").map((hangul) => <Brick key={hangul} id={''} hangul={hangul} left={0} top={0} from="source" />)
    return (
        <div style={{
            backgroundColor: 'gray',
            margin: 12,
            padding: 12,
        }}>

            <div>
                <div style={{
                    display: 'flex'
                }}>
                    <span>Consonants</span>
                    {c19}
                </div>

                <div style={{
                    display: 'flex'
                }}>
                    <span>Vowels</span>
                    {v21}
                </div>

            </div>
        </div>
    )
}
    , AreEqual)