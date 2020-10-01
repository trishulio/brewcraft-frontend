import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";

const Modalcall = ({ show, handlerClose, title, children, size }) => {
  return (
    <Modal
      isOpen={show}
      toggle={() => handlerClose(false)}
      autoFocus={true}
      size={size}
    >
      <ModalHeader toggle={() => handlerClose(false)}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
export { Modalcall };
