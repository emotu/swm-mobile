import { ActionTypes } from './actions';
import { generateReducer } from 'app/utils/generators';
import * as Reducers from 'app/services/reducers';


export default generateReducer(Reducers.defaultState, {
    [ActionTypes.TASK_LOADING]: Reducers.showLoading,
    [ActionTypes.TASK_RELOADING]: Reducers.showReloading,
    [ActionTypes.TASK_LIST_SUCCESSFUL]: Reducers.listSuccessful,
    [ActionTypes.TASK_DETAIL_SUCCESSFUL]: Reducers.detailSuccessful,
    [ActionTypes.TASK_DETAIL_FAILED]: Reducers.detailFailed,
    [ActionTypes.TASK_SAVE_SUCCESSFUL]: Reducers.saveSuccessful,
    [ActionTypes.TASK_SAVE_FAILED]: Reducers.saveFailed,
    [ActionTypes.TASK_FORM_SUCCESSFUL]: Reducers.formSuccessful,
    [ActionTypes.TASK_FORM_FAILED]: Reducers.formFailed,
});
