import { OPEN_MODAL, CLOSE_MODAL  } from "./actionTypes";

export const openModal = (content) => ({ type: OPEN_MODAL, payload: content });

export const closeModal = () => ({ type: CLOSE_MODAL });
