import React, {useEffect, useState} from 'react'
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import Album from "../../components/album";

interface LibraryProps {
    session: any
}

const Index: React.FC<LibraryProps> = ({session}) => {
    const [albums, setAlbums] = useState<Array<any>>([])
    const supabase = useSupabaseClient()

    useEffect(() => {
        supabase
            .from('albums')
            .select(`id, title, picture, artist:artists!albums_artist_id_fkey (name)`)
            .then(({data, error}) => {
                if (error) {
                    console.error(error)
                    return
                }
                setAlbums(data)
            })
    }, [session])

    return (
        <div className="bg-gray-200 dark:bg-black">
            <h1>library</h1>
            <div className="grid grid-cols-2 sm:grid-flow-col sm:auto-cols-max sm:grid-cols-none">

                {
                    albums.map(album => (
                        <Album key={album.id} album={album} className="m-4 justify-self-center"/>
                    ))
                }

            </div>
        </div>
    );
}

export default Index
