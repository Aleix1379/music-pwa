import styles from '../styles/Home.module.css'
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import Index from "./library/index";

export default function Home() {
    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <div className={styles.container}>
                {!session ? (
                    <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark"/>
                ) : (
                    <Index session={session}/>
                )}
        </div>
    )
}
