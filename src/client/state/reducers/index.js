import {combineReducers} from 'redux';

import config from './config';
import recipes from './recipes';

export default combineReducers({
    config,
    recipes
});
