import React, { Fragment, useEffect } from "react";
import { setBreadcrumbItems } from "../../../store/actions";
import { useDispatch } from "react-redux";
import Commoninvoice from "./common-invoice";
/**
 * @author Anuj Gupta
 * @description InvoicesDetail access 3 store from redux invoicedata, invoices, purchaseItem, expenseCategory
 *  passing down to InvoicesForm component
 *
 */
/* Dummy Axios call Data */
const dummyInvoice = {
  vendor: "",
  currency: "",
  date: "",
  dueDate: "",
  po_so: "",
  bill: "",
  notes:"",
  item_list: [
    {
      id:1,
      item: "",
      expence_cat: "",
      description: "",
      qty: "",
      price: "",
      tax: "",
      payment_date: "",
    },
  ],
};
export default function Createinvoice() {
  
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Purchases", [
        { title: "Purchases", link: "/Purchases" },
        { title: "vendors", link: "/vendors" },
        { title: `Invoices Create`, link: "/Invoices" },
      ])
     );
     }, []);

  return (
    <Fragment>
        <Commoninvoice type="new" data={dummyInvoice} />
    </Fragment>
  );
}
