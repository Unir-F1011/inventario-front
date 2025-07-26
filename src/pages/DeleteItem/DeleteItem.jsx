import { Button, Label, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast"
import DoRequest from "../../common/services/services";


const domain = import.meta.env.VITE_API_URL

function DeleteItem() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const deleteItem = async () => {
        const url = `${domain}/ms-operator/v1/items/${state.id}`
        const resp = await DoRequest(url, "DELETE")
        if (resp.status == 201) {
            showToast("Eliminado de producto completado", "success")
        } else {
            showToast("Error eliminado articulo", "error")
        }
        navigate("/")
    }

    return (
        <section className="table p-4 rounded-xl mt-20">
            <h1 className="mb-2 flex justify-center font-bold">Eliminar producto</h1>
            <div className="flex gap-10 items-top">

                <div className="flex flex-col w-full gap-2">
                    <div className="mb-2 block">
                        <Label htmlFor="id">ID</Label>
                    </div>
                    <TextInput id="id" type="text" sizing="md" value={state.id} readOnly />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <div className="mb-2 block">
                        <Label htmlFor="product">Producto</Label>
                    </div>
                    <TextInput id="product" type="text" sizing="md" value={state.product} readOnly />
                </div>
            </div>


            <div className="flex justify-end mt-10 gap-2">
                <ButtonCmp path="/" name="Cancelar" />
                <Button size="sm" onClick={deleteItem} className="table__body-buttons">Enviar</Button>
            </div>
        </section>
    )
}

export default DeleteItem