import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Row, TabContent, TabPane } from "reactstrap";
import { setBatchDetails } from "../../store/actions";
import { Card, CardBody } from "../../component/Common/Card";
import BatchDetails from "./components/details";
import Toolbar from "./components/toolbar";
import BatchPeople from "./components/people";
// import BatchComments from "./components/comments";
import BatchFileUploads from "./components/uploads";
import { ErrorMessage } from "../../helpers/textUtils";
import Nav from "./components/nav";
import Brew from "./components/brewhouse";
import Cellar from "./components/cellar";

function BrewTab({ indexv, mashMixture }) {
    return (
        <TabPane tabId={"brew-" + (indexv + 1)}>
            <div className="accordion">
                <Brew mashMixture={mashMixture} />
            </div>
        </TabPane>
    );
}

function CellarTab({ indexv, fermentMixture }) {
    return (
        <TabPane tabId={"brew-" + (indexv + 1)}>
            <div className="accordion">
                <Cellar fermentMixture={fermentMixture} />
            </div>
        </TabPane>
    );
}

export default function Batch(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        data: batch,
        initial: initialBatch,
        error,
    } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const mashMixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.content.filter(
            (m) => m.brewStage.task.id === 1
        );
    });

    const fermentMixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.content.filter(
            (m) => m.brewStage.task.id === 7
        );
    });

    return (
        <React.Fragment>
            <div className="mb-3">
                <Toolbar {...props} />
            </div>

            {!!error && <ErrorMessage {...error} />}
            <Row>
                <Col xl="8">
                    <Card>
                        <CardBody className="px-2 px-sm-3">
                            <div className="mb-3">
                                <Nav
                                    activeTab={props.activeTab}
                                    setActiveTab={props.setActiveTab}
                                />
                            </div>
                            <TabContent activeTab={props.activeTab}>
                                <TabPane tabId="details">
                                    <BatchDetails {...props} />
                                    <BatchFileUploads {...props} />
                                </TabPane>
                                {mashMixtures.map((mixture, index) => {
                                    return (
                                        <BrewTab
                                            key={index}
                                            indexv={index}
                                            mashMixture={mixture}
                                        />
                                    );
                                })}
                                {fermentMixtures.map((mixture, index) => {
                                    return (
                                        <CellarTab
                                            key={index + mashMixtures.length}
                                            indexv={index + mashMixtures.length}
                                            fermentMixture={mixture}
                                        />
                                    );
                                })}
                            </TabContent>
                        </CardBody>
                    </Card>
                    {/* <Card>
                        <CardBody className="px-2 px-sm-3">
                            <BatchComments {...props} />
                        </CardBody>
                    </Card> */}
                </Col>
                <Col sm={6} xl="4">
                    <Card>
                        <CardBody className="px-2 px-sm-3">
                            <BatchPeople />
                            <Button
                                type="button"
                                color="primary"
                                className="waves-effect mr-2"
                                onClick={props.onSave}
                                size="sm"
                                disabled={!props.changed}
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
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
