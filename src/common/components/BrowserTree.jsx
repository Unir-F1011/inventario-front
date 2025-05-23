import { Route, Routes } from "react-router-dom"
import Dashboard from "../../pages/Dashboard/Dashboard"
import PlaceOrder from "../../pages/PlaceOrder/PlaceOrder"
import SendClient from "../../pages/SendClient/SendClient"
import DeleteItem from "../../pages/DeleteItem/DeleteItem"



export const BrowserTree = () => {

    return (
        <section className="mx-auto mt-[10%] w-auto">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/order" element={<PlaceOrder />} />
                <Route path="/delete" element={<DeleteItem />} />
                <Route path="/client" element={<SendClient />} />
            </Routes>
        </section>

    )
}