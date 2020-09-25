import { modalConstants } from "./modal-constants";

export const openModal = (content) => ({ type: modalConstants.OPEN_MODAL, payload: content });

export const closeModal = () => ({ type: modalConstants.CLOSE_MODAL });