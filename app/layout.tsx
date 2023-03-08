import Head from "next/head";
import {ReactNode} from "react";
import Header from "../components/Header";
import 'styles/globals.css'

type Props = {
    children: ReactNode
}
export default function Layout({children}: Props) {
    return (
        <html lang="fr">
            <Head>
                <title>Board</title>
                <meta name="description" content="Board created by Daemon with Next" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
            <Header/>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )

}
