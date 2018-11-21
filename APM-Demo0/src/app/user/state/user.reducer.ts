import { User } from '../user'
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
    users: UserState;
}

export interface UserState {
    maskUser: boolean;
    userName: User;
    password: User;
}

export function reducer(state: UserState, action): UserState {
    switch (action.type) {

        case 'TOGGLE_MASK_USER':
            console.log('existing state: ' + JSON.stringify(state))
            console.log('payload state: ' + action.payload);
            return {
                ...state,
                maskUser: action.payload 
            };
        default: 
            return state;
    }
}