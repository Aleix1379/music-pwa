import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="theme-color" content="#fff"/>
            </Head>
            <body className="bg-white dark:bg-zinc-900">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
