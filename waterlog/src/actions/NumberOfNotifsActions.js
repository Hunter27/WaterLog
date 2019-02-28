// action types
import axios from 'axios';
export const FETCH_NOTIF = 'FETCH_JOKE';
export const FETCH_NOTIF_SUCCESS = 'FETCH_JOKE_SUCCESS';
export const FETCH_NOTIF_FAILURE = 'FETCH_JOKE_FAILURE';


function fetchNotification() {
  return {
    type: FETCH_NOTIF
  };
}

function fetchNotifSuccess(data) {
  return {
    type: FETCH_NOTIF_SUCCESS,
    data
  };
}

function fetchNotifFail(error) {
  return {
    type: FETCH_NOTIF_FAILURE,
    error
  };
}

export function fetchNotifications(){
  return function(dispatch){
    dispatch(fetchNotification());
    return axios.get(process.env.REACT_APP_API_URL+'/api/realtime/pollnotifications', { headers: { 'Accept': 'application/json' }})
    .then(function(result){
      dispatch(fetchNotifSuccess(result))
    })
    .catch(error => dispatch(fetchNotifFail(error)));
  }
}