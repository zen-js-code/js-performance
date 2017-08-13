const DEFAULT_ACTION = {type: '', payload: {}, meta: {}};

export default function recipes(state = {}, action = DEFAULT_ACTION) {
    const {type = '', payload = {}, meta = {}} = action;
    let nextState;

    switch (type) {
        case 'LOAD_RECIPES_SUCCESS':
            nextState = payload.recipes;
            break;
        default:
            nextState = state;
    }

    return nextState;
}
