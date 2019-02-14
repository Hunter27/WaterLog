export const FETCH_SENSORS = 'FETCH_SENSORS';
export const FETCH_SEGMENTS = 'FETCH_SEGMENTS';
export const FETCH_SEGMENTS_EVENTS = 'FETCH_SEGMENTS_EVENTS';
export const FETCH_SEGMENTS_LEAKS_BEGIN = 'FETCH_SEGMENTS_LEAKS_BEGIN';
export const FETCH_SEGMENTS_LEAKS_SUCCESS = 'FETCH_SEGMENTS_LEAKS_SUCCESS';
export const FETCH_SEGMENTS_LEAKS_FAILURE = 'FETCH_SEGMENTS_LEAKS_FAILURE';
export const FETCH_SEGMENTS_LEAK = 'FETCH_SEGMENTS_LEAK';
export const FETCH_COSTS = 'FETCH_COSTS';
export const FETCH_LEAK_LITRES_BEGIN = 'FETCH_LEAK_LITRES_BEGIN';
export const FETCH_LEAK_LITRES_SUCCESS = 'FETCH_SEGMENTS_LEAKS_SUCCESS';
export const FETCH_LEAK_LITRES_FAILURE = 'FETCH_LEAK_LITRES_FAILURE';
export const FETCH_SEGMENTS_RESOLVED_BEGIN = 'FETCH_SEGMENTS_RESOLVED_BEGIN';
export const FETCH_SEGMENTS_RESOLVED_SUCCESS = 'FETCH_SEGMENTS_RESOLVED_SUCCESS';
export const FETCH_SEGMENTS_RESOLVED_FAILURE = 'FETCH_SEGMENTS_RESOLVED_FAILURE';
export const FETCH_SEGMENT_EVENTS_BEGIN = 'FETCH_SEGMENT_EVENTS_BEGIN';
export const FETCH_SEGMENT_EVENTS_SUCCESS = 'FETCH_SEGMENT_EVENTS_SUCCESS';
export const FETCH_SEGMENT_EVENTS_FAILURE = 'FETCH_SEGMENT_EVENTS_FAILURE';
export const FECTH_FORECAST_BEGIN = 'FECTH_FORECAST_BEGIN';
export const FECTH_FORECAST_FAILURE = 'FECTH_FORECAST_FAILURE';
export const FECTH_FORECAST_SUCCESS = 'FECTH_FORECAST_SUCCESS';

export const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
