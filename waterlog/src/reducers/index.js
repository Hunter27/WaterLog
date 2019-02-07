import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';
import segmentsReducer from './segmentsReducer';
import segmentEventReducer from './segmentEventsReducer';
import segmentLeaksReducer from './segmentLeaksReducer';
import leakCostsReducer from './leakCostsReducer';
import leakLitresReducer from './leakLitresReducer';

export default combineReducers({
    sensors: sensorReducer,
    segments: segmentsReducer,
    events: segmentEventReducer,
    leaks: segmentLeaksReducer,
    costs: leakCostsReducer,
    litres: leakLitresReducer

})