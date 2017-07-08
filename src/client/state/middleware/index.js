import {createStore, applyMiddleware, compose} from 'redux';

// Redux Dev. Middleware - necessary for Chrome Redux Extension.
// Must be included LAST in `compose`!
const devToolsMiddleware = window.devToolsExtension ?
    window.devToolsExtension() : function devToolsMiddleware() { return createStore; };

const devMiddleware = compose(
    devToolsMiddleware
);

function createThunkMiddleware(injected) {
    return ({dispatch, getState}) => {
        return next => (action) => {
            if (typeof action === 'function') {
                return action(dispatch, getState, injected);
            }

            return next(action);
        };
    };
}

function customMiddleware(/* store */) {
    return next => action => next(action);
}

export default compose(
    applyMiddleware(
        createThunkMiddleware(),
        customMiddleware
    ),
    devMiddleware
);
