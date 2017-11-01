import { ActionTypes } from './actions';
import { generateReducer } from 'app/utils/generators';
import * as Reducers from 'app/services/reducers';


export default generateReducer(Reducers.defaultState, {
    [ActionTypes.SUBMISSION_LOADING]: Reducers.showLoading,
    [ActionTypes.SUBMISSION_RELOADING]: Reducers.showReloading,
    [ActionTypes.SUBMISSION_LIST_SUCCESSFUL]: Reducers.listSuccessful,
    [ActionTypes.SUBMISSION_DETAIL_SUCCESSFUL]: Reducers.detailSuccessful,
    [ActionTypes.SUBMISSION_DETAIL_FAILED]: Reducers.detailFailed,
    [ActionTypes.SUBMISSION_SAVE_SUCCESSFUL]: Reducers.saveSuccessful,
    [ActionTypes.SUBMISSION_SAVE_FAILED]: Reducers.saveFailed,
    [ActionTypes.SUBMISSION_FORM_SUCCESSFUL]: Reducers.formSuccessful,
    [ActionTypes.SUBMISSION_FORM_FAILED]: Reducers.formFailed,
});
