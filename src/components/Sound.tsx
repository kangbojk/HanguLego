import React, { useState, useEffect } from "react";
import hangulJSON from "./scrapper/hangul.json"

export interface audioFn {
    (): void
}

const useAudio = (url: string) => {

    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle: audioFn = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return toggle
};

export default useAudio

export const AudioMap: { [key: string]: string } = hangulJSON