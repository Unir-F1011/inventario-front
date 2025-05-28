import { Link as RouterLink } from "react-router-dom"

export const VerticalBar = () => {
    return (
        <aside id="verticalBar" className="fixed top-0 left-0 z-40 w-fit h-screen" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto sideBar">
                <ul className="space-y-2 font-medium">
                    <li>
                        <h1 className="text-white font-bold">Operaciones</h1>
                    </li>
                    <li>
                        <RouterLink to="/">
                            <span className="ms-3 text-white">Tabla</span>
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/order" >
                            <span className="flex-1 ms-3 whitespace-nowrap text-white">Crear Orden</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}