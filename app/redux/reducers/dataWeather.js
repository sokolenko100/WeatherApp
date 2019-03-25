import { SET_DATA_WETHER } from '../constans/constants';

const initialState = {
    dataWether: {},
};

export default function dataWetherReducer(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_DATA_WETHER:
            return {
                ...state,
                dataWether: data,
            };
    
        default:
            return state;
    }
}