import { Button, Label, TextInput } from "flowbite-react";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast"

function PlaceOrder() {

    const makeOrder = () => {
        console.log("Ejecuto")
        showToast("Orden creada satisfactoriamente", "success")
    }

    return (
        <section className="bg-black px-auto p-4 mt-20 rounded-xl">
            <h1 className="text-white flex justify-center mb-5 mt-2">Crear Orden</h1>
            <div className="flex min-w-md gap-10 items-top">

                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-white mb-1"> Datos del Producto</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="producto">Producto</Label>
                        </div>
                        <TextInput id="producto" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="color">Color</Label>
                        </div>
                        <TextInput id="color" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoria">Categoría</Label>
                        </div>
                        <TextInput id="categoria" type="text" sizing="md" />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="color">Precio</Label>
                        </div>
                        <TextInput id="color" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="total">Total</Label>
                        </div>
                        <TextInput id="total" type="number" step={1} min={0} sizing="md" />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-white mb-1">Datos del proveedor</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nombre">Nombre</Label>
                        </div>
                        <TextInput id="nombre" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Email</Label>
                        </div>
                        <TextInput id="email" type="email" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="telefono">Teléfono</Label>
                        </div>
                        <TextInput id="telefono" type="tel" sizing="md" />
                    </div>

                </div>
            </div>
            <div className="flex justify-end mt-10 gap-2">
                <ButtonCmp path="/" name="Cancelar" />
                <Button size="sm" onClick={makeOrder}>Enviar</Button>
            </div>
        </section>
    )
}

export default PlaceOrder