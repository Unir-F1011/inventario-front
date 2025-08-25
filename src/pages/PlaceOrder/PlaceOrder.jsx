import { Button, Label, TextInput } from "flowbite-react";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast";
import { useNavigate } from "react-router-dom";
import DoRequest from "../../common/services/services";
import { useRef } from "react";


const domain = import.meta.env.VITE_OPERATOR_URL

function PlaceOrder() {
    const navigate = useNavigate();
    const product = useRef(null);
    const color = useRef(null);
    const category = useRef(null);
    const price = useRef(null);
    const total = useRef(null);
    const name = useRef(null);
    const email = useRef(null);
    const tel = useRef(null);
    const manufacturer = useRef(null);

    const makeOrder = async (e) => {
        e.preventDefault();
        const url = `${domain}/v1/orders`;

        const payload = {
            product: product.current.value.trim(),
            color: color.current.value.trim(),
            category: category.current.value.trim(),
            price: parseFloat(price.current.value),
            total: parseInt(total.current.value),
            name: name.current.value.trim(),
            email: email.current.value.trim(),
            tel: tel.current.value.trim(),
            manufacturer: manufacturer.current.value.trim()
        };

        const resp = await DoRequest(url, "POST", payload);
        if (resp.status === 201) {
            showToast("Orden creada satisfactoriamente", "success");
        } else {
            showToast("Error creando orden", "error");
        }
        navigate("/");
    };

    return (
            <section className="mt-20 px-4">
                <div className="max-w-5xl mx-auto bg-[#050a2d] border border-[#1c2538] rounded-xl shadow-lg p-6 md:p-10 text-gray-100">
                <header className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Crear Orden</h1>
                        <p className="text-sm mt-1 text-gray-400">Ingresa los datos del producto y del proveedor</p>
                </header>

                <form onSubmit={makeOrder} className="space-y-10">
                    <div className="grid gap-10 md:gap-12 md:grid-cols-2">
                        {/* Columna Producto */}
                        <div className="space-y-5">
                            <h2 className="text-lg font-medium mb-2 text-white">Datos del Producto</h2>
                            <div className="space-y-4">
                                <Field id="product" label="Producto" refProp={product} />
                                <Field id="color" label="Color" refProp={color} />
                                <Field id="category" label="Categoría" refProp={category} />
                                <Field id="price" label="Precio" type="number" refProp={price} />
                                <Field id="total" label="Total" type="number" inputProps={{ step: 1, min: 0 }} refProp={total} />
                                <Field id="manufacturer" label="Fabricante" refProp={manufacturer} />
                            </div>
                        </div>

                        {/* Columna Proveedor */}
                        <div className="space-y-5">
                            <h2 className="text-lg font-medium mb-2 text-white">Datos del Proveedor</h2>
                            <div className="space-y-4">
                                <Field id="name" label="Nombre" refProp={name} />
                                <Field id="email" label="Email" type="email" refProp={email} />
                                <Field id="tel" label="Teléfono" type="tel" refProp={tel} />
                            </div>
                        </div>
                    </div>

                      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#1c2538]">
                        <div className="sm:mr-auto">
                            <ButtonCmp path="/" name="Cancelar" />
                        </div>
                        <Button type="submit" size="sm" className="table_body-buttons px-6">Enviar</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

// Reusable field component
function Field({ id, label, type = "text", refProp, inputProps = {} }) {
    return (
        <div>
            <Label htmlFor={id} className="mb-1 block">{label}</Label>
            <TextInput id={id} type={type} sizing="md" ref={refProp} {...inputProps} />
        </div>
    );
}

export default PlaceOrder