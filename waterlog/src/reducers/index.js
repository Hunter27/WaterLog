import { combineReducers } from 'redux';
import SegmentLeaksReducer from './SegmentLeaksReducer';
import SegmentLeaksByIdReducer from './SegmentLeaksByIdReducer';
import LeakLitresReducer from './LeakLitresReducer';
import LeaksResolvedReducer from './LeaksResolvedReducer';
import SegmentEventsReducer from './SegmentEventsReducer';
import ForecastChartReducer from './ForecastChartReducer';
import PumpsReducer from './PumpsReducer';

export default combineReducers({
	leaks: SegmentLeaksReducer,
	leak: SegmentLeaksByIdReducer,
	litres: LeakLitresReducer,
	leaksResolves: LeaksResolvedReducer,
  events: SegmentEventsReducer,
  lineParameters: ForecastChartReducer,
  pumps: PumpsReducer
});


