import { User } from '../user'
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    users: UserState;
}

export interface UserState {
    maskUser: boolean;
    userName: User;
    password: User;
}

const initialState: UserState = {
    maskUser: true,
    userName: null,
    password: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUser = createSelector(
    getUserFeatureState,
    state => state.maskUser
);
export const getUserName = createSelector(
    getUserFeatureState,
    state => state.userName
);
export const getPassword = createSelector(
    getUserFeatureState,
    state => state.password
);

export function reducer(state/*: UserState */ = initialState, action): UserState {
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