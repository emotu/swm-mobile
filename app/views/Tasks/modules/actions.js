// import Api from 'utils/api';
import axios from 'axios';
import { generateActionTypes, generateAction } from 'app/utils/generators';
import { QueuedTask as Task, PropertyStatus, PropertyType, VerificationStatus, Street, RegisterProperty, SearchProperty, Property } from 'app/services/models';
import * as Auth from 'app/utils/auth';

export const ActionTypes = generateActionTypes(
    'TASK',
    [
        'LIST',
        'SORT',
        'FORM',
        'DETAIL',
        'SAVE',
        'UPLOAD',
    ]
);


export function detail(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.TASK_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.TASK_LOADING, {}));
        }

        return Task.get(data).then(response => {
            dispatch(generateAction(ActionTypes.TASK_DETAIL_SUCCESSFUL, response.data));

        }).catch(error => {
            console.log(error);
            dispatch(generateAction(ActionTypes.TASK_DETAIL_FAILED, error.response.data));
        });
    };
}


export function list(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.TASK_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.TASK_LOADING, {}));
        }

        return Task.list(data).then(response => {
            dispatch(generateAction(ActionTypes.TASK_LIST_SUCCESSFUL, response.data));

        }).catch(error => {
            dispatch(generateAction(ActionTypes.TASK_LIST_FAILED, error.response.data));
        });
    };
}


export function save(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.TASK_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.TASK_LOADING, {}));
        }

        return RegisterProperty.save(data).then(response => {
            dispatch(generateAction(ActionTypes.TASK_SAVE_SUCCESSFUL, response.data));
        }).catch(error => {
            console.log(error)
            dispatch(generateAction(ActionTypes.TASK_SAVE_FAILED, error.response.data));
        });
    };
}

export function verify(data = {}) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.TASK_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.TASK_LOADING, {}));
        }

        return SearchProperty.save(data).then(response => {
            dispatch(generateAction(ActionTypes.TASK_SAVE_SUCCESSFUL, response.data));
        }).catch(error => {
            console.log(error)
            dispatch(generateAction(ActionTypes.TASK_SAVE_FAILED, error.response.data));
        });
    };
}


export function form(data = {}) {
    return function(dispatch) {
        if(data && data.reloading) {
            dispatch(generateAction(ActionTypes.TASK_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.TASK_LOADING, {}));
        }

        let { task_id, street_id } = data;

        axios.all([

            Task.get({ id: task_id}),

            Street.get({ id: street_id}),

            PropertyStatus.list({from_cache: true, page_by: JSON.stringify({ per_page: 1000 }),
                sort_by: JSON.stringify({ asc_desc:'desc', order_by: 'name' }), }),

            PropertyType.list({from_cache: true, page_by: JSON.stringify({ per_page: 1000 }),
                sort_by: JSON.stringify({ asc_desc:'desc', order_by: 'name' }), }),

        ]).then(axios.spread((task, street, property_statuses, property_types) => {
            let dependencies = {
                task: task.data,
                street: street.data,
                property_statuses: property_statuses.data.results,
                property_types: property_types.data.results,
            }
            let payload = {
                data,
                dependencies
            }
            dispatch(generateAction(ActionTypes.TASK_FORM_SUCCESSFUL, payload));
        })).catch(error => {
            console.log(error);
            dispatch(generateAction(ActionTypes.TASK_FORM_FAILED, error.response.data));
        })

    };
}

export function upload(data = {}, file) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.TASK_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.TASK_LOADING, {}));
        }
        data.path = 'upload_image';

        return Property.uploadFile(data, file).then(response => {
            dispatch(generateAction(ActionTypes.TASK_UPLOAD_SUCCESSFUL, response.data));

        }).catch(error => {
            dispatch(generateAction(ActionTypes.TASK_UPLOAD_FAILED, error.response.data));
        });
    };
}
