export function reducer(state, action) {
    switch (action.type) {

        case 'TOGGLE_MASK_USER':
            console.log('existing state: ' + JSON.stringify(state))
            console.log('payload state: ' + action.payload);
            return {
                ...state,
                maskUserName: action.payload 
            };
        default: 
            return state;
    }
}