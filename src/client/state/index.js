import {createStore} from 'redux';

import middleware from './middleware';
import rootReducer from './reducers';
import initialState from './initial';

export default createStore(rootReducer, initialState, middleware);
