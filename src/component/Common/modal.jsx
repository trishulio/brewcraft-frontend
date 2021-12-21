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
            <ReactStrap.ModalHeader toggle={onToggle} className="mb-0">
                {title}
            </ReactStrap.ModalHeader>
            {onError && (
                <ReactStrap.Alert color="info" className="mb-0">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </ReactStrap.Alert>
            )}
            {children}
        </ReactStrap.Modal>
    );
};
