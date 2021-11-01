import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    editMashMixture,
    editMashStage,
    setMashMixtureDetails,
    setMashStageDetails
} from "../../../../store/actions";

export default function BrewMash({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.MashStage.data;
    });

    const initialStage = useSelector(state => {
        return state.Batch.MashStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.MashMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.MashMixture.initial;
    });

    const dispatch = useDispatch();

    function setStage(stage) {
        dispatch(
            setMashStageDetails({
                data: stage
            })
        )
    }

    function setMixture(mixture) {
        dispatch(
            setMashMixtureDetails({
                data: mixture
            })
        )
    }

    function onSave() {
        dispatch(
            editMashStage({
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
            editMashMixture({
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
                    <div className="">
                        <Details {...detailsProps}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}