import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
    Modal,
    ModalBody,
    ModalFooter
} from "../Common/modal";

export const DeleteGuard = ({
    when,
    confirm,
    close,
    content
}) => {
    const [modalVisible, updateModalVisible] = useState(false);
    const [confirmedNavigation, updateConfirmedNavigation] = useState(false);

    useEffect(() => {
        updateModalVisible(when);
    }, [when]);

    const closeModal = cb => {
        close();
        if (cb) {
            try {
                cb();
            } catch {}
        }
    };

    const handleConfirmNavigationClick = () => {
        closeModal(() => {
            updateConfirmedNavigation(true);
        });
    };

    useEffect(() => {
        if (confirmedNavigation) {
            confirm();
            updateConfirmedNavigation(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation]);

    return (
        <>
            <Modal
                show={modalVisible}
                onValidSubmit={handleConfirmNavigationClick}
                close={closeModal}
                title="Warning!"
            >
                <ModalBody>
                    <p className="main_text">{content}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleConfirmNavigationClick}>Confirm</Button>
                    <Button color="primary" onClick={closeModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default DeleteGuard;