function loadRecipes(name) {
    return async function(dispatch, getState) {
        const response = await fetch(`/api/recipes/${name}`);
        const data = await response.json();

        dispatch({
            type: 'LOAD_RECIPES_SUCCESS',
            payload: data
        });
    };
}

export {
    loadRecipes
};
