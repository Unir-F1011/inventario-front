import { Button, Select } from "flowbite-react"
import { useEffect, useState } from "react"
import DoRequest from "../../common/services/services.js"

export const Facets = ({ setCategory, setCreator }) => {
  const [categories, setCategories] = useState([])
  const [creators, setCreators] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCreator, setSelectedCreator] = useState("")

  // Al montar el componente pedimos categorías y fabricantes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catsRes = await DoRequest("/categorias")
        const creatorsRes = await DoRequest("/fabricantes")
        
        setCategories(await catsRes.json())
        setCreators(await creatorsRes.json())
      } catch (err) {
        console.error("Error cargando datos:", err)
      }
    }
    fetchData()
  }, [])

  const searchByFacets = () => {
    setCategory(selectedCategory)
    setCreator(selectedCreator)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center mb-2">
      {/* Categorías */}
      <Select
        sizing="md"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        <option value="Smartphone">Smartphone</option>
        <option value="Laptop">Laptop</option>
        <option value="Electrónicos">Electrónicos</option>
        <option value="Electronics">Electronics</option>
        <option value="telefono">telefono</option>

        {//Al no tenter el servicio con el DISTINCT de Categoria
        /*{categories.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}*/}
      </Select>

      {/* Fabricantes */}
      <Select
        sizing="md"
        onChange={(e) => setSelectedCreator(e.target.value)}
      >
        <option value="">Todos los fabricantes</option>        
        <option value="Apple">Apple</option>
        <option value="ASUS">ASUS</option>
        <option value="Dell">Dell</option>
        <option value="Motorola">Motorola</option>
        <option value="Samsung">Samsung</option>
        <option value="Xiaomi">Xiaomi</option>

        {//Al no tenter el servicio con el DISTINCT de Fabricantes
        /*{creators.map((f, i) => (
          <option key={i} value={f}>{f}</option>
        ))}*/}
      </Select>

      <Button size="md" onClick={searchByFacets} className="table_body-buttons">
        Buscar
      </Button>
    </div>
  )
}
