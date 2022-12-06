import React from 'react'
import {Song} from "../types/song";

interface SongProps {
    song: Song
    onclick: (id: number) => void
}

const Song: React.FC<SongProps> = ({song: {id, title, duration, track}, onclick}) => {
    const formatDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    return (
        <div className="pl-2 pr-2 pt-2 pb-2 flex items-center" role="button" onClick={() => onclick(id)}>
            <span className="text-zinc-400">{track}</span>
            <span className="block ml-3">{title}</span>
            <span className="text-zinc-400 ml-auto">{formatDuration(duration)}</span>
        </div>
    );
}

export default Song
