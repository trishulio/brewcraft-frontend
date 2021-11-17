import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroupItem,
    Input,
    FormGroup,
    FormFeedback,
    Form
} from "reactstrap";
import { isFloat } from "../../../helpers/textUtils";
import { isValidName, validAmount, validId, validQuantity } from "../../../helpers/utils";
import {
    setPurchaseInvoiceItems
} from "../../../store/actions";

/**
*
* @param {any} value
* @description repeate row
* @author Anuj Gupta
*
*/

export default function PurchaseInvoiceItem({ indexv, editable }) {

    const dispatch = useDispatch();

    const { items } = useSelector(state => {
        return state.PurchaseInvoice.data;
    });

    const item = useSelector(state => {
        return state.PurchaseInvoice.data.items[indexv];
    });

    const materials = useSelector(state => {
        return state.Ingredients.all.concat(state.Packaging.all);
    });

    function changeevent (e) {
        const itemsNew = [...items];
        switch(e.target.name) {
            case "purchaseInvoiceItemMaterial":
                itemsNew[indexv].material = materials.find(m => m.id === parseInt(e.target.value)) || "";
                itemsNew[indexv].invalidMaterial = !validId(itemsNew[indexv].material?.id);
                break;
            case "purchaseInvoiceItemDescription":
                itemsNew[indexv].description = e.target.value;
                itemsNew[indexv].invalidDescription = !isValidName(e.target.value.trim);
                break;
            case "purchaseInvoiceItemQuantity":
                itemsNew[indexv].quantity.value = e.target.value;
                itemsNew[indexv].invalidQuantity = !validAmount(parseFloat(e.target.value));
                break;
            case "purchaseInvoiceItemPrice":
                itemsNew[indexv].price.amount = e.target.value;
                itemsNew[indexv].invalidPrice = !validAmount(parseFloat(e.target.value));
                break;
            case "purchaseInvoiceItemTax":
                itemsNew[indexv].tax.amount.amount = e.target.value;
                itemsNew[indexv].invalidTax = !validAmount(parseFloat(e.target.value));
                break;
            default:
                return;

        }
        dispatch(setPurchaseInvoiceItems(itemsNew));
    };

    function removeItem () {
        items.splice(indexv, 1);
        dispatch(setPurchaseInvoiceItems(items));
    };

    function formatAmount() {
        if (item.quantity.value && item.price.amount && item.tax.amount.amount) {
            const amount = parseFloat(item.quantity.value)
            * parseFloat(item.price.amount)
            * (parseFloat(item.tax.amount.amount) + 1.0);
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
                        <FormGroup>
                            <Input
                                type="select"
                                name="purchaseInvoiceItemMaterial"
                                value={item.material.id || ""}
                                onChange={changeevent}
                                hidden={!editable}
                                invalid={item.invalidMaterial}
                            >
                                <option value="">Select item</option>
                                {
                                    materials.map((value, index) =>
                                        <option key={index} value={value.id}>
                                            {value.name} ({value.baseQuantityUnit})
                                        </option>
                                    )
                                }
                            </Input>
                            <FormFeedback>{
                                !item.material.id
                                    ? "Required invoice field"
                                    : "Invalid invoice field"
                                }
                            </FormFeedback>
                        </FormGroup>
                        <div hidden={editable}>
                            {item.material.name || "-"}
                        </div>
                    </Col>
                    <Col xs="3">
                        <FormGroup>
                            <Input
                                type="textarea"
                                name="purchaseInvoiceItemDescription"
                                rows="1"
                                value={item.description}
                                onChange={changeevent}
                                hidden={!editable}
                                invalid={items.invalidDescription}
                            />
                            <FormFeedback>Invalid invoice field</FormFeedback>
                        </FormGroup>
                        <div hidden={editable}>
                        {   item.description|| "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        <Input
                            type="text"
                            name="purchaseInvoiceItemLot"
                            // onChange={changeevent}
                            hidden={!editable}
                        />
                        <div hidden={editable}>
                            -
                        </div>
                    </Col>
                    <Col xs="1">
                        <FormGroup>
                            <Input
                                type="text"
                                name="purchaseInvoiceItemQuantity"
                                value={item.quantity.value}
                                onChange={changeevent}
                                hidden={!editable}
                                invalid={item.invalidQuantity}
                            />
                            <FormFeedback>{
                                !item.quantity.value && item.quantity.value !== "0"
                                    ? "Required invoice field"
                                    : "Invalid invoice field"
                                }
                            </FormFeedback>
                        </FormGroup>
                        <div hidden={editable}>
                            {item.quantity.value|| "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        <FormGroup>
                            <Input
                                type="text"
                                name="purchaseInvoiceItemPrice"
                                value={item.price.amount}
                                onChange={changeevent}
                                hidden={!editable}
                                invalid={item.invalidPrice}
                            />
                            <FormFeedback>{
                                !item.price.amount && item.price.amount !== "0"
                                    ? "Required invoice field"
                                    : "Invalid invoice field"
                                }
                            </FormFeedback>
                        </FormGroup>
                        <div hidden={editable}>
                            {item.price.amount || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        <FormGroup>
                            <Input
                                type="text"
                                name="purchaseInvoiceItemTax"
                                value={item.tax.amount.amount}
                                onChange={changeevent}
                                hidden={!editable}
                                invalid={item.invalidTax}
                            />
                            <FormFeedback>{
                                !item.tax.amount.amount && item.tax.amount.amount !== "0"
                                    ? "Required invoice field"
                                    : "Invalid invoice field"
                                }
                            </FormFeedback>
                        </FormGroup>
                        <div hidden={editable}>
                            {item.tax.amount.amount || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        <Input
                            type="text"
                            name="purchaseInvoiceItemAmount"
                            value={
                                formatAmount() || "-"
                            }
                            onChange={changeevent}
                            disabled={true}
                            hidden={!editable}
                        />
                        <div hidden={editable}>
                            {formatAmount() || "-"}
                        </div>
                    </Col>
                    <Col xs="1">
                        <span style={{ lineHeight: "2rem" }} className="align-middle">
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
