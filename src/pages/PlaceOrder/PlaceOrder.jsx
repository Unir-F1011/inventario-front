import { Button, Label, TextInput } from "flowbite-react";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast"
import { useNavigate } from "react-router-dom";
import DoRequest from "../../common/services/services";
import { useRef } from "react";


const domain = import.meta.env.VITE_API_URL

function PlaceOrder() {
    const navigate = useNavigate()
    const product = useRef(null)
    const color = useRef(null)
    const category = useRef(null)
    const price = useRef(null)
    const total = useRef(null)
    const name = useRef(null)
    const email = useRef(null)
    const tel = useRef(null)
    const manufacturer = useRef(null)


    const makeOrder = async () => {
        const url = `${domain}/ms-operator/v1/orders`
        
        const payload = {
            "product": product.current.value,
            "color": color.current.value,
            "category": category.current.value,
            "price": parseFloat(price.current.value),
            "total": parseInt(total.current.value),
            "name": name.current.value,
            "email": email.current.value,
            "tel": tel.current.value,
            "manufacturer": manufacturer.current.value 
        }

        const resp = await DoRequest(url, "POST", payload)
        if (resp.status == 201) {
            showToast("Orden creada satisfactoriamente", "success")

        } else {
            showToast("Error creando orden", "error")
        }
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
                        <TextInput id="product" type="text" sizing="md" ref={product} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="color">Color</Label>
                        </div>
                        <TextInput id="color" type="text" sizing="md" ref={color} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="category">Categoría</Label>
                        </div>
                        <TextInput id="category" type="text" sizing="md" ref={category} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price">Precio</Label>
                        </div>
                        <TextInput id="price" type="number" sizing="md" ref={price} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="total">Total</Label>
                        </div>
                        <TextInput id="total" type="number" step={1} min={0} sizing="md" ref={total} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="manufacturer">Fabricante</Label>
                        </div>
                        <TextInput id="manufacturer" type="text" sizing="md" ref={manufacturer} />
                    </div>

                </div>

                <div className="flex flex-col w-full gap-2">
                    <h1 className="mb-1">Datos del proveedor</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name">Nombre</Label>
                        </div>
                        <TextInput id="name" type="text" sizing="md" ref={name} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Email</Label>
                        </div>
                        <TextInput id="email" type="email" sizing="md" ref={email} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="tel">Teléfono</Label>
                        </div>
                        <TextInput id="tel" type="tel" sizing="md" ref={tel} />
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