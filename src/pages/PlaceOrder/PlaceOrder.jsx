import { Button, Label, TextInput } from "flowbite-react";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast"
import { useNavigate } from "react-router-dom";


const domain = process.env.REACT_DOMAIN_API

function PlaceOrder() {
    const navigate = useNavigate()

    const makeOrder = () => {
        const url = `${domain}/oreder`
        console.log("Ejecuto", url)
        showToast("Orden creada satisfactoriamente", "success")
        navigate("/")
    }

    return (
        <section className="table px-auto p-4 mt-20 rounded-xl">
            <h1 className="flex justify-center mb-5 mt-2">Crear Orden</h1>
            <div className="flex min-w-md gap-10 items-top">

                <div className="flex flex-col w-full gap-2">
                    <h1 className="mb-1"> Datos del Producto</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="product">Producto</Label>
                        </div>
                        <TextInput id="product" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="color">Color</Label>
                        </div>
                        <TextInput id="color" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="category">Categoría</Label>
                        </div>
                        <TextInput id="category" type="text" sizing="md" />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price">Precio</Label>
                        </div>
                        <TextInput id="price" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="total">Total</Label>
                        </div>
                        <TextInput id="total" type="number" step={1} min={0} sizing="md" />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h1 className="mb-1">Datos del proveedor</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name">Nombre</Label>
                        </div>
                        <TextInput id="name" type="text" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Email</Label>
                        </div>
                        <TextInput id="email" type="email" sizing="md" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="tel">Teléfono</Label>
                        </div>
                        <TextInput id="tel" type="tel" sizing="md" />
                    </div>

                </div>
            </div>
            <div className="flex justify-end mt-10 gap-2">
                <ButtonCmp path="/" name="Cancelar" />
                <Button size="sm" onClick={makeOrder} className="table_body-buttons">Enviar</Button>
            </div>
        </section>
    )
}

export default PlaceOrder