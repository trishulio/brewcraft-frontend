import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { setBatchDetails } from "../../store/actions";
import { Card, CardBody } from "../../component/Common/Card";
import BatchDetails from "./components/details";
import Toolbar from "./components/toolbar";
import BatchPeople from "./components/people";
import BatchComments from "./components/comments";
import BatchDescription from "./components/description";
import BatchFileUploads from "./components/uploads";
import Brewhouse from "./components/brewhouse/brewhouse";
import Fermentation from "./components/fermentation/fermentation";

export default function Batch(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data: batch, initial: initialBatch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const changed = useSelector((state) => {
        return (
            state.Batch.Batch.changed ||
            state.Batch.MashStage.changed ||
            state.Batch.KettleStage.changed ||
            state.Batch.WhirlpoolStage.changed ||
            state.Batch.FermentStage.changed
        );
    });

    return (
        <React.Fragment>
            <div style={{ maxWidth: "80rem" }}>
                <div className="mb-3">
                    <Toolbar {...props} />
                </div>
                <Card>
                    <CardBody className="px-2 px-sm-3">
                        <Row>
                            <Col xl="8">
                                <div className="mb-2">
                                    <BatchDetails {...props} />
                                </div>
                                <div className="mb-2">
                                    <BatchDescription />
                                </div>
                                <div className="mb-2">
                                    <BatchFileUploads />
                                </div>
                                <Brewhouse {...props} />
                                <Fermentation {...props} />
                                <BatchComments />
                            </Col>
                            <Col sm={6} xl="4">
                                <div className="mb-2">
                                    <BatchPeople />
                                </div>
                                <Button
                                    type="button"
                                    color="primary"
                                    className="waves-effect mr-2"
                                    onClick={props.onSave}
                                    size="sm"
                                    disabled={!changed}
                                >
                                    {!batch.id ? "Create" : "Save"}
                                </Button>
                                <Button
                                    type="button"
                                    color="secondary"
                                    className="waves-effect mr-2"
                                    size="sm"
                                    onClick={() => {
                                        if (!batch.id) {
                                            history.goBack();
                                        }
                                        dispatch(
                                            setBatchDetails({
                                                data: {
                                                    ...initialBatch,
                                                },
                                                editable: false,
                                            })
                                        );
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
}
