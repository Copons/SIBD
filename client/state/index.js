import { combineReducers, createStore } from 'redux';

import elements from 'state/elements/reducer';

const reducers = combineReducers({ elements });

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
