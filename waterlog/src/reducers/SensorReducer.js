import {
    FETCH_SENSORS
} from '../actions/Types';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SENSORS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}