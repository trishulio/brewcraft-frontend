import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

class NewTransactionWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open: props.is_open
        };

        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
        this.setState(() => ({
            is_open: false
        }));
    }

    handleSave() {

    }

    render() {
        return (
            <Modal
                isOpen={this.state.is_open}
                toggle={this.state.toggle}
                autoFocus={true}
    >
            <ModalHeader>
                Modal Heading
            </ModalHeader >
                <ModalBody>
                    <h5>Overflowing text to show scroll behavior</h5>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                    </p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                    </p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" className="waves-effect" onClick={this.handleClose}>Close</Button>
                    <Button type="button" color="primary" className="waves-effect waves-light">Save changes</Button>
                </ModalFooter>
            </Modal>
        )
    }
};

export default NewTransactionWizard;