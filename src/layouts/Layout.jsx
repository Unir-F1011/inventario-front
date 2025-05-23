import { ToastAlertsContainer } from "./../common/plugins/toast/Toast"
import './../common/css/app.css'
import { Bounce } from 'react-toastify';
import { VerticalBar } from '../common/components/VerticalBar';
import { BrowserTree } from '../common/components/BrowserTree';


function Layout() {


    return (
        <main>
            <ToastAlertsContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick={true}
                pauseOnHover={false}
                draggable={false}
                transition={Bounce}
                theme="colored"
            />

            <div className='flex w-full h-screen'>
                <VerticalBar />
                <BrowserTree />
            </div>
        </main>
    )
}


export default Layout