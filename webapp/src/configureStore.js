import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./reducers";

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewaresEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewaresEnhancer];
    const composeEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, composeEnhancers);

    return store
}