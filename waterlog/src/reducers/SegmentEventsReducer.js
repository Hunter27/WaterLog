import {
    FETCH_SEGMENTS_EVENTS
} from '../actions/Types';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEGMENTS_EVENTS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}