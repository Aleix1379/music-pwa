import React, {useEffect, useState} from 'react'
import {Album} from "../types/album";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import Link from "next/link";

interface AlbumProps {
    album: Album
    className?: string
}


const Album: React.FC<AlbumProps> = ({className, album: {id, title, artist, picture}}) => {
    const supabase = useSupabaseClient()
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        const {data} = supabase.storage
            .from('albums')
            .getPublicUrl(picture)
        setImage(data.publicUrl)
    }, [])

    return (
        <div className={className}>
            <Link href={`/albums/${id}`} className="block w-full sm:w-60 rounded overflow-hidden dark:bg-neutral-900">
                {image && <img className="w-full" src={image} alt={'album'}/>}
                <span className="block pl-2 pt-2 mb-1 text-sm">{title}</span>
                <span className="block pl-2 pt-1 pb-1 text-xs text-zinc-400">{artist.name}</span>
            </Link>
        </div>
    );
}

export default Album
