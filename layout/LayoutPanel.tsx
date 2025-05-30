    import { Outlet } from "react-router-dom"
    import BarraLateral from "../components/BarraLateral"
    import Encabezado from "../components/Encabezado"

    export default function LayoutPanel() {
    return (
        <div className="flex min-h-screen">
        <BarraLateral />
        <div className="flex flex-col flex-1">
            <Encabezado />
            <main className=" bg-gray-100 flex-1">
            <Outlet />
            </main>
        </div>
        </div>
    )
    }
