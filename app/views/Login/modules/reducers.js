import { ActionTypes } from './actions';
import { generateReducer } from 'app/utils/generators';
import * as Reducers from 'app/services/reducers';


export default generateReducer(Reducers.defaultState, {

    [ActionTypes.LOGIN_LOADING]: Reducers.showLoading,
    [ActionTypes.LOGIN_RELOADING]: Reducers.showReloading,
    [ActionTypes.LOGIN_SAVE_SUCCESSFUL]: Reducers.saveSuccessful,
    [ActionTypes.LOGIN_SAVE_FAILED]: Reducers.saveFailed,
    [ActionTypes.LOGIN_FORM_SUCCESSFUL]: Reducers.formSuccessful,
});
