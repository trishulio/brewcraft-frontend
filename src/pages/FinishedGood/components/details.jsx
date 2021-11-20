import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    FormFeedback,
    Input,
    Label
} from "reactstrap";
import {
    setFinishedGoodDetails,
    setFinishedGoodInvalidName
} from "../../../store/actions";

export default function FinishedGoodDetails({ editable }) {

    const { invalidName } = useSelector(state => {
        return state.FinishedGood
    });

    const finishedGood = useSelector(state => {
        return state.FinishedGood.data;
    });

    const dispatch = useDispatch();

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "finishedGoodName":
                if (finishedGood.name !== e.target.value) {
                    dispatch(setFinishedGoodInvalidName(!e.target.value));
                    dispatch(setFinishedGoodDetails({
                        name: e.target.value
                    }));
                }
                break;
            default:
                dispatch(setFinishedGoodDetails({
                    [e.target.name]: e.target.value
                }));
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Finished Good Details</h4>
                    <Row>
                        <Col xs="2">
                            <Label
                                for="name"
                                className="mb-3"
                            >
                                Name
                            </Label>
                        </Col>
                        <Col xs="8">
                            <FormGroup
                                hidden={!editable}
                            >
                                <Input
                                    type="text"
                                    className="waves-effect"
                                    bsSize="sm"
                                    value={finishedGood.name}
                                    placeholder="Enter"
                                    name="finishedGoodName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>Enter a valid finishedGood name.</FormFeedback>
                            </FormGroup>
                            <div hidden={editable}>
                                {finishedGood.name ? finishedGood.name : "-"}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
