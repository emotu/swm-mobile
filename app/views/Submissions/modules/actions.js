// import Api from 'utils/api';
// import axios from 'axios';
import { generateActionTypes, generateAction } from 'app/utils/generators';
import { TaskEntry } from 'app/services/models';
import * as Auth from 'app/utils/auth';

export const ActionTypes = generateActionTypes(
    'SUBMISSION',
    [
        'LIST',
        'SORT',
        'FORM',
        'DETAIL',
        'SAVE',
    ]
);


export function detail(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.SUBMISSION_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.SUBMISSION_LOADING, {}));
        }

        return TaskEntry.get(data).then(response => {
            dispatch(generateAction(ActionTypes.SUBMISSION_DETAIL_SUCCESSFUL, response.data));

        }).catch(error => {
            console.log(error);
            dispatch(generateAction(ActionTypes.SUBMISSION_DETAIL_FAILED, error.response.data));
        });
    };
}


export function list(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.SUBMISSION_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.SUBMISSION_LOADING, {}));
        }

        return TaskEntry.list(data).then(response => {
            dispatch(generateAction(ActionTypes.SUBMISSION_LIST_SUCCESSFUL, response.data));

        }).catch(error => {
            dispatch(generateAction(ActionTypes.SUBMISSION_LIST_FAILED, error.response.data));
        });
    };
}


export function save(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.SUBMISSION_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.SUBMISSION_LOADING, {}));
        }

        return TaskEntry.save(data).then(response => {
            dispatch(generateAction(ActionTypes.SUBMISSION_SAVE_SUCCESSFUL, response.data));
        }).catch(error => {
            console.log(error)
            dispatch(generateAction(ActionTypes.SUBMISSION_SAVE_FAILED, error.response.data));
        });
    };
}


export function form(data = {}) {
    return function(dispatch) {
        if(data && data.reloading) {
            dispatch(generateAction(ActionTypes.SUBMISSION_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.SUBMISSION_LOADING, {}));
        }

        dispatch(generateAction(ActionTypes.SUBMISSION_FORM_SUCCESSFUL, {}));
    };
}
