import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Msg = ({ title, descripcion, type }) => {
    return (
        <div className="w-auto">
            <h2 className="text-xl">{title}</h2>
            <div>
                <p className="font-thin">{descripcion}</p>
            </div>
        </div>
    );
};

// Para mostrar un toast
export const showToast = ({ title, descripcion, type }) => {
    toast(<Msg title={title} descripcion={descripcion} type={type} />, {
        type,
        transition: Bounce,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

// Componente contenedor para los toasts
export const ToastAlertsContainer = (props) => {
    return <ToastContainer {...props} />;
};
