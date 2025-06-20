    import { Outlet } from "react-router-dom"
    import BarraLateral from "../components/BarraLateral"

    export default function LayoutPanel() {
    return (
        <div className="flex min-h-screen">
        <BarraLateral />
        <div className="flex flex-col flex-1">
            <main className="bg-gray-100 flex-1 ml-72">
            <Outlet />
            </main>
        </div>
        </div>
    )
    }
