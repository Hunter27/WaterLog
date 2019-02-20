import { FETCH_WASTAGE_MONTHLY_BEGIN, FETCH_WASTAGE_MONTHLY_FAILURE,FETCH_WASTAGE_MONTHLY_SUCCESS,handleErrors} from "./Types";

//import { FETCH_WASTAGE_DAILY, FETCH_WASTAGE_MONTHLY , FETCH_WASTAGE_SEASONALLY, FETCH_WASTAGE_DAILY_BEGIN, FETCH_WASTAGE_DAILY_FAILURE, FETCH_WASTAGE_DAILY_SUCCESS} from "./Types";
import { Globals } from './../Globals';
export const fetchhWastageMonthlyBegin = () => ({
  type: FETCH_WASTAGE_MONTHLY_BEGIN
});

export const fetchWastageMonthlySuccess = (monthlyWaste) => ({
  type: FETCH_WASTAGE_MONTHLY_SUCCESS,
  payload: { monthlyWaste },
  loading:false
});

export const fetchWastageMonthlyFailure = (error) => ({
  type: FETCH_WASTAGE_MONTHLY_FAILURE,
  payload: { error },
  loading: false
});

export const fetchWastageMonthly =() => (dispatch) => {
  dispatch(fetchhWastageMonthlyBegin())
  fetch(process.env.REACT_APP_API_URL+'/api/segmentevents/monthlywastage') //Change to use either localhost/server
      .then(handleErrors)
      .then(res => res.json())
      .then(monthlyWaste => {
        dispatch(fetchWastageMonthlySuccess(monthlyWaste));
        })
        .catch((error) => {
            dispatch(fetchWastageMonthlyFailure(error));
        });
}; 