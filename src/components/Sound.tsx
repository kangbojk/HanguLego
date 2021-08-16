import React, { useState, useEffect } from "react";

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

export const AudioMap: { [key: string]: string } = {
    "ㄱ": "https://90daykoreanaudiobytes.s3-us-west-1.amazonaws.com/audio-giyeok.mp3",
    "ㄲ": "https://90daykoreanaudiobytes.s3-us-west-1.amazonaws.com/audio-ssanggiyeok-new.mp3",
    "ㄴ": "https://90daykoreanaudiobytes.s3-us-west-1.amazonaws.com/audio-nieun-new.mp3",
}
