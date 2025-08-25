import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import { useEffect, useReducer, useState } from "react";
import { ButtonCmp } from "../../common/components/Button";
import { RotateLoader } from "react-spinners";
import useCustomState from "../../common/hooks/useCustomHook";
import { Facets } from "../../common/components/Facets";
import DoRequest from "../../common/services/services";

const domain = import.meta.env.VITE_API_URL

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

    const searchData = async (url) => {
        setState({ type: "LOADING" })
        const resp = await DoRequest(url, "GET")
        if (resp.status == 200) {
            const payload = await resp.json()
            setState({ type: "FETCHING", payload: payload.items })
        } else {
            setState({ type: "ERROR" })
        }
    }

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        let url = `${domain}/v1/items?page=${currentPage}`

        if (category != "") {
            url += `&category=${category}`
        } else if (creator != "") {
            url += `&manufacturer=${creator}`
        } else if (search != "") {
            url += `&product=${search}`
        }


        const helper = async () => {
            await searchData(url)
        }

        helper()
    }, [category, creator, search, currentPage])

    return (
        <section>
            <RotateLoader color="#1F2937" loading={state.loading} cssOverride={{
                position: "fixed", zIndex: 9999,
                top: "50%", left: "50%"
            }} />
            <div className="flex flex-wrap gap-2 items-center justify-between">

                <div className="flex gap-2 mb-2 items-center">
                    <TextInput id="search" type="text" sizing="md" placeholder="Búsqueda por texto" value={search} className="inputs rounded-sm w-80" onChange={k => setSearch(k.target.value)} />
                </div>

                <Facets setCategory={setCategory} setCreator={setCreator} />
            </div>

            <div className="min-w-[80em] flex items-center">
                <Table hoverable style={{
                    display: "block",
                    maxHeight: "80svh",
                    minHeight: "50%",
                    overflowY: "scroll",
                    overflowX: "scroll",
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
            </div>


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