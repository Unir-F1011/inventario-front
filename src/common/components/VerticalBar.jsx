import { Link as RouterLink } from "react-router-dom"

export const VerticalBar = () => {
    return (
        <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
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