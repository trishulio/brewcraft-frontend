import { map } from "lodash";
import React, { useState } from "react";
import {
    Button
} from "reactstrap";
import { formatDatetime } from "../../../../helpers/textUtils";
import Modal from "../../../../component/MixtureRecording/modal";

export default function MixtureRecording({ title, mTitle, mUnit, mixture, measureId, multiple, editable }) {
    const [showModal, setShowModal] = useState(false);

    const props = {
        title: mTitle,
        unit: mUnit,
        mixture,
        measureId,
        show: showModal,
        setShow: setShowModal
    };

    return (
        <React.Fragment>
            {/* <h4 className="font-size-12 pt-3 pt-sm-0">{title}</h4> */}
            <hr/>
            {
                mixture && mixture.mixtureRecordings && map(mixture.mixtureRecordings, (record, index) => (
                    <div key={index} className="d-sm-inline-block mb-3"><span className="font-size-12"> {record.value} °C - {formatDatetime(record.recordedAt)}</span></div>
                ))
            }
            <div className="clearfix"></div>
            <Button
                size="sm"
                className="waves-effect"
                onClick={() => setShowModal(true)}
                hidden={!editable || (!multiple && mixture?.mixtureRecordings)}
            >
                Add
            </Button>
            <Modal {...props}/>
        </React.Fragment>
    );
}