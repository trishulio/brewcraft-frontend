import React, { useEffect, useState } from "react";
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
    const [hstEnabled, setHstEnabled] = useState(true);
    const [pstGstEnabled, setPstGstEnabled] = useState(true);

    const dispatch = useDispatch();

    const { procurementItems: items } = useSelector((state) => {
        return state.Procurement.data;
    });

    const item = useSelector((state) => {
        return state.Procurement.data.procurementItems[indexv];
    });

    const pstRate = useSelector((state) => {
        return state.Procurement.data.procurementItems[indexv].invoiceItem.tax.pstRate?.value;
    });

    const gstRate = useSelector((state) => {
        return state.Procurement.data.procurementItems[indexv].invoiceItem.tax.gstRate?.value;
    });

    const hstRate = useSelector((state) => {
        return state.Procurement.data.procurementItems[indexv].invoiceItem.tax.hstRate?.value;
    });

    const materials = useSelector((state) => {
        return state.Materials.all;
    });

    useEffect(() => {
        setHstEnabled(
            parseFloat(pstRate || 0) <= 0 && parseFloat(gstRate || 0) <= 0
        );
        setPstGstEnabled(
            parseFloat(hstRate || 0) <= 0
        );
    }, [
        pstRate,
        gstRate,
        hstRate,
    ]);

    function changeevent(e) {
        const itemsNew = JSON.parse(JSON.stringify(items));
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
            case "purchaseInvoiceItemPstTax":
                if (e.target.value < 0 || e.target.value === "")
                    e.target.value = 0;
                if (e.target.value > 100) e.target.value = 100;
                itemsNew[indexv].invoiceItem.tax.pstRate.value =
                    e.target.value / 100;
                let validPstTax =
                    e.target.value && validAmount(parseFloat(e.target.value));
                if (validPstTax) {
                    itemsNew[indexv].invoiceItem.invalidPstTax = false;
                    itemsNew[indexv].invoiceItem.invalidGstTax = false;
                    itemsNew[indexv].invoiceItem.invalidHstTax = false;
                }
                break;
            case "purchaseInvoiceItemGstTax":
                if (e.target.value < 0 || e.target.value === "")
                    e.target.value = 0;
                if (e.target.value > 100) e.target.value = 100;
                itemsNew[indexv].invoiceItem.tax.gstRate.value =
                    e.target.value / 100;
                let validGstTax =
                    e.target.value && validAmount(parseFloat(e.target.value));
                if (validGstTax) {
                    itemsNew[indexv].invoiceItem.invalidPstTax = false;
                    itemsNew[indexv].invoiceItem.invalidGstTax = false;
                    itemsNew[indexv].invoiceItem.invalidHstTax = false;
                }
                break;
            case "purchaseInvoiceItemHstTax":
                if (e.target.value < 0 || e.target.value === "")
                    e.target.value = 0;
                if (e.target.value > 100) e.target.value = 100;
                itemsNew[indexv].invoiceItem.tax.hstRate.value =
                    e.target.value / 100;
                let validHstTax =
                    e.target.value && validAmount(parseFloat(e.target.value));
                if (validHstTax) {
                    itemsNew[indexv].invoiceItem.invalidPstTax = false;
                    itemsNew[indexv].invoiceItem.invalidGstTax = false;
                    itemsNew[indexv].invoiceItem.invalidHstTax = false;
                }
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
            (pstRate || gstRate || hstRate)
        ) {
            const taxRate = (parseFloat(pstRate) || 0) + (parseFloat(gstRate) || 0) + (parseFloat(hstRate) || 0);
            const amount =
                parseFloat(item.invoiceItem.quantity.value) *
                parseFloat(item.invoiceItem.price.amount) *
                (taxRate + 1.0);
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
                    <Col xs="2">
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
                                    item.invoiceItem.quantity.value !== 0
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
                                    item.invoiceItem.price.amount !== 0
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
                                    name="purchaseInvoiceItemPstTax"
                                    style={
                                        !pstGstEnabled
                                            ? { backgroundColor: "lightGrey" }
                                            : null
                                    }
                                    disabled={!pstGstEnabled}
                                    value={
                                        parseFloat(
                                            (
                                                pstRate * 100
                                            ).toFixed(2)
                                        ) || ""
                                    }
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidPstTax}
                                    data-testid="purchase-invoice-item-pst-tax"
                                />
                                <FormFeedback>
                                    {!pstRate
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {parseFloat(
                                (
                                    pstRate * 100
                                ).toFixed(2)
                            ) || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="purchaseInvoiceItemGstTax"
                                    style={
                                        !pstGstEnabled
                                            ? { backgroundColor: "lightGrey" }
                                            : null
                                    }
                                    disabled={!pstGstEnabled}
                                    value={
                                        parseFloat(
                                            (
                                                gstRate * 100
                                            ).toFixed(2)
                                        ) || ""
                                    }
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidGstTax}
                                    data-testid="purchase-invoice-item-gst-tax"
                                />
                                <FormFeedback>
                                    {!gstRate
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {parseFloat(
                                (
                                     gstRate * 100
                                ).toFixed(2)
                            ) || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        {editable && (
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="purchaseInvoiceItemHstTax"
                                    style={
                                        !hstEnabled
                                            ? { backgroundColor: "lightGrey" }
                                            : null
                                    }
                                    disabled={!hstEnabled}
                                    value={
                                        parseFloat(
                                            (
                                                hstRate * 100
                                            ).toFixed(2)
                                        ) || ""
                                    }
                                    onChange={changeevent}
                                    invalid={item.invoiceItem.invalidHstTax}
                                    data-testid="purchase-invoice-item-hst-tax"
                                />
                                <FormFeedback>
                                    {!hstRate
                                        ? "Required invoice field"
                                        : "Invalid invoice field"}
                                </FormFeedback>
                            </FormGroup>
                        )}
                        <div hidden={editable}>
                            {parseFloat(
                                (
                                    hstRate * 100
                                ).toFixed(2)
                            ) || "-"}
                        </div>
                    </Col>
                    <Col xs="1" className="text-center">
                        <Row
                            style={{
                                alignItems: "baseline",
                                flexWrap: "nowrap",
                            }}
                        >
                            <Col xs="9">
                                <span
                                    style={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {formatCurrency(formatAmount()) || "-"}
                                </span>
                            </Col>
                            <Col xs="3">
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
                    </Col>
                </Row>
            </ListGroupItem>
        </React.Fragment>
    );
}
