import { VerticalBar } from '../common/components/VerticalBar';
import { BrowserTree } from '../common/components/BrowserTree';
import { ToastContainer } from "react-toastify";


function Layout() {


    return (
        <main>
            <ToastContainer />
           
            <div className='flex h-screen'>
                <VerticalBar />
                <BrowserTree />
            </div>
        </main>
    )
}


export default Layout