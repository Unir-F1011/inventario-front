import { Button, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { getFacets, newAbort } from "../../common/services/services.js";

export const Facets = ({ setCategory, setCreator }) => {
  const [categories, setCategories] = useState([]);
  const [creators, setCreators] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCreator, setSelectedCreator] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar facetas (categorías / fabricantes) desde el Gateway
  useEffect(() => {
    const ctrl = newAbort();
    setLoading(true);
    getFacets({}, { signal: ctrl.signal })
      .then((res) => {
        // Soporta distintos esquemas: {facets:{categories,manufacturers}} o plano
        const catsSrc = res?.facets?.categories ?? res?.categories ?? [];
        const mfgSrc = res?.facets?.manufacturers ?? res?.manufacturers ?? [];
        const cats = catsSrc.map((x) =>
          typeof x === "object" ? x : { key: x, displayName: x }
        );
        const mfgs = mfgSrc.map((x) =>
          typeof x === "object" ? x : { key: x, displayName: x }
        );
        setCategories(cats);
        setCreators(mfgs);
      })
      .catch(() => {
        // Alerta Popup
        window.alert("No se pudieron cargar facets");
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const searchByFacets = () => {
    setCategory(selectedCategory);
    setCreator(selectedCreator);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-2">
      {/* Categorías */}
      <Select
        sizing="md"
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={loading}
      >
        <option value="">
          {loading ? "Cargando categorías..." : "Todas las categorías"}
        </option>
        {categories.map((c, i) => (
          <option key={i} value={c.key}>
            {c.displayName}
          </option>
        ))}
      </Select>

      {/* Fabricantes */}
      <Select
        sizing="md"
        onChange={(e) => setSelectedCreator(e.target.value)}
        disabled={loading}
      >
        <option value="">
          {loading ? "Cargando fabricantes..." : "Todos los fabricantes"}
        </option>
        {creators.map((f, i) => (
          <option key={i} value={f.key}>
            {f.displayName}
          </option>
        ))}
      </Select>

      <Button
        size="md"
        onClick={searchByFacets}
        className="table_body-buttons"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Buscar"}
      </Button>
    </div>
  );
};
