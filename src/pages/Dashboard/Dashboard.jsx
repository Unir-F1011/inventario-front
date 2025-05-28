import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react";
import mock from "./../../mocks/data.json"
import { ButtonCmp } from "../../common/components/Button";
import { RotateLoader } from "react-spinners";
import customState from "../../common/hooks/customHook";

const domain = process.env.REACT_DOMAIN_API

function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useReducer(customState, {
        data: [], loading: true, error: false
    })
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

    const searchData = (url) => {
        setState({ type: "LOADING" })
        if (mock != "") {
            setState({ type: "FETCHING", payload: mock.data })

        } else {
            setState({ type: "ERROR" })
        }
    } 

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const url = `${domain}/stock?page=${currentPage}&${key}=${value}`
        searchData(url)
    }, [currentPage])

    useEffect(() => {
        const url = `${domain}/stock?page=${currentPage}&${key}=${value}`
        if (key.length >= 3 && value.length >= 3) {
           searchData(url)
        }
    },[key,value])

    // Carga inicial
    useEffect(() => {
        const url = `${domain}/stock?page=${currentPage}`
        searchData(url)
    },[])

    return (
        <section>
            <RotateLoader color="#f1f0f0" loading={state.loading} cssOverride={{
                position: "fixed", zIndex: 9999,
                top: "50%", left: "50%"
            }} />
            <div className="flex gap-2 mb-2">
                <TextInput id="key" type="text" sizing="sm" placeholder="columna" value={key} onChange={k => setKey(k.target.value)} />
                <TextInput id="value" type="text" sizing="sm" placeholder="valor" value={value} onChange={v => setValue(v.target.value)} />

            </div>

            <Table hoverable style={{
                display: "block",
                height: "80svh",
                overflowY: "auto",
            }} className="table">
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
                        !state.loading ? (

                            state.data?.map((payload, index) => (
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