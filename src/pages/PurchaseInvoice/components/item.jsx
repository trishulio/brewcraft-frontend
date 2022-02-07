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
import { formatCurrency, isFloat } from "../../../helpers/textUtils";
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
        return state.Materials.all;
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
                if (e.target.value < 0) e.target.value = 0;
                if (e.target.value > 100) e.target.value = 100;
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
            const taxRate = parseFloat(
                item.invoiceItem.tax.amount.amount / 100
            );
            const amount =
                parseFloat(item.invoiceItem.quantity.value) *
                parseFloat(item.invoiceItem.price.amount) *
                (parseFloat(taxRate) + 1.0);
            if (Number.isInteger(amount) || isFloat(amount)) {
                return amount.toFixed(2);
            }
        }
    }

    return (
        <React.Fragment>
            <ListGroupItem>
                <Row style={{ alignItems: "baseline" }}>
                    <Col xs="3">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="purchaseInvoiceItemMaterial"
                                    value={item.invoiceItem.material?.id || ""}
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidMaterial}
                                    data-testid="purchase-invoice-item-material"
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
                                    data-testid="purchase-invoice-item-description"
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
                                    data-testid="purchase-invoice-item-lot"
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
                                    data-testid="purchase-invoice-item-quantity"
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
                                    data-testid="purchase-invoice-item-price"
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
                                    data-testid="purchase-invoice-item-tax"
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
                    <Col xs="1" className="text-center">
                        <span
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {formatCurrency(formatAmount()) || "-"}
                        </span>
                    </Col>
                    <Col xs="1" className="text-center">
                        <span>
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
