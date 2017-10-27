import { ActionTypes } from './actions';
import { generateReducer } from 'app/utils/generators';
import * as Reducers from 'app/services/reducers';


export default generateReducer(Reducers.defaultState, {

    [ActionTypes.LAUNCH_LOADING]: Reducers.showLoading,
    [ActionTypes.LAUNCH_RELOADING]: Reducers.showReloading,
    [ActionTypes.LAUNCH_SAVE_SUCCESSFUL]: Reducers.saveSuccessful,
    [ActionTypes.LAUNCH_SAVE_FAILED]: Reducers.saveFailed,
    [ActionTypes.LAUNCH_FORM_SUCCESSFUL]: Reducers.formSuccessful,
});
