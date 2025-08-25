import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast";
import DoRequest from "../../common/services/services";

const domain = import.meta.env.VITE_OPERATOR_URL;

function SendClient() {
    const { state } = useLocation();
    const navigate = useNavigate();

    // If navigated directly without state, redirect home.
    useEffect(() => {
        if (!state) navigate("/");
    }, [state, navigate]);

    const [total, setTotal] = useState(1);
    const [discount, setDiscount] = useState(1);
    const [payment, setPayment] = useState(state?.price || 0);

    const address = useRef(null);
    const name = useRef(null);

    useEffect(() => {
        if (!state) return;
        if (Number(total) === 0) return;
        const t = Number(total) * Number(state.price);
        const pd = t * (Number(discount) / 100);
        setPayment(Math.round(t - pd));
    }, [total, discount, state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state) return;
        const url = `${domain}/v1/shipments`;
        const payload = {
            name: name.current.value.trim(),
            address: address.current.value.trim(),
            id: state.id,
            price: state.price,
            product: state.product,
            category: state.category,
            color: state.color,
            manufacturer: state.manufacturer,
            discount: Number(discount),
            total: Number(total),
            payment: Number(payment)
        };
        const resp = await DoRequest(url, "POST", payload);
        if (resp.status === 201) {
            showToast("Envío a cliente completado", "success");
        } else {
            showToast("Error en el envío", "error");
        }
        navigate("/");
    };

    if (!state) return null; // avoid rendering until redirect

    return (
        <section className="mt-20 px-4">
            <div className="max-w-5xl mx-auto bg-[#050a2d] border border-[#1c2538] rounded-xl shadow-lg p-6 md:p-10 text-gray-100">
                <header className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Enviar a clientes</h1>
                    <p className="text-sm mt-1 text-gray-400">Confirma los datos del producto y completa la información del cliente</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid gap-10 md:gap-12 md:grid-cols-2">
                        {/* Columna Producto */}
                        <div className="space-y-5">
                            <h2 className="text-lg font-medium mb-2 text-white">Datos del Producto</h2>
                            <div className="space-y-4">
                                <Field id="id" label="ID" value={state.id} readOnly hiddenOn="sm" />
                                <Field id="product" label="Nombre" value={state.product} readOnly />
                                <Field id="category" label="Categoría" value={state.category} readOnly hiddenOn="md" />
                                {state.manufacturer && (
                                    <Field id="manufacturer" label="Fabricante" value={state.manufacturer} readOnly hiddenOn="md" />
                                )}
                                <Field id="total" label="Cantidad a enviar" type="number" min={1} value={total} onChange={(e) => setTotal(e.target.value)} />
                                <Field id="unitPrice" label="Precio por producto ($)" type="number" value={state.price} readOnly />
                            </div>
                        </div>

                        {/* Columna Cliente */}
                        <div className="space-y-5">
                            <h2 className="text-lg font-medium mb-2 text-white">Datos del Cliente</h2>
                            <div className="space-y-4">
                                <Field id="name" label="Nombre" refProp={name} />
                                <Field id="address" label="Dirección" refProp={address} />
                                <Field id="discount" label="Descuento (%)" type="number" min={0} max={100} step={0.5} value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                <Field id="payment" label="Total a debitar ($)" type="number" value={payment} readOnly />
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

function Field({ id, label, type = "text", value, onChange, readOnly = false, refProp, hiddenOn, min, max, step }) {
    // hiddenOn can be 'sm' or 'md' to hide on smaller screens
    let visibility = "";
    if (hiddenOn === "sm") visibility = " hidden sm:block";
    if (hiddenOn === "md") visibility = " hidden md:block";
    return (
        <div className={visibility.trim()}>
            <Label htmlFor={id} className="mb-1 block">{label}</Label>
            <TextInput
                id={id}
                type={type}
                sizing="md"
                value={value}
                readOnly={readOnly}
                onChange={onChange}
                ref={refProp}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
}

export default SendClient;