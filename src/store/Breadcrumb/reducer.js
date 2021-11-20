import {
    SET_BREADCRUMB_ITEMS
} from './actionTypes';

const initialState={
    title : "",
    breadcrumbItems : [],
}

const layout = (state=initialState, action) => {
    switch(action.type){
        case SET_BREADCRUMB_ITEMS:
            return {
              ...state,
              title: action.payload.title,
              breadcrumbItems: action.payload.items,
              backButton: action.payload.backButton
            };

        default:
            state = {...state};
            break;
    }
    return state;
}

export default layout;