import { SET_TEMPERATURE_DATA } from '../constans/constants';

const initialState = {
    dataTemperature: {},
};

export default function dataTemperature(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_TEMPERATURE_DATA:
            return {
                ...state,
                dataTemperature: data,
            };
    
        default:
            return state;
    }
}