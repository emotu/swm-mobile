// import Api from 'utils/api';
import axios from 'axios';
import { generateActionTypes, generateAction } from 'app/utils/generators';
import { PropertyStatus, PropertyType, VerificationStatus, Street, RegisterProperty, Property } from 'app/services/models';
import * as Auth from 'app/utils/auth';

export const ActionTypes = generateActionTypes(
    'SUBMISSION',
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
            dispatch(generateAction(ActionTypes.SUBMISSION_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.SUBMISSION_LOADING, {}));
        }

        return Property.get(data).then(response => {
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

        return Property.list(data).then(response => {
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

        return Property.save(data).then(response => {
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

        let { id } = data;

        axios.all([

            Property.get({ id }),

            PropertyStatus.list({from_cache: true, page_by: JSON.stringify({ per_page: 1000 }),
                sort_by: JSON.stringify({ asc_desc:'desc', order_by: 'name' }), }),

            PropertyType.list({from_cache: true, page_by: JSON.stringify({ per_page: 1000 }),
                sort_by: JSON.stringify({ asc_desc:'desc', order_by: 'name' }), }),

        ]).then(axios.spread((obj, property_statuses, property_types) => {
            let dependencies = {
                obj: obj.data,
                property_statuses: property_statuses.data.results,
                property_types: property_types.data.results,
            }
            let payload = {
                data,
                dependencies
            }
            dispatch(generateAction(ActionTypes.SUBMISSION_FORM_SUCCESSFUL, payload));
        })).catch(error => {
            console.log(error);
            dispatch(generateAction(ActionTypes.SUBMISSION_FORM_FAILED, error.response.data));
        })

    };
}

export function upload(data = {}, file) {
    return function(dispatch) {
        if(data.reloading) {
            dispatch(generateAction(ActionTypes.SUBMISSION_RELOADING, {}));
        } else {
            dispatch(generateAction(ActionTypes.SUBMISSION_LOADING, {}));
        }
        data.path = 'upload_image';

        return Property.uploadFile(data, file).then(response => {
            dispatch(generateAction(ActionTypes.SUBMISSION_UPLOAD_SUCCESSFUL, response.data));

        }).catch(error => {
            dispatch(generateAction(ActionTypes.SUBMISSION_UPLOAD_FAILED, error.response.data));
        });
    };
}
