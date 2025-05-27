import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Msg = ({ title}) => {
    return (
        <div className=" w-auto">
            <h2 className="text-xl">{title}</h2>
        </div>

    );
};

// Para mostrar un toast
export const showToast = (title, type ) => {
    toast(<Msg title={title} />, {
        type:type,
        stacked: true,
        autoClose: 5000,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: "dark",
        role: "alert",
        position: "bottom-right",
        transition: Bounce,
    });
};