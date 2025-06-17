import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react";
import mock from "./../../mocks/data.json"
import { ButtonCmp } from "../../common/components/Button";
import { RotateLoader } from "react-spinners";
import useCustomState from "../../common/hooks/useCustomHook";
import { Facets } from "../../common/components/Facets";

const domain = process.env.REACT_DOMAIN_API

function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useReducer(useCustomState, {
        data: [], loading: true, error: false
    })
    const [category, setCategory] = useState("")
    const [creator, setCreator] = useState("")

    const [search, setSearch] = useState("")
    const columns = [
        "Id",
        "Producto",
        "Color",
        "Categoría",
        "Precio ($)",
        "Fabricante",
        "Total",
        "Acciones"
    ]
    const size = 10

    const searchData = (url) => {
        setState({ type: "LOADING" })
        if (mock != "") {
            setState({ type: "FETCHING", payload: mock.data })

        } else {
            setState({ type: "ERROR" })
        }
    }

    const getSearch = () => {
        const url = `${domain}/stock?page=${currentPage}&size=${size}&query=${search}`
        searchData(url)
        setSearch("")
    }

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const url = `${domain}/stock?page=${currentPage}&size=${size}`
        searchData(url)
    }, [currentPage])

    // Carga inicial
    useEffect(() => {
        const url = `${domain}/stock?page=${currentPage}&size=${size}`
        searchData(url)
    }, [])

    useEffect(()=> {
        const url = `${domain}/stock?page=${currentPage}&size=${size}&category=${category}&creator=${creator}`
        searchData(url)
    }, [category, creator])

    // crear sugerencias de búsquedas

    return (
        <section>
            <RotateLoader color="#f1f0f0" loading={state.loading} cssOverride={{
                position: "fixed", zIndex: 9999,
                top: "50%", left: "50%"
            }} />
            <div className="flex flex-wrap gap-2 items-center justify-between">

                <div className="flex gap-2 mb-2 items-center">
                    <TextInput id="search" type="text" sizing="md" placeholder="Búsqueda por texto" value={search} className="inputs rounded-sm w-80" onChange={k => setSearch(k.target.value)} />
                    <Button size="md" onClick={getSearch} className="table_body-buttons">Buscar</Button>
                </div>

                <Facets setCategory={setCategory} setCreator={setCreator} />
            </div>


            <Table hoverable style={{
                display: "block",
                height: "80svh",
                overflowY: "scroll",
            }} className="table border rounded-lg">
                <TableHead className="table__header">
                    <TableRow>
                        {
                            columns.map((col, index) => (
                                <TableHeadCell key={index}>{col}</TableHeadCell>
                            ))
                        }
                    </TableRow>
                </TableHead>

                <TableBody className="table__body">
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
                                            payload.product
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.color
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.category
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.price
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            payload.manufacturer
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