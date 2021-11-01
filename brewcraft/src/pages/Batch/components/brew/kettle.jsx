import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Ingredients from "../mixture/ingredients";
import MixtureRecordings from "../mixture/recording";
import Temperatures from "../mixture/temperature";
import Times from "../mixture/details";
import { editKettleMixture, editKettleStage, setKettleMixtureDetails, setKettleStageDetails } from "../../../../store/actions";

export default function BrewKettle({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.KettleStage.data;
    });

    const initialStage = useSelector(state => {
        return state.Batch.KettleStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.KettleMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.KettleMixture.initial;
    });

    const dispatch = useDispatch();

    function setMixture(mixture) {
        dispatch(
            setKettleMixtureDetails({
                data: mixture
            })
        )
    }

    function setStage(mixture) {
        dispatch(
            setKettleStageDetails({
                data: mixture
            })
        )
    }

    function onSave() {
        dispatch(
            editKettleStage({
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
            editKettleMixture({
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
        setStage,
        initialStage,
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
                    <div className="m=">
                        <Times {...detailsProps}/>
                    </div>
                </Col>
                {/* <Col md="6">
                    <div className="mb-3">
                        <Temperatures {...recordingsProps}/>
                    </div>
                </Col>
                <Col md="6">
                    <div className="">
                        <Ingredients {...ingredientProps}/>
                    </div>
                </Col> */}
            </Row>
        </React.Fragment>
    );
}