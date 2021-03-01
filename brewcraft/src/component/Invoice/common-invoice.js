import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InvoicesForm from "./invoice-form";
import { get } from "lodash";
import { AvForm } from "availity-reactstrap-validation";
import { ItemExpenseProvider } from "./item-expense-context";
import { Modal } from "../Common/Modal";
import { Button } from "reactstrap";
import {deleteInvoice, saveInvoice, editInvoice} from '../../store/Invoice/actions'
import {useHistory} from 'react-router-dom';
/**
 * @author Anuj Gupta
 * @description InvoicesDetail access 3 store from redux invoicedata, invoices, purchaseItem, expenseCategory
 *  passing down to InvoicesForm component
 *
 */
export default function Commoninvoice({ data, type }) {
  const [invoiceData, setInvoiceData] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteshow, setDeleteshow] = useState(false);

  const { purchaseItem, dxpenseCategory, vendors, currency } = useSelector((state) => {
    return {
      purchaseItem: get(state, "PurchaseItem"),
      dxpenseCategory: get(state, "ExpenseCategory"),
      vendors: get(state, "Vendor"),
      currency: get(state, "Currency"),
    };
  });
  useEffect(() => {
    setInvoiceData(data);
  }, []);

  const InvoiceRow = {
    id: Math.random(),
    item: "",
    expence_cat: "",
    description: "",
    qty: "",
    price: "",
    tax: "",
    payment_date: "",
  };

  // component did mount alternative for functional component
  /**
   * Form Submit
   */
  const handleValidSubmit = (event, values) => {
      if(type === "edit"){
        dispatch(editInvoice({data:invoiceData,callback:dialogCLoseS}));
    }else{
        dispatch(saveInvoice({data:invoiceData,callback:dialogCLoseS}));
    }

  };

  /**
   *@description delete dialog with dispatch
   */
  const removeThisBill = () => setDeleteshow(true);
  const deleteDispatch = () => dispatch(deleteInvoice({data:invoiceData,callback:dialogCLoseS}));
  const dialogCLoseS = () =>{
    setDeleteshow(false);
    history.goBack();

  }
  /**
   * @description Add Item rows on the form
   */
  const addItemrow = () => {
    const invoiceD = { ...invoiceData };
    let items = [...invoiceD.item_list];
    items.push(InvoiceRow);
    setInvoiceData({ ...invoiceD, item_list: items });
  };
  /**
   * @description Row Item change event FN
   */
  const changeInput = ({ index, key, value }) => {
    const invoiceD = { ...invoiceData };
    let items = [...invoiceD.item_list];
    items[index][key] = value;
    setInvoiceData({ ...invoiceD, item_list: [...items] });
  };
  /**
   *
   * @param {number} index array index number
   *
   */
  const deletRow = (index) => {
    const invoiceD = { ...invoiceData };
    let items = [...invoiceD.item_list];
    items.splice(index, 1);
    setInvoiceData({ ...invoiceD, item_list: [...items] });
  };

  /**
   * Context Props
   */
  const select = {
    purchase: get(purchaseItem, "data"),
    dxpenseCategory: get(dxpenseCategory, "data"),
    vendors:get(vendors,'data'),
    currency:get(currency, 'data'),
    inpuval: changeInput,
    add: addItemrow,
    del: deletRow,
  };

  return (
    <Fragment>
      <AvForm onValidSubmit={handleValidSubmit}>
        <ItemExpenseProvider value={select}>
          <InvoicesForm
            detail={invoiceData}
            removebill={removeThisBill}
            type={type}
          />
        </ItemExpenseProvider>
      </AvForm>
      {deleteshow && (
        <Modal
          show={deleteshow}
          handlerClose={setDeleteshow}
          title="Delete Bill"
          size="sm"
        >
          <Button
            type="button"
            outline
            color="danger"
            className="waves-effect waves-light"
            onClick={deleteDispatch}
          >
            are you sure to delete?
          </Button>
        </Modal>
      )}
    </Fragment>
  );
}
