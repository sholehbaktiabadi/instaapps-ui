import { ReactNode } from "react"
import AppNavbar from "./navbar"
import SideBar from "./sidebar"

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <AppNavbar />
            <div className="flex flex-row min-h-screen pt-20 px-20">
                <div className="basis-1/3">{<SideBar />}</div>
                <div className="basis-1/6" />
                <div className="flex-auto">{children}</div>
            </div>
        </>
    )
}