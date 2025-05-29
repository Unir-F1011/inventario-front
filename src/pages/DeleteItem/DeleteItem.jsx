import { Button, Label, TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast"


const domain = process.env.REACT_DOMAIN_API

function DeleteItem() {
    const { state } = useLocation()
    console.log("hoo -> ", state)

    const deleteItem = () => {
        const url = `${domain}/stock`
        console.log("Ejecutado", url)
        showToast("Eliminado de producto completado", "success")
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
                        <Label htmlFor="name">Producto</Label>
                    </div>
                    <TextInput id="name" type="text" sizing="md" value={state.producto} readOnly />
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