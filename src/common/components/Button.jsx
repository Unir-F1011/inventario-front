
import { Button } from "flowbite-react"
import { useNavigate } from "react-router-dom"



export const ButtonCmp = ({path, name, state}) => {
    const navigate = useNavigate()
    const router = () => {  
        navigate(path, {
            state: state
        })
    }
    return (
        <Button className=" rounded-md bg-blue-700 text-white" size="sm" onClick={router}>
            <span>{name}</span>
        </Button>
    )
}