import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import mock from "./../../mocks/data.json"
import { ButtonCmp } from "../../common/components/Button";


function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([])
    const [key, setKey] = useState("")
    const [value, setValue] = useState()
    const columns = [
        "Id",
        "Producto",
        "Color",
        "Categoría",
        "Precio ($)",
        "Dimensiones",
        "Total",
        "Acciones"
    ]

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        if (mock != "") {
            setData(mock.data)
        }

        console.log("useEffect ", data)
    }, [currentPage])

    useEffect(() => {
        if (key.length >= 3 && value.length >= 3) {
            console.log("AFAF", key, value)
        }
    }, [key, value])



    return (
        <section>

            <div className="flex gap-2 mb-2">
                <TextInput id="key" type="text" sizing="sm" placeholder="columna" value={key} onChange={k => setKey(k.target.value)} />
                <TextInput id="value" type="text" sizing="sm" placeholder="valor" value={value} onChange={v => setValue(v.target.value)} />

            </div>

            <Table hoverable style={{
                display: "block",
                height: "80svh",
                overflowY: "auto",
            }}>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((col, index) => (
                                <TableHeadCell key={index}>{col}</TableHeadCell>


                            ))
                        }
                    </TableRow>
                </TableHead>

                <TableBody >
                    {
                        data.length > 0 ? (

                            data?.map((payload, index) => (
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                    <TableCell>
                                        {
                                            payload.id
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.producto
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.color
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.categoria
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.precio
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.dimensiones
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.total
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex wrap gap-2">
                                            <ButtonCmp path="/client" name="Enviar a cliente" state={payload} />
                                            <ButtonCmp path="/delete" name="Eliminar articulo" state={payload} />
                                        </div>
                                    </TableCell>
                                </TableRow>

                            )
                            )

                        ) : ("Loading data...")
                    }

                </TableBody>

            </Table>

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={100}
                    onPageChange={onPageChange}
                    nextLabel="Siguiente"
                    previousLabel="Anterior"
                />
            </div>
        </section>

    )
}

export default Dashboard