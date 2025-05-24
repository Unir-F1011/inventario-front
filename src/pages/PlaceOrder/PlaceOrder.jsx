import { Label, TextInput } from "flowbite-react";

function PlaceOrder() {


    return (
        <section className="bg-black w-100 p-5 rounded-xl">
            <h1 className="text-white">Crear Orden</h1>
            <div className="flex max-w-lg gap-10 items-top">
                <div>
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
                <div>

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
        </section>
    )
}

export default PlaceOrder