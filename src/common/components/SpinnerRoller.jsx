import "./../css/spinner.css"

export const SpinnerRoller = () => {

    return (
        <div className='flex flex-row justify-center items-center h-screen dark:bg-transparent/20 bg-slate-300/10 absolute'>
            <div className="ldsRolle">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    )
}