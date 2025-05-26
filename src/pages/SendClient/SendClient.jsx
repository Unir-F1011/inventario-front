import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function SendClient() {
    const {state} = useLocation()
    const [total, setTotal] = useState(state.total)
    const [price, setPrice] = useState(state.precio)
    const [descount, setDescount] = useState(10)

    useEffect(() => {
        const temp = total * price * descount/100 
        console.log("Ajust ", temp)
        setPrice(Math.round(temp))

    },[total, descount])

    return (
        <section className="bg-black w-100 p-2 rounded-xl">
            <h1 className="text-white">Enviar a cliente</h1>
            <div className="flex max-w-lg flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small">ID</Label>
                    </div>
                    <TextInput id="small" type="text" sizing="md" value={state.id} readOnly />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base">Nombre</Label>
                    </div>
                    <TextInput id="base" type="text" sizing="md" value={state.producto} readOnly />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="dimensiones">Dimensiones  (alto, archo, prfundidad)</Label>
                    </div>
                    <TextInput id="dimensiones" type="text" sizing="md" value={state.dimensiones} readOnly />
                </div>

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
                    <TextInput id="precio" type="number" sizing="md" value={state.precio} readOnly />
                </div>
            </div>


            <h1 className=" text-white mt-5">Datos del cliente</h1>

            <div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="nombre">Nombre</Label>
                    </div>
                    <TextInput id="nombre" type="text" sizing="md" />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="address">Dirección</Label>
                    </div>
                    <TextInput id="address" type="text" sizing="md" />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="descaount">Descuento (%)</Label>
                    </div>
                    <TextInput id="descount" type="number" min={0} max={100} step={1} sizing="md" value={descount} onChange={v => setDescount(v.target.value)} />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="pay">Total a debitar ($)</Label>
                    </div>
                    <TextInput id="pay" type="text" sizing="md" value={price} readOnly />
                </div>

            </div>

        </section>
    )
}


export default SendClient