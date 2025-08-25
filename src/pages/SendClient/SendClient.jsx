import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonCmp } from "../../common/components/Button";
import { showToast } from "../../common/plugins/toast/Toast";
import DoRequest from "../../common/services/services";

const domain = import.meta.env.VITE_OPERATOR_URL;

function SendClient() {
    const { state } = useLocation();
    const [total, setTotal] = useState(1);
    const [payment, setPayment] = useState(state.price);
    const [discount, setDiscount] = useState(1);
    const address = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (total === 0) return;
        const t = total * state.price;
        const pd = t * (discount / 100);
        const r = t - pd;
        setPayment(Math.round(r));
    }, [total, discount, state.price]);

    const sendClient = async () => {
        const url = `${domain}/v1/shipments`;
        const payload = {
            name: name.current.value,
            address: address.current.value,
            id: state.id,
            price: state.price,
            product: state.product,
            category: state.category,
            color: state.color,
            manufacturer: state.manufacturer,
            discount,
            total,
            payment
        };
        const resp = await DoRequest(url, "POST", payload);
        if (resp.status === 201) {
            showToast("Envío a cliente completado", "success");
        } else {
            showToast("Error en el envío", "error");
        }
        navigate("/");
    };

    return (
        <section className="table p-4 rounded-xl mt-20">
            <h1 className="flex justify-center mb-5 mt-2 font-bold">Enviar a clientes</h1>
            <div className="flex gap-10 items-top flex-wrap">
                <div className="flex w-full flex-col gap-2">
                    <h1 className="">Datos del Producto</h1>
                    {/* ID: hidden on screens <sm */}
                    <div className="sm:block hidden">
                        <div className="mb-2 block">
                            <Label htmlFor="id">ID</Label>
                        </div>
                        <TextInput id="id" type="text" sizing="md" value={state.id} readOnly />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="product">Nombre</Label>
                        </div>
                        <TextInput id="product" type="text" sizing="md" value={state.product} readOnly />
                    </div>
                    {/* Categoría: hidden on screens <md */}
                    <div className="md:block hidden">
                        <div className="mb-2 block">
                            <Label htmlFor="category">Categoría</Label>
                        </div>
                        <TextInput id="category" type="text" sizing="md" value={state.category} readOnly />
                    </div>
                    {/* Fabricante: hidden on screens <md */}
                    {state.manufacturer && (
                        <div className="md:block hidden">
                            <div className="mb-2 block">
                                <Label htmlFor="manufacturer">Fabricante</Label>
                            </div>
                            <TextInput id="manufacturer" type="text" sizing="md" value={state.manufacturer} readOnly />
                        </div>
                    )}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="total">Cantidad a enviar</Label>
                        </div>
                        <TextInput id="total" type="number" min={1} sizing="md" value={total} onChange={v => setTotal(v.target.value)} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="precio">Precio por producto ($)</Label>
                        </div>
                        <TextInput id="precio" type="number" sizing="md" value={state.price} readOnly />
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <h1 className="">Datos del cliente</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name">Nombre</Label>
                        </div>
                        <TextInput id="name" type="text" sizing="md" ref={name} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address">Dirección</Label>
                        </div>
                        <TextInput id="address" type="text" sizing="md" ref={address} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="discount">Descuento (%)</Label>
                        </div>
                        <TextInput id="discount" type="number" min={0} max={100} step={0.5} sizing="md" value={discount} onChange={v => setDiscount(v.target.value)} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="payment">Total a debitar ($)</Label>
                        </div>
                        <TextInput id="payment" type="text" sizing="md" value={payment} readOnly />
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-2 gap-2">
                <ButtonCmp path="/" name="Cancelar" />
                <Button size="sm" onClick={sendClient} className="table_body-buttons">Enviar</Button>
            </div>
        </section>
    );
}

export default SendClient;