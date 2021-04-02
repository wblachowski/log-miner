import { combineReducers } from 'redux';
import {clusters, clusterClicked} from './clusters';
import loading from './loading'
import error from './error'

const rootReducer = combineReducers({
    clusters, loading, error, clusterClicked
});

export default rootReducer;