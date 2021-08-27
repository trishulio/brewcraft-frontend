import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Button } from "reactstrap";
import { Modal } from "../Common/modal";

export const RouteLeavingGuard = ({
    navigate,
    when,
    shouldBlockNavigation,
    content
}) => {
    const [modalVisible, updateModalVisible] = useState(false);
    const [lastLocation, updateLastLocation] = useState();
    const [confirmedNavigation, updateConfirmedNavigation] = useState(false);

    const showModal = location => {
        updateModalVisible(true);
        updateLastLocation(location);
    };

    const closeModal = cb => {
        updateModalVisible(false);
        if (cb) {
            try {
                cb();
            } catch {}
        }
    };

    const handleBlockedNavigation = nextLocation => {
        if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
            showModal(nextLocation);
            return false;
        }
        return true;
    };

    const handleConfirmNavigationClick = () => {
        closeModal(() => {
            if (lastLocation) {
                updateConfirmedNavigation(true);
            }
        });
    };

    useEffect(() => {
        if (confirmedNavigation) {
            navigate(lastLocation.pathname);
            updateConfirmedNavigation(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation]);

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <Modal
        show={modalVisible}
        onValidSubmit={handleConfirmNavigationClick}
        close={closeModal}
        title={"Hi"}
        footer={(
            <React.Fragment>
                <Button color="secondary" onClick={handleConfirmNavigationClick}>Confirm</Button>
                <Button color="primary" onClick={closeModal}>Cancel</Button>
            </React.Fragment>
          )}
      >
        <p className="main_text">{content}</p>
      </Modal>
    </>
  );
};

export default RouteLeavingGuard;
