import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Album} from "../../types/album";
import Song from "../../components/song";
import Button from "../../components/button";
import Layout from "../../components/layout";

interface AlbumProps {
}

interface AlbumState {
    album: Album | null
    songs: Array<Song>
}


const Album: React.FC<AlbumProps> = ({}) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const [album, setAlbum] = React.useState<Album>()
    const [songs, setSongs] = React.useState<AlbumState['songs']>([])
    const [cover, setCover] = React.useState<string | null>(null)

    useEffect(() => {
        const albumId = Number(router.query.id)
        if (router.query.id) {
            supabase
                .from('albums')
                .select(`id, title, picture, artist:artists!albums_artist_id_fkey (*)`)
                .eq('id', albumId)
                .then(({data, error}) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    setAlbum(data[0])
                })

            supabase
                .from('songs')
                .select(`id, title, duration, track, filename`)
                .eq('album_id', albumId)
                .order('track', {ascending: true})
                .then(({data, error}) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    setSongs(data)
                })
        }
    }, [router.query.id])

    useEffect(() => {
        if (album) {
            const {data} = supabase.storage
                .from('albums')
                .getPublicUrl(album.picture)
            setCover(data.publicUrl)
        }
    }, [album])

    const playAlbum = () => {
        const orderedSongs = songs.sort((a, b) => a.track - b.track)
        addToPlaylist(orderedSongs)
    }

    const shuffleAlbum = () => {
        const songsRandomOrder = songs.sort(() => Math.random() - 0.5)
        addToPlaylist(songsRandomOrder)
    }

    const playSong = (songId: number) => {
        const songsToPlay = songs.filter(song => song.id >= songId)
        addToPlaylist(songsToPlay)
    }

    const addToPlaylist = (songs: Array<Song>) => {
        console.info('Album: addToPlaylist', JSON.stringify(album))
        console.info('add to playlist:', JSON.stringify(songs))
    }

    return (
        <Layout>
            <div className="flex flex-col pb-10 bg-zinc-900">
                <div className="md:grid md:grid-cols-[500px_auto]">
                    {
                        cover &&
                        <div
                            className="ml-12 mr-12 mt-12 mb-6 self-center md:w-96 shadow-sm shadow-zinc-900 shadow-900">
                            <img className="rounded-xl" src={cover} alt={'Cover: ' + album?.title}/>
                        </div>
                    }

                    <div className="flex flex-col items-center  md:h-full relative">
                        <div
                            className="text-center md:text-left md:mt-auto md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:mb-auto md:self-start">
                            <h1 className="text-2xl md:text-3xl font-bold">{album?.title}</h1>
                            <h2 className="text-xl md:text-2xl font-bold text-purple-600">{album?.artist.name}</h2>
                        </div>

                        <div className="flex justify-between w-full md:w-auto md:mt-auto md:self-start md:mb-5">
                            <Button onClick={playAlbum} icon="play"
                                    className="w-full md:w-28 m-4 md:ml-0 rounded-xl">Play</Button>
                            <Button onClick={shuffleAlbum} icon="shuffle"
                                    className="w-full md:w-28 m-4 rounded-xl">Shuffle</Button>
                        </div>
                    </div>

                </div>
                <div className="w-full self-center md:self-start md:pl-12 md:pr-12">
                    {
                        songs.map(song => (
                            <Song key={song.id} song={song} onclick={playSong}/>
                        ))
                    }
                </div>
            </div>
        </Layout>
    );
}

export default Album
