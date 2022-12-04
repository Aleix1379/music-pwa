import styles from '../styles/Home.module.css'
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import Library from "./library";

export default function Home() {
    const play = () => {
        if (typeof Audio != "undefined") {
            console.info('new audio')
            const audio = new Audio('/music.mp3');
            audio.play().catch(error => {
                console.log('error play music', error);
                alert(error)
            });
        } else {
            console.info('no audio')
        }
    }

    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <div className={styles.container}>
                {!session ? (
                    <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark"/>
                ) : (
                    <Library session={session}/>
                )}
        </div>
    )
}
