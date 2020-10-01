import { actionTypes } from "./actionTypes";

export const openModal = (content) => ({ type: actionTypes.OPEN_MODAL, payload: content });

export const closeModal = () => ({ type: actionTypes.CLOSE_MODAL });
