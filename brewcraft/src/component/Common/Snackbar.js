import React from 'react';
import { toast, ToastContainer, MDBContainer } from 'mdbreact';

const Notification = () => {
  const notify = type => {
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message', {
            closeButton: false
          });
          break;
        case 'success':
          toast.success('Success message', {
            closeButton: false
          });
          break;
        case 'warning':
          toast.warn('Warning message', {
            closeButton: false
          });
          break;
        case 'error':
            default:
          toast.error('Error message', {
            closeButton: false
          });
          break;

      }
    };
  };

  return (
    <MDBContainer>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
    </MDBContainer>
  );
};

export default Notification;