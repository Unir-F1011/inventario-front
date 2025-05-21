import { SpinnerRoller } from './../common/components/SpinnerRoller';
import { ToastAlertsContainer } from "./../common/plugins/toast/Toast"
import './../common/css/app.css'
import { Bounce } from 'react-toastify';

function Layout() {


    return (
        <main className='h-screen w-full'>

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
            <SpinnerRoller />
            <aside>
                {
                    /**
                     * Barra de busqueda
                     */
                }
            </aside>
            <section>
                { /**
                   * 
                   * Router
                 */
                }
            </section>

        
        </main>
    )
}


export default Layout;