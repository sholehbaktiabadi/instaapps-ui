import { ReactNode } from "react"
import AppNavbar from "./navbar"

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <AppNavbar />
            <div className="flex flex-col h-screen">
                <div className="flex flex-row h-full m-10">
                    <div className="flex-auto">{children}</div>
                </div>
            </div>
        </>
    )
}