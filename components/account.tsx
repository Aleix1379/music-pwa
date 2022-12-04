import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from "next/image";
import Link from "next/link";

export default function Account({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [artists, setArtists] = useState<any>(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        getProfile()
            .then(() => {
                console.info('downloadArtists')
                downloadArtists().catch(console.error)
            })
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function downloadArtists() {
        try {
            const { data } = await supabase.from('artists').select('*')
            // if (error) {
            //     throw error
            // }
            setArtists(data)
            const imageName = data && data[0].picture
            const response = supabase.storage.from('artists').getPublicUrl(imageName)
            console.info('response', response)
            console.info('response.data.publicUrl', response.data.publicUrl)
            setImage(response.data.publicUrl)

        } catch (error) {
            console.log('Error downloading image: ', error)
        }
    }

    return (
        <div className="form-widget">
            <h1 className="text-3xl font-bold underline">
                {artists && artists[0].name}
            </h1>
            {image && <Image src={image} width={400} height={400} alt={'image'}/>}

            <Link href={'/library'}>Library</Link>

            <div>
                <button className="button block" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}
