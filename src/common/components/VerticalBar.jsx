import { Link as RouterLink } from "react-router-dom"

export const VerticalBar = () => {
    return (
        <aside id="verticalBar" className="w-40 h-screen" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto sideBar">
                <ul className="space-y-2">
                    <li >
                        <h1 className="font-bold">Operaciones</h1>
                    </li>
                    <li className=" hover:bg-gray-500 hover:rounded-md w-full">
                        <RouterLink to="/">
                            <span className="ms-3">Tabla</span>
                        </RouterLink>
                    </li>

                    <li className=" hover:bg-gray-500 hover:rounded-md w-full">
                        <RouterLink to="/order" >
                            <span className="ms-3">Crear Orden</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}