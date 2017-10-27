// method class for generating action types

export function generateActionTypes(prefix = '', actions = []) {
    let actionMap = {};
    for(var idx in actions) {
        let successAction = [prefix, actions[idx], 'SUCCESSFUL'].join('_');
        let failAction = [prefix, actions[idx], 'FAILED'].join('_');
        let loadingAction = [prefix, 'LOADING'].join('_');
        let reloadingAction = [prefix, 'RELOADING'].join('_');
        let formLoadingAction = [prefix, 'FORM_LOADING'].join('_');
        actionMap[successAction] = successAction;
        actionMap[failAction] = failAction;
        actionMap[loadingAction] = loadingAction;
        actionMap[reloadingAction] = reloadingAction;
        actionMap[formLoadingAction] = formLoadingAction;
    }

    return actionMap;
}


export function generateAction(type, payload = {}) {
    return {
        type: type,
        payload: payload,
    };
}

export function generateReducer(initialState, handlers) {
    return function reducer(state, action) {
        if(state === undefined) state = initialState;

        if(handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}
