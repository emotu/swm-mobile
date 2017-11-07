
export const defaultState = {
    isLoaded: false,
    isButtonLoaded: false,
    isReloaded: false,
    isFormLoaded: false,
    isUploadCompleted: false,
    saveSuccessful: false,
    saveFailed: false,
    actionSuccessful: false,
    uploadSuccessful: false,
    results: [],
    page_by: {},
    filter_by: {},
    sort_by: {},
    dependencies: {},
    errors: {},
    query: undefined,
    data: {},
};

export function showLoading(state, action = {}) {
    /* Function to handle loading page or activities */
    return ({...state, ...{saveSuccessful: false, actionSuccessful: false, saveFailed: false, action: action,
        isLoaded: false, isReloaded: false, isFormLoaded: false, uploadSuccessful: false}});
}

export function showReloading(state, action = {}) {
    /* Function to handle loading page or activities */
    return ({...state, ...{saveSuccessful: false, actionSuccessful: false, saveFailed: false, action: action,
        isLoaded: true, isReloaded: false, isFormLoaded: true, uploadSuccessful: false}});
}

export function showFormLoading(state, action = {}) {
    /* Function to handle loading page or activities */
    return ({...state, ...{saveSuccessful: false, actionSuccessful: false, saveFailed: false, action: action,
        isLoaded: true, isReloaded: true, isFormLoaded: false, uploadSuccessful: false}});
}

export function showUploadLoading(state, action = {}) {
    /* Function to handle loading page or activities */
    return ({...state, ...{saveSuccessful: false, actionSuccessful: false, saveFailed: false, action: action,
        isLoaded: true, isReloaded: true, isFormLoaded: true, isUploadCompleted: false, uploadSuccessful: false}});
}

export function listSuccessful(state, action) {
    /* Function to handle processing the list results page */

    let payload = action.payload;
    let data = {
        results: payload.results,
        filter_by: payload.filter_by,
        sort_by: payload.sort_by,
        page_by: payload.page_by,
        query: payload.query,
        view: payload.view,

    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, actionSuccessful: false}});
}


export function detailSuccessful(state, action) {
    let payload = action.payload;
    let data = {
        obj: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, actionSuccessful: false}});
}

export function formSuccessful(state, action) {

    let payload = action.payload;
    let data = {
        data: payload.data,
        dependencies: payload.dependencies,
        errors: {},
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true,
         isUploadCompleted: false, saveSuccessful: false, actionSuccessful: false}, uploadSuccessful: false});
}

export function saveSuccessful(state, action) {

    let payload = action.payload;
    let data = {
        data: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveFailed: false,
         isUploadCompleted: false, uploadSuccessful: false, saveSuccessful: true, actionSuccessful: false}});
}

export function saveFailed(state, action) {

    let payload = action.payload;
    let data = {
        errors: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, isUploadCompleted: false, saveSuccessful: false, saveFailed: true, uploadSuccessful: false, actionSuccessful: false}});
}

export function deleteSuccessful(state, action) {

    let payload = action.payload;
    let data = {
        data: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveSuccessful: true, uploadSuccessful: false, actionSuccessful: false, isUploadCompleted: false, saveFailed: false}});
}

export function deleteFailed(state, action) {

    let payload = action.payload;
    let data = {
        errors: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveSuccessful: false, actionSuccessful: false}});
}

export function doActionFailed(state, action) {

    let payload = action.payload;
    let data = {
        errors: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveSuccessful: false, actionSuccessful: false}});
}

export function doActionSuccessful(state, action) {

    let payload = action.payload;
    let data = {
        data: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveSuccessful: true, actionSuccessful: true}});
}

export function uploadFailed(state, action) {

    let payload = action.payload;
    let data = {
        errors: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveSuccessful: false, isUploadCompleted: true, uploadSuccessful: false, saveFailed: false, actionSuccessful: false}});
}

export function uploadSuccessful(state, action) {

    let payload = action.payload;
    let data = {
        data: payload,
    };

    return ({...state, ...data, ...{isLoaded: true, isReloaded: true, isFormLoaded: true, saveSuccessful: true, isUploadCompleted: true, uploadSuccessful: true, saveFailed: false, actionSuccessful: true}});
}
