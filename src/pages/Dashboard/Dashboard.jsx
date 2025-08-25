import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useEffect, useReducer, useState } from "react";
import { ButtonCmp } from "../../common/components/Button";
import { RotateLoader } from "react-spinners";
import useCustomState from "../../common/hooks/useCustomHook";
import { Facets } from "../../common/components/Facets";
import {
  searchAdvanced,
  getItemsBasic,
  newAbort,
} from "../../common/services/services";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [state, setState] = useReducer(useCustomState, {
    data: [],
    loading: true,
    error: false,
  });
  const [category, setCategory] = useState("");
  const [creator, setCreator] = useState("");
  const [search, setSearch] = useState("");

  const pageSize = 10;
  const columns = [
    "Id",
    "Producto",
    "Color",
    "Categoría",
    "Precio ($)",
    "Fabricante",
    "Total",
    "Acciones",
  ];

  // Hace la búsqueda con fallback y maneja loading/error
  const runSearch = async (params, ctrl) => {
    setState({ type: "LOADING" });
    try {
      // 1) Avanzada
      const payload = await searchAdvanced(params, { signal: ctrl.signal });
      const items = payload?.items ?? [];
      setState({ type: "FETCHING", payload: items });

      if (payload?.totalPages) {
        setTotalPages(payload.totalPages);
      } else if (payload?.total && payload?.pageSize) {
        setTotalPages(Math.max(1, Math.ceil(payload.total / payload.pageSize)));
      } else {
        setTotalPages(items.length < pageSize ? params.page : params.page + 1);
      }
    } catch (e) {
      // 2) Último fallback directo a /items para no dejar la UI colgada
      try {
        const legacy = await getItemsBasic(
          {
            category: params.category || "",
            manufacturer: params.manufacturer || "",
            product: params.q || "",
            page: params.page || 1,
          },
          { signal: ctrl.signal }
        );
        const items = legacy?.items ?? [];
        setState({ type: "FETCHING", payload: items });
        setTotalPages(items.length < pageSize ? params.page : params.page + 1);
      } catch (e2) {
        console.error("Error en búsqueda:", e, "Fallback items:", e2);
        setState({ type: "ERROR" });
      }
    }
  };

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const params = {
      q: search || "",
      category: category || "",
      manufacturer: creator || "",
      page: currentPage,
    };
    const ctrl = newAbort();
    runSearch(params, ctrl);
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, creator, search, currentPage]);

  return (
    <section>
      <RotateLoader
        color="#1F2937"
        loading={state.loading}
        cssOverride={{
          position: "fixed",
          zIndex: 9999,
          top: "50%",
          left: "50%",
        }}
      />

      <div className="flex flex-wrap gap-2 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 mb-2 items-center">
          <TextInput
            id="search"
            type="text"
            sizing="md"
            placeholder="Búsqueda por texto"
            value={search}
            className="inputs rounded-sm w-80"
            onChange={(k) => setSearch(k.target.value)}
          />
        </div>
        <Facets setCategory={setCategory} setCreator={setCreator} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Table
          hoverable
          style={{
            display: "block",
            maxHeight: "80svh",
            minHeight: "50%",
            overflowY: "scroll",
            overflowX: "scroll",
          }}
          className="table border rounded-lg"
        >
          <TableHead className="table__header">
            <TableRow>
              {columns.map((col, index) => (
                <TableHeadCell key={index}>{col}</TableHeadCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className="table__body">
            {state.loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading data...</TableCell>
              </TableRow>
            ) : state.error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-red-600">
                  Error cargando datos
                </TableCell>
              </TableRow>
            ) : state.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            ) : (
              state.data.map((payload, index) => (
                <TableRow
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <TableCell>{payload.id}</TableCell>
                  <TableCell>{payload.product}</TableCell>
                  <TableCell>{payload.color}</TableCell>
                  <TableCell>{payload.category}</TableCell>
                  <TableCell>{payload.price}</TableCell>
                  <TableCell>{payload.manufacturer}</TableCell>
                  <TableCell>{payload.total}</TableCell>
                  <TableCell>
                    <div className="flex wrap gap-2">
                      <ButtonCmp
                        path="/client"
                        name="Enviar a cliente"
                        state={payload}
                      />
                      <ButtonCmp
                        path="/delete"
                        name="Eliminar articulo"
                        state={payload}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          nextLabel="Siguiente"
          previousLabel="Anterior"
        />
      </div>
    </section>
  );
}

export default Dashboard;
