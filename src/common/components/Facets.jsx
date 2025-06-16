import { Button, TextInput } from "flowbite-react"
import { useRef } from "react"


export const Facets = ({setCategory, setCreator}) => {
    const category = useRef(null) 
    const creator = useRef(null)
    const searchByFacets = () => {
        setCategory(category.current.value)
        setCreator(creator.current.value)
    }

    return (

        <div className="flex flex-wrap gap-2 items-center mb-2">
            <TextInput type="text" sizing="md" id="category" placeholder="Categoría.." 
            ref={category} />
            <TextInput type="text" sizing="md" id="creator" placeholder="Fabricante.." ref={creator}/>
            <Button size="md" onClick={searchByFacets} className="table_body-buttons">Buscar</Button>
        </div>

    )
}