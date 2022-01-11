import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroupItem,
    Input,
    FormGroup,
    FormFeedback,
} from "reactstrap";
import { isFloat } from "../../../helpers/textUtils";
import { validAmount, validId } from "../../../helpers/utils";
import { setPurchaseInvoiceItems } from "../../../store/actions";

/**
 *
 * @param {any} value
 * @description repeate row
 * @author Anuj Gupta
 *
 */

export default function PurchaseInvoiceItem({ indexv, editable }) {
    const dispatch = useDispatch();

    const { procurementItems: items } = useSelector((state) => {
        return state.Procurement.data;
    });

    const item = useSelector((state) => {
        return state.Procurement.data.procurementItems[indexv];
    });

    const materials = useSelector((state) => {
        return state.Ingredients.all.concat(state.Packaging.all);
    });

    function changeevent(e) {
        const itemsNew = [...items];
        switch (e.target.name) {
            case "purchaseInvoiceItemMaterial":
                itemsNew[indexv].invoiceItem.material =
                    materials.find((m) => m.id === parseInt(e.target.value)) ||
                    "";
                itemsNew[indexv].invoiceItem.invalidMaterial = !validId(
                    itemsNew[indexv].invoiceItem.material?.id
                );
                break;
            case "purchaseInvoiceItemDescription":
                itemsNew[indexv].invoiceItem.description = e.target.value;
                itemsNew[indexv].invoiceItem.invalidDescription =
                    e.target.value.length === 0;
                break;
            case "purchaseInvoiceItemQuantity":
                itemsNew[indexv].invoiceItem.quantity.value = e.target.value;
                itemsNew[indexv].invoiceItem.invalidQuantity = !validAmount(
                    parseFloat(e.target.value)
                );
                break;
            case "purchaseInvoiceItemPrice":
                itemsNew[indexv].invoiceItem.price.amount = e.target.value;
                itemsNew[indexv].invoiceItem.invalidPrice = !validAmount(
                    parseFloat(e.target.value)
                );
                break;
            case "purchaseInvoiceItemTax":
                itemsNew[indexv].invoiceItem.tax.amount.amount = e.target.value;
                itemsNew[indexv].invoiceItem.invalidTax = !validAmount(
                    parseFloat(e.target.value)
                );
                break;
            case "purchaseInvoiceItemLot":
                itemsNew[indexv].materialLot.lotNumber = e.target.value;
                itemsNew[indexv].materialLot.invalidLotNumber = !e.target.value;
                break;
            default:
                return;
        }
        dispatch(setPurchaseInvoiceItems(itemsNew));
    }

    function removeItem() {
        items.splice(indexv, 1);
        dispatch(setPurchaseInvoiceItems(items));
    }

    function formatAmount() {
        if (
            item.invoiceItem.quantity.value &&
            item.invoiceItem.price.amount &&
            item.invoiceItem.tax.amount.amount
        ) {
            const amount =
                parseFloat(item.invoiceItem.quantity.value) *
                parseFloat(item.invoiceItem.price.amount) *
                (parseFloat(item.invoiceItem.tax.amount.amount) + 1.0);
            if (Number.isInteger(amount) || isFloat(amount)) {
                return amount.toFixed(2);
            }
        }
    }

    return (
        <React.Fragment>
            <ListGroupItem>
                <Row>
                    <Col xs="3">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="purchaseInvoiceItemMaterial"
                                    value={item.invoiceItem.material?.id || ""}
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidMaterial}
                                >
                                    <option value="">Select item</option>
                                    {materials.map((value, index) => (
                                        <option key={index} value={value.id}>
                                            {value.name} (
                                            {value.baseQuantityUnit})
                                        </option>
                                    ))}
                                </Input>
                                <FormFeedback>
                                    {!item.invoiceItem.material?.id
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {item.invoiceItem.material?.name || "-"}
                        </div>
                    </Col>
                    <Col xs="3">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="purchaseInvoiceItemDescription"
                                    rows="1"
                                    value={item.invoiceItem.description}
                                    onChange={changeevent}
                                    hidden={!editable}
                                />
                                <FormFeedback>
                                    Invalid invoice field
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {item.invoiceItem.description || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="purchaseInvoiceItemLot"
                                    onChange={changeevent}
                                    value={item.materialLot.lotNumber || ""}
                                    invalid={item.materialLot.invalidLotNumber}
                                />
                                <FormFeedback>
                                    Invalid invoice field
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {item.materialLot.lotNumber || "-"}
                        </div>
                        <FormFeedback>Invalid invoice field</FormFeedback>
                    </Col>
                    <Col xs="1">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="purchaseInvoiceItemQuantity"
                                    value={
                                        item.invoiceItem.quantity?.value || ""
                                    }
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidQuantity}
                                />
                                <FormFeedback>
                                    {!item.invoiceItem.quantity.value &&
                                    item.invoiceItem.quantity.value !== "0"
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {item.invoiceItem.quantity.value || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="purchaseInvoiceItemPrice"
                                    value={item.invoiceItem.price?.amount || ""}
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidPrice}
                                />
                                <FormFeedback>
                                    {!item.invoiceItem.price.amount &&
                                    item.invoiceItem.price.amount !== "0"
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {item.invoiceItem.price.amount || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="purchaseInvoiceItemTax"
                                    value={
                                        item.invoiceItem.tax.amount?.amount ||
                                        ""
                                    }
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidTax}
                                />
                                <FormFeedback>
                                    {!item.invoiceItem.tax.amount.amount &&
                                    item.invoiceItem.tax.amount.amount !== "0"
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {item.invoiceItem.tax.amount.amount || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        <Input
                            type="text"
                            name="purchaseInvoiceItemAmount"
                            value={formatAmount() || "-"}
                            onChange={changeevent}
                            disabled={true}
                            hidden={!editable}
                        />
                        <div hidden={editable}>{formatAmount() || "-"}</div>
                    </Col>
                    <Col xs="1">
                        <span
                            style={{ lineHeight: "2rem" }}
                            className="align-middle"
                        >
                            <i
                                className="mdi mdi-delete pointer iconhover iconfont"
                                title="delete item"
                                onClick={removeItem}
                                hidden={!editable}
                            ></i>
                        </span>
                    </Col>
                </Row>
            </ListGroupItem>
        </React.Fragment>
    );
}
