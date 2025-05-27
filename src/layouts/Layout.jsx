import { ToastAlertsContainer } from "./../common/plugins/toast/Toast"
import { VerticalBar } from '../common/components/VerticalBar';
import { BrowserTree } from '../common/components/BrowserTree';
import { ToastContainer } from "react-toastify";


function Layout() {


    return (
        <main>
            <ToastContainer />
           
            <div className='flex w-full h-screen'>
                <VerticalBar />
                <BrowserTree />
            </div>
        </main>
    )
}


export default Layout