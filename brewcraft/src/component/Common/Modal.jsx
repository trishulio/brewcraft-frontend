import React from "react";
import { Modal as ModalReactStrap, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const Modal = ({ show, handlerClose, title, children, size, footer }) => {
  return (
    <ModalReactStrap
      isOpen={show}
      toggle={() => handlerClose(false)}
      autoFocus={true}
      size={size}
    >
      <ModalHeader toggle={() => handlerClose(false)}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ModalReactStrap>
  );
};
