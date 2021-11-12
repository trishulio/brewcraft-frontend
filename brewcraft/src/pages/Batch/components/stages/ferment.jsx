import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFermentFinishedGoodsDetails,
    setFermentMaterialPortionDetails,
    setFermentMixtureDetails,
    setFermentMixtureRecords,
    setFermentStageDetails
} from "../../../../store/actions";
import Details from "../mixture/details";
import Ingredients from "../mixture/ingredients";
import Recordings from "../mixture/recording";
import FinishedGoods from "../mixture/finished-goods";
import { Col, Row } from "reactstrap";

export default function BatchFerment() {

    const dispatch = useDispatch();

    const { editable } = useSelector(state => {
        return state.Batch.Batch;
    });

    const stage = useSelector(state => {
        return state.Batch.FermentStage.data;
    });

    const mixture = useSelector(state => {
        return state.Batch.FermentMixture.data;
    });

    const materialPortions = useSelector(state => {
        return state.Batch.FermentMaterialPortion.content;
    });

    const mixtureRecordings = useSelector(state => {
        return state.Batch.FermentMixtureRecordings.content;
    });

    const finishedGoods = useSelector(state => {
        return state.Batch.FermentFinishedGoods.content;
    });

    function setStage(stage) {
        dispatch(
            setFermentStageDetails({
                data: {
                    ...stage
                }
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setFermentMixtureDetails({
                data: {
                    ...mixture
                }
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setFermentMaterialPortionDetails({
                content: [
                    ...materialPortions
                ]
            })
        );
    }

    function setMixtureRecordings(mixtureRecordings) {
        dispatch(
            setFermentMixtureRecords({
                content: [
                    ...mixtureRecordings
                ]
            })
        );
    }

    function setFinishedGoods(finishedGoods) {
        dispatch(
            setFermentFinishedGoodsDetails({
                content: [
                    ...finishedGoods
                ]
            })
        );
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
        showCompleteCheckbox: true
    };

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions
    };

    const recordingsProps = {
        mixture,
        editable,
        mixtureRecordings,
        setMixtureRecordings
    };

    const finishedGoodsProps = {
        mixture,
        editable,
        finishedGoods,
        setFinishedGoods
    };

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "#f8f9fa" }} className="p-4 text-center position-relative mb-4">
                <Row className="text-center">
                    <Col xs="4">
                        <h5 className="font-size-20">-</h5>
                        <p className="text-muted mb-0">Initial Volume</p>
                    </Col>
                    <Col xs="4">
                        <h5 className="font-size-20">-</h5>
                        <p className="text-muted mb-0">Volume</p>
                    </Col>
                    <Col xs="4">
                        <h5 className="font-size-20">-</h5>
                        <p className="text-muted mb-0">Packaged</p>
                    </Col>
                </Row>
            </div>
            <Details {...detailsProps}/>
            <div className="clearFix mb-4"></div>
            <div className="px-2 mb-4">
                <Ingredients {...ingredientsProps}/>
            </div>
            <div className="px-2 mb-4">
                <Recordings {...recordingsProps}/>
            </div>
            <div className="px-2">
                <FinishedGoods {...finishedGoodsProps}/>
            </div>
        </React.Fragment>
    );
}