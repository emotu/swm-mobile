// import Api from 'utils/api';
// import axios from 'axios';
import { generateActionTypes, generateAction } from 'app/utils/generators';
import { Login } from 'app/services/models';
import * as Auth from 'app/utils/auth';

export const ActionTypes = generateActionTypes(
    'LOGIN',
    [
        'LIST',
        'SORT',
        'FORM',
        'DETAIL',
        'SAVE',
    ]
);


export function save(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.LOGIN_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.LOGIN_LOADING, {}));
        }

        return Login.save(data).then(response => {
            if(response.status == 201 || response.status == 200) {
                console.log(response.data)
                Auth.loginUser(response.data.auth_token);
                dispatch(generateAction(ActionTypes.LOGIN_SAVE_SUCCESSFUL, response.data));
            } else {
                dispatch(generateAction(ActionTypes.LOGIN_SAVE_FAILED, response.data));
            }

        }).catch(error => {
            console.log(error)
            dispatch(generateAction(ActionTypes.LOGIN_SAVE_FAILED, error.response.data));
        });
    };
}


export function form(data = {}) {
    return function(dispatch) {
        if(data && data.reloading) {
            dispatch(generateAction(ActionTypes.LOGIN_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.LOGIN_LOADING, {}));
        }

        dispatch(generateAction(ActionTypes.LOGIN_FORM_SUCCESSFUL, {}));
    };
}
