import { Button, Label, TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { ButtonCmp } from "../../common/components/Button";

function DeleteItem() {
    const { state } = useLocation()
    console.log("hoo -> ", state)

    const deleteItem = () => {
        console.log("Ejecutado")
    }

    return (
        <section className="bg-black min-w-md p-5 rounded-xl mt-20">
            <h1 className="text-white mb-1 flex justify-center font-bold">Eliminar producto</h1>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="id">ID</Label>
                </div>
                <TextInput id="id" type="text" sizing="md" value={state.id} readOnly />
            </div>

            <div className="flex justify-end mt-2 gap-2">
                <ButtonCmp path="/" name="Cancelar" />
                <Button size="sm" onClick={deleteItem}>Enviar</Button>
            </div>
        </section>
    )
}

export default DeleteItem