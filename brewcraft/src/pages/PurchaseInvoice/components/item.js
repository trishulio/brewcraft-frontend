import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroupItem,
    Input
} from "reactstrap";
import { isFloat } from "../../../helpers/textUtils";
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

    const materials = useSelector(state => {
        return state.Ingredients.all.concat(state.Packaging.all);
    });

    const item = useSelector(state => {
        return state.PurchaseInvoice.data.items[indexv];
    });

    function changeevent (e) {
        const itemsNew = [...items];
        switch(e.target.name) {
            case "purchaseInvoiceItemMaterial":
            itemsNew[indexv].material = materials.find(m => m.id === parseInt(e.target.value)) || "";
            break;
            case "purchaseInvoiceItemDescription":
            itemsNew[indexv].description = e.target.value;
            break;
            case "purchaseInvoiceItemQuantity":
            itemsNew[indexv].quantity.value = e.target.value;
            break;
            case "purchaseInvoiceItemPrice":
            itemsNew[indexv].price.amount = e.target.value;
            break;
            case "purchaseInvoiceItemTax":
            itemsNew[indexv].tax.amount.amount = e.target.value;
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
    <Fragment>
      <ListGroupItem>
        <Row>
          <Col xs="3">
            <Input
              type="select"
              name="purchaseInvoiceItemMaterial"
              value={item.material.id || ""}
              onChange={changeevent}
              hidden={!editable}
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
            <div hidden={editable}>
              {item.material.name || "-"}
            </div>
          </Col>
          <Col xs="3">
            <Input
              type="textarea"
              name="purchaseInvoiceItemDescription"
              rows="1"
              value={item.description}
              onChange={changeevent}
              hidden={!editable}
            />
            <div hidden={editable}>
              {item.description|| "-"}
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
            <Input
              type="text"
              name="purchaseInvoiceItemQuantity"
              value={item.quantity.value}
              onChange={changeevent}
              hidden={!editable}
            />
            <div hidden={editable}>
              {item.quantity.value|| "-"}
            </div>
          </Col>
          <Col xs="1">
            <Input
              type="text"
              name="purchaseInvoiceItemPrice"
              value={item.price.amount}
              onChange={changeevent}
              hidden={!editable}
            />
            <div hidden={editable}>
              {item.price.amount || "-"}
            </div>
          </Col>
          <Col xs="1">
            <Input
              type="text"
              name="purchaseInvoiceItemTax"
              value={item.tax.amount.amount}
              onChange={changeevent}
              hidden={!editable}
            />
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
    </Fragment>
  );
}
