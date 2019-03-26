import { SET_DATA_WETHER } from '../constans/constants';

const initialState = {
};

export default function dataWether(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_DATA_WETHER:
            return {
                ...state,
                ...data,
            };
    
        default:
            return state;
    }
}