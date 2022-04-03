import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Input, Label } from "reactstrap";
import { setEquipmentItem } from "../../../store/actions";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function EquipmentDetails({ editable }) {
    const dispatch = useDispatch();

    const {
        data: equipment,
        invalidName,
        invalidType,
        invalidStatus,
        invalidMaxCapacityValue,
        invalidMaxCapacitySymbol,
        loading,
    } = useSelector((state) => {
        return state.EquipmentItem;
    });

    function onFormInputChange(e) {
        switch (e.target.name) {
            case "equipmentName":
                dispatch(
                    setEquipmentItem({
                        data: {
                            ...equipment,
                            name: e.target.value,
                        },
                        invalidName: false,
                    })
                );
                break;
            case "equipmentType":
                dispatch(
                    setEquipmentItem({
                        data: {
                            ...equipment,
                            type: e.target.value,
                        },
                        invalidType: false,
                    })
                );
                break;
            case "equipmentStatus":
                dispatch(
                    setEquipmentItem({
                        data: {
                            ...equipment,
                            status: e.target.value,
                        },
                        invalidStatus: false,
                    })
                );
                break;
            case "equipmentMaxCapacityValue":
                dispatch(
                    setEquipmentItem({
                        data: {
                            ...equipment,
                            maxCapacity: {
                                ...equipment.maxCapacity,
                                value: e.target.value,
                            },
                        },
                        invalidMaxCapacityValue: false,
                    })
                );
                break;
            case "equipmentMaxCapacitySymbol":
                dispatch(
                    setEquipmentItem({
                        data: {
                            ...equipment,
                            maxCapacity: {
                                ...equipment.maxCapacity,
                                symbol: e.target.value,
                            },
                        },
                        invalidMaxCapacitySymbol: false,
                    })
                );
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>Equipment Item</CardHeader>
                <CardBody isLoading={loading}>
                    {console.log(equipment)}
                    <div className="form-group-validation">
                        <Label
                            for="equipmentName"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem",
                            }}
                        >
                            Name
                        </Label>
                        {editable && (
                            <FormGroup
                                className="d-inline-block mb-3"
                                hidden={!editable}
                                style={{
                                    maxWidth: "20rem",
                                    width: "100%",
                                }}
                            >
                                <Input
                                    type="text"
                                    className="faves-effect"
                                    width="20rem"
                                    value={equipment.name}
                                    placeholder="Enter"
                                    name="equipmentName"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidName}
                                />
                                <FormFeedback>
                                    {equipment.name.length > 0
                                        ? "Invalid equipment name field"
                                        : "Equipment name field must not be empty"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        {!editable && (
                            <div className="d-inline-block mb-2">
                                {equipment.name ? equipment.name : "-"}
                            </div>
                        )}
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group-validation">
                        <Label
                            for="equipmentType"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem",
                            }}
                        >
                            Type
                        </Label>
                        {editable && (
                            <FormGroup
                                className="d-inline-block mb-3"
                                hidden={!editable}
                                style={{
                                    maxWidth: "20rem",
                                    width: "100%",
                                }}
                            >
                                <Input
                                    type="select"
                                    className="faves-effect"
                                    width="20rem"
                                    value={equipment.type}
                                    placeholder="Enter"
                                    name="equipmentType"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidType}
                                >
                                    <option value="">Select</option>
                                    <option value="Boil Kettle">
                                        Boil Kettle
                                    </option>
                                    <option value="Fermenter">Fermenter</option>
                                    <option value="Serving Tank">
                                        Serving Tank
                                    </option>
                                    <option value="Mix Tank">Mix Tank</option>
                                    <option value="Tote">Tote</option>
                                    <option value="Whirl Pool">
                                        Whirl Pool
                                    </option>
                                    <option value="Barrel">Barrel</option>

                                    <option value="Brite Tank">
                                        Brite Tank
                                    </option>
                                </Input>
                                <FormFeedback>
                                    {equipment.type.length > 0
                                        ? "Invalid equipment type field"
                                        : "Equipment type field must not be empty"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        {!editable && (
                            <div className="d-inline-block mb-2">
                                {equipment.type ? equipment.type : "-"}
                            </div>
                        )}
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group-validation">
                        <Label
                            for="equipmentStatus"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem",
                            }}
                        >
                            Status
                        </Label>
                        {editable && (
                            <FormGroup
                                className="d-inline-block mb-3"
                                hidden={!editable}
                                style={{
                                    maxWidth: "20rem",
                                    width: "100%",
                                }}
                            >
                                <Input
                                    type="select"
                                    className="faves-effect"
                                    width="20rem"
                                    value={equipment.status}
                                    placeholder="Enter"
                                    name="equipmentStatus"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidStatus}
                                >
                                    <option value="">Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Input>
                                <FormFeedback>
                                    {equipment.status.length > 0
                                        ? "Invalid equipment status field"
                                        : "Equipment status field must not be empty"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        {!editable && (
                            <div className="d-inline-block mb-2">
                                {equipment.status ? equipment.status : "-"}
                            </div>
                        )}
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group-validation">
                        <Label
                            for="equipmentMaxCapacityValue"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem",
                            }}
                        >
                            Max Capacity
                        </Label>
                        {editable && (
                            <FormGroup
                                className="d-inline-block mb-3"
                                hidden={!editable}
                                style={{
                                    maxWidth: "20rem",
                                    width: "100%",
                                }}
                            >
                                <Input
                                    type="text"
                                    className="faves-effect"
                                    width="10rem"
                                    value={equipment.maxCapacity.value}
                                    placeholder="Enter"
                                    name="equipmentMaxCapacityValue"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidMaxCapacityValue}
                                />
                                <FormFeedback>
                                    {equipment.maxCapacity.value.length > 0
                                        ? "Invalid equipment max capacity field"
                                        : "Equipment max capacity field must not be empty"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        {!editable && (
                            <div className="d-inline-block mb-2">
                                {equipment.maxCapacity.value
                                    ? equipment.maxCapacity.value
                                    : "-"}
                            </div>
                        )}
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group-validation">
                        <Label
                            for="equipmentMaxCapacitySymbol"
                            className="d-inline-block mb-3"
                            style={{
                                width: "10rem",
                            }}
                        >
                            Units
                        </Label>
                        {editable && (
                            <FormGroup
                                className="d-inline-block mb-3"
                                hidden={!editable}
                                style={{
                                    maxWidth: "20rem",
                                    width: "100%",
                                }}
                            >
                                <Input
                                    type="select"
                                    className="faves-effect"
                                    width="10rem"
                                    value={equipment.maxCapacity.symbol}
                                    placeholder="Enter"
                                    name="equipmentMaxCapacitySymbol"
                                    disabled={!editable}
                                    onChange={onFormInputChange}
                                    invalid={invalidMaxCapacitySymbol}
                                >
                                    <option value="">Select</option>
                                    <option value="l">Litres (l)</option>
                                    <option value="hl">Hectolitres (hl)</option>
                                </Input>
                                <FormFeedback>
                                    {equipment.maxCapacity.symbol.length > 0
                                        ? "Invalid equipment measure field"
                                        : "Equipment max measure must not be empty"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        {!editable && (
                            <div className="d-inline-block mb-2">
                                {equipment.maxCapacity.symbol
                                    ? equipment.maxCapacity.symbol
                                    : "-"}
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
