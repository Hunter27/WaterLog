import {
    FETCH_PUMPS_BEGIN,
    FETCH_PUMPS_SUCCESS,
    FETCH_PUMPS_FAILURE,
    handleErrors
} from './Types';

export const fetchPumpsBegin = () => ({
    type: FETCH_PUMPS_BEGIN
});

export const fetchPumpsSuccess = pump => ({
    type: FETCH_PUMPS_SUCCESS,
    payload: { pump }
});

export const fetchPumpsFailure = error => ({
    type: FETCH_PUMPS_FAILURE,
    payload: { error }
});

export const fetchPumps = id => dispatch => {
    dispatch(fetchPumpsBegin());
    fetch(process.env.REACT_APP_API_URL+`/api/pumps/${id}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(pump => {
            dispatch(fetchPumpsSuccess(pump));
        })
        .catch(error => dispatch(fetchPumpsFailure(error)));
};
