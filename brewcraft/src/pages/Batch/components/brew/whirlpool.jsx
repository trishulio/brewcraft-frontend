import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import { editWhirlpoolMixture, editWhirlpoolStage, setWhirlpoolMixtureDetails, setWhirlpoolStageDetails } from "../../../../store/actions";
import Details from "../mixture/details";

export default function BrewWhirlpool({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.WhirlpoolStage.data;
    });

    const initialStage = useSelector(state => {
        return state.Batch.WhirlpoolStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.initial;
    });

    const dispatch = useDispatch();

    function setMixture(mixture) {
        dispatch(
            setWhirlpoolMixtureDetails({
                data: mixture
            })
        )
    }

    function setStage(mixture) {
        dispatch(
            setWhirlpoolStageDetails({
                data: mixture
            })
        )
    }

    function onSave() {
        dispatch(
            editWhirlpoolStage({
                id: stage.id,
                form: {
                    statusId : stage.status.id,
                    taskId: stage.task.id,
                    startedAt: stage.startedAt,
                    endedAt: stage.endedAt,
                    version: stage.version
                }
            })
        );
        dispatch(
            editWhirlpoolMixture({
                id: mixture.id,
                form: {
                    parentMixtureId: mixture.parentMixtureId,
                    quantity: {
                        ...mixture.quantity
                    },
                    brewStageId: mixture.brewStage.id,
                    version: mixture.version
                }
            })
        );
    }

    const detailsProps = {
        stage,
        initialStage,
        setStage,
        mixture,
        initialMixture,
        setMixture,
        onSave,
        editable
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="mb-3">
                        <Details {...detailsProps}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}