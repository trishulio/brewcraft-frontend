import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, CardFooter, Button } from "reactstrap";
import { Modal } from "../../component/Common/modal";
import EquipmentTable from "./component/table";
import {
    fetchFacilities,
    fetchEquipment,
    fetchEquipmentItem,
    createEquipmentItem,
    updateEquipmentItem,
    deleteEquipmentItem,
} from "../../store/Equipment/actions";
import EquipmentForm from "./component/form";

export default function Equipment() {
    const [isOpen, setIsOpen] = useState(false);
    const [equipmentItem, setEquipmentItem] = useState(null);
    const dispatch = useDispatch();
    const { equipment, facilities } = useSelector((state) => state.Equipment);

    const typeSelection = [
        "Barrel",
        "Boil Kettle",
        "Brite Tank",
        "Fermenter",
        "Mix Tank",
        "Serving Tank",
        "Tote",
        "Whirl Pool",
    ];

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Facility Equipment", [
                { title: "Dashboard", link: "/dashboard" },
            ])
        );
        dispatch(fetchEquipment());
        dispatch(fetchFacilities());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAddEquipment = () => {
        setEquipmentItem(null);
        setIsOpen(true);
    };

    const onEditEquipment = (equipmentId) => {
        dispatch(
            fetchEquipmentItem({
                id: equipmentId,
                success: (data) => {
                    setEquipmentItem(data);
                    setIsOpen(true);
                },
            })
        );
    };

    const onDeleteEquipment = (equipmentId) => {
        dispatch(
            deleteEquipmentItem({
                id: equipmentId,
                success: () => {
                    dispatch(fetchEquipment());
                },
            })
        );
    };

    const onDialogClose = (isSave, data) => {
        if (isSave) {
            if (equipmentItem) {
                dispatch(
                    updateEquipmentItem({
                        ...equipmentItem,
                        ...data,
                        success: () => {
                            dispatch(fetchEquipment());
                            setIsOpen(false);
                        },
                    })
                );
            } else {
                dispatch(
                    createEquipmentItem({
                        ...data,
                        success: () => {
                            dispatch(fetchEquipment());
                            setIsOpen(false);
                        },
                    })
                );
            }
        }
        setIsOpen(false);
    };

    return (
        <Fragment>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <EquipmentTable
                                equipment={equipment}
                                editEquipmentItem={onEditEquipment}
                                deleteEquipmentItem={onDeleteEquipment}
                            />
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col xs="12">
                                    <div className="float-left mt-1">
                                        <Button
                                            color="secondary"
                                            className="waves-effect"
                                            onClick={onAddEquipment}
                                        >
                                            Add Equipment
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            {!!isOpen && (
                <Modal
                    show={isOpen}
                    close={onDialogClose}
                    title={equipmentItem ? "Edit Equipment" : "Add Equipment"}
                >
                    <EquipmentForm
                        close={onDialogClose}
                        equipmentTypes={typeSelection}
                        facilities={facilities}
                        formModal={equipmentItem}
                    />
                </Modal>
            )}
        </Fragment>
    );
}
