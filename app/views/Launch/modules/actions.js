// import Api from 'utils/api';
// import axios from 'axios';
import { generateActionTypes, generateAction } from 'app/utils/generators';
// import { LAUNCH } from 'app/services/models';
import * as Auth from 'app/utils/auth';

export const ActionTypes = generateActionTypes(
    'LAUNCH',
    [
        'LIST',
        'SORT',
        'FORM',
        'DETAIL',
        'SAVE',
    ]
);

export function form(data = {}) {

    return function(dispatch) {
        if(data && data.reloading) {
            dispatch(generateAction(ActionTypes.LAUNCH_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.LAUNCH_LOADING, {}));
        }

        Auth.isAuthenticated().then((res) => {
            let isLoggedIn = res
            let data = { isLoggedIn }
            dispatch(generateAction(ActionTypes.LAUNCH_FORM_SUCCESSFUL, { data } ));

        }).catch((err) => {

        })
    };
}

export function logout(data = {}) {
    return function(dispatch) {
        if(data && data.reloading) {
            dispatch(generateAction(ActionTypes.LAUNCH_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.LAUNCH_LOADING, {}));
        }

        console.log(' I am triggering logout now')

        Auth.logoutUser().then((res) => {
            let isLoggedIn = false
            let data = { isLoggedIn }
            dispatch(generateAction(ActionTypes.LAUNCH_FORM_SUCCESSFUL, { data } ));

        }).catch((err) => {

        })
    }
}
