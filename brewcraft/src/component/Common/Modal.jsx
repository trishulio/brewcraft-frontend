import React from "react";
import { Modal as ModalReactStrap, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const Modal = ({ show, close, title, children, size, footer }) => {
  return (
    <ModalReactStrap
      isOpen={show}
      toggle={() => close(false)}
      autoFocus={true}
      size={size}
    >
      <ModalHeader toggle={() => close(false)}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ModalReactStrap>
  );
};
