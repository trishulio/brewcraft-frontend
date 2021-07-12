import React from "react";
import { Modal as ModalReactStrap, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";

export const Modal = ({ show, close, title, children, size, footer, onValidSubmit }) => {
  return (
    <ModalReactStrap
      isOpen={show}
      toggle={() => close && close(false)}
      autoFocus={true}
      size={size}
    >
      <ModalHeader toggle={() => close && close(false)}>{title}</ModalHeader>
      {onValidSubmit ?
        // wrap in form when pass submit handler
        <AvForm onValidSubmit={onValidSubmit}>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </AvForm>
        :
        <React.Fragment>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </React.Fragment>
      }
    </ModalReactStrap>
  );
};
