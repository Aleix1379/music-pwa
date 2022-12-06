import React from "react"
import Player from "./player"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div id="layout" className="flex flex-col h-screen">
            <main className="flex-1 overflow-auto">{children}</main>
            <Player/>
        </div>
    )
}

export default Layout
