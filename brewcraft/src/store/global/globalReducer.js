import { combineReducers } from 'redux';
import { modalReducer } from '../modal/modal-reducer';

export const globalReducer = combineReducers({
    modal: modalReducer,
})