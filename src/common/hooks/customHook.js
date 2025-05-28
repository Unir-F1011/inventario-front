


function customState(states, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                ...states, loading: true, error: false
            }
        case 'FETCHING':
            return {
                ...states, loading: false, error: false, data: action.payload
            }
        case 'ERROR':
            return {
                ...states, loading: false, error: true
            }

        default: throw new Error()
    }

}


export default customState