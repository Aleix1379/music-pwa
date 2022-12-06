import React, {useEffect, useRef, useState} from 'react'
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Album} from "../types/album";
import Button from "./button";
import ProgressBar from "./progressBar";

interface PlayerProps {
}

const Player: React.FC<PlayerProps> = () => {
    const supabase = useSupabaseClient()

    const audioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio("") : undefined
    )
    const intervalRef = useRef<NodeJS.Timeout>();

    const [cover, setCover] = React.useState<string | null>(null)
    const [currentSongIndex, setCurrentSongIndex] = React.useState<number | null>(null)
    const [state, setState] = React.useState<'playing' | 'paused' | 'stopped'>('stopped')
    const [trackProgress, setTrackProgress] = useState(0);

    // TODO: Load songs from local store
    const [album, setAlbum] = React.useState<Album>({
        "id": 1,
        "title": "Älä pelkää elämää",
        "picture": "ala pelkaa elamaa.webp",
        artist: {
            "id": 1,
            "name": "Haloo Helsinki!",
            "picture": "haloo-helsinki.jpg"
        }
    })

    const [songs] = React.useState<Array<any>>([
        {
            "id": 1,
            "title": "Foliohattukauppias",
            "duration": 338,
            "track": 1,
            "filename": "Foliohattukauppias.mp3"
        }, {"id": 2, "title": "Reiviluola", "duration": 247, "track": 2, "filename": "Reiviluola.mp3"}, {
            "id": 3,
            "title": "Lady Domina",
            "duration": 206,
            "track": 3,
            "filename": "Lady Domina.mp3"
        }, {
            "id": 4,
            "title": "Piilotan mun kyyneleet",
            "duration": 268,
            "track": 4,
            "filename": "Piilotan Mun Kyyneleet.mp3"
        }, {"id": 5, "title": "Älä länkytä", "duration": 227, "track": 5, "filename": "Ala lankyta.mp3"}, {
            "id": 6,
            "title": "Tulikärpäset",
            "duration": 255,
            "track": 6,
            "filename": "Tulikarpaset.mp3"
        }, {"id": 7, "title": "Kukkameri", "duration": 218, "track": 7, "filename": "Kukkameri.mp3"}, {
            "id": 8,
            "title": "Tahdon",
            "duration": 245,
            "track": 8,
            "filename": "Tahdon.mp3"
        }, {"id": 9, "title": "Kerran kuussa", "duration": 265, "track": 9, "filename": "Kerran Kuussa.mp3"}, {
            "id": 10,
            "title": "Pelikaani",
            "duration": 278,
            "track": 10,
            "filename": "Pelikaani.mp3"
        }, {"id": 11, "title": "Alä pelkää elämää", "duration": 298, "track": 11, "filename": "Ala pelkaa elamaa.mp3"}])

    useEffect(() => {
        // setAudio(new Audio())
    }, [])

    useEffect(() => {
        if (album) {
            const {data} = supabase.storage
                .from('albums')
                .getPublicUrl(album.picture)
            setCover(data.publicUrl)
        }
    }, [album])

    useEffect(() => {
        if (state === 'playing') {
            //audioRef.current?.play().catch(err => console.log(err))
            startTimer()
        } else {
            // clearInterval(intervalRef.current)
            // pauseSong()
        }
    }, [state])

    useEffect(() => {
        console.info('use effect currentSongIndex', currentSongIndex)
        if (currentSongIndex !== null) {
            playSong().catch(err => console.log(err))
        }
        // playSong().catch(err => console.log(err))
    }, [currentSongIndex])

    const playSong = async () => {
        console.info('playSong')
        if (currentSongIndex === null) {
            setCurrentSongIndex(0)
            return
        }

        try {
            console.info('currentSongIndex', currentSongIndex)
            const songUrl = album.artist.id + '/' + album.id + '/' + songs[currentSongIndex].filename
            console.info('songUrl', '->' + songUrl + '<-')
            const {data, error} = await supabase.storage
                .from('music')
                .createSignedUrl(songUrl, 60 * 60 * 24)

            if (error) {
                console.error('error creating signed url', error)
                return
            }

            if (!data || !audioRef.current) {
                return
            }

            console.info('state ===>', state)
            //if (state === 'stopped') {
            console.info('data?.signedUrl', data?.signedUrl)
            audioRef.current.setAttribute('src', data?.signedUrl)
            //}

            audioRef.current.play().catch(err => console.error(err))
            setState('playing')
        } catch (e) {
            console.error(e)
        }
    }

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            setState('paused')
        }
    }

    const startTimer = () => {
        //clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (!audioRef.current) {
                return
            }

            if (audioRef.current.ended) {
                console.info('toNextTrack...')
                toNextTrack();
            } else {
                //    console.info('audioRef.current.currentTime', audioRef.current.currentTime)
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    }

    const toNextTrack = () => {
        setCurrentSongIndex((prevState: any) => {
            console.info('to next track', prevState)
            if (prevState === null) {
                // console.info('prevState === null  -> 0')
                // return 0
                return null
            } else if (prevState < songs.length - 1) {
                return prevState + 1
            } else if (prevState === songs.length - 1) {
                console.info('last..........................')
                setState('stopped')
                pauseSong()
                return null
            }
        })

    }

    const toPrevTrack = () => {
        if (currentSongIndex === null) {
            setCurrentSongIndex(0)
        } else if (currentSongIndex > 0) {
            setCurrentSongIndex((prevState) => {
                console.info('to prev track', prevState)
                if (prevState === null) {
                    return 0
                }
                return prevState - 1
            })
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const getProgress = () => {
        if (!audioRef.current || isNaN(audioRef.current.duration)) {
            return 0
        }

        const percentage = (trackProgress / audioRef.current.duration) * 100;
        return Math.round(percentage);
    }

    return (
        <div
            className="flex flex-col p-4 bg-white dark:bg-zinc-800 border-t-2 border-zinc-700">

            <div className="flex items-center mb-4 relative">
                <div className="flex">
                    {cover && <img className="w-20 h-20" src={cover} alt={album.title}/>}

                    <div className="flex flex-col justify-center ml-4">
                        {currentSongIndex !== null &&
                            <span className="text-sm font-bold">{songs[currentSongIndex].title}</span>}
                        <span className="text-xs dark:text-zinc-400">{album.artist.name}</span>
                    </div>

                </div>

                <div className="flex ml-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                        {/*<Button onClick={() => playSong()} icon={'shuffle'} iconSize={'2xl'}/>*/}
                        <Button onClick={() => toPrevTrack()} icon={'backwardStep'} iconSize={'2xl'}/>
                        {state !== 'playing' &&
                            <Button onClick={() => playSong()} icon={'circlePlay'} iconSize={'2xl'}/>}
                        {state === 'playing' &&
                            <Button onClick={() => pauseSong()} icon={'circlePause'} iconSize={'2xl'}/>}
                        <Button onClick={() => toNextTrack()} icon={'forwardStep'} iconSize={'2xl'}/>
                </div>

                {/*       <div className="bg-blue-400 flex-1">
                settings
            </div>*/}
            </div>

            <div className="flex items-center pl-2 pr-2">
                <span className="w-16">{formatTime(trackProgress)}</span>
                <ProgressBar className="ml-3 mr-3" progress={getProgress()}/>
                <span className="w-16 text-right">{currentSongIndex !== null && formatTime(songs[currentSongIndex].duration)}</span>
            </div>

        </div>
    );
}

export default Player
