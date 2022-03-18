import React, { useState } from "react";
import Toolbar from "../../../component/Common/toolbar";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import FinishedGoodModal from "../../FinishedGood/finishedGoodModal";

export default function FinishedGoodsInventoryToolbar() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalProps = {
        show: show,
        handleClose,
    };
    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/inventory/finished-goods/new",
                        search: "?edit=true",
                    });
                }}
            >
                New Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/inventory/finished-goods/new",
                        search: "?edit=true&repackage=true",
                    });
                }}
            >
                Repackage Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={handleShow}
            >
                Modal
            </Button>
            <FinishedGoodModal {...modalProps}></FinishedGoodModal>
        </Toolbar>
    );
}
