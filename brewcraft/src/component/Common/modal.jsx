import React from "react";
import * as ReactStrap from "reactstrap";

export const ModalBody = props => {
    return (
        <ReactStrap.ModalBody>{props.children}</ReactStrap.ModalBody>
    );
}

export const ModalFooter = props => {
    return (
        <ReactStrap.ModalFooter>{props.children}</ReactStrap.ModalFooter>
    );
}

export const Modal = ({ show, close, title, size, children }) => {

    function onToggle() {
        close && close(false);
    }

    return (
        <ReactStrap.Modal
            isOpen={show}
            toggle={onToggle}
            autoFocus={true}
            size={size}
            >
            <ReactStrap.ModalHeader toggle={onToggle}>{title}</ReactStrap.ModalHeader>
            {children}
        </ReactStrap.Modal>
    );
};
