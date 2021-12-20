import React from "react";
import * as ReactStrap from "reactstrap";

export const ModalBody = (props) => {
    return <ReactStrap.ModalBody>{props.children}</ReactStrap.ModalBody>;
};

export const ModalFooter = (props) => {
    return <ReactStrap.ModalFooter>{props.children}</ReactStrap.ModalFooter>;
};

export const Modal = ({ show, close, title, size, children, onError }) => {
    function onToggle() {
        close && close(false);
    }

    const props = {
        centered: true,
        isOpen: show,
        toggle: onToggle,
        autoFocus: true,
        size,
        fade: false,
        className: onError && "shake_anim",
    };

    return (
        <ReactStrap.Modal {...props}>
            <ReactStrap.ModalHeader toggle={onToggle}>
                {title}
            </ReactStrap.ModalHeader>
            {children}
        </ReactStrap.Modal>
    );
};
