import { SET_EXITPOPUP_VISIBILITY } from '../constans/constants';

export function exitPopUpToogle() {
    return dispatch => {
        return dispatch({
            type: SET_EXITPOPUP_VISIBILITY,
        });
    };
}