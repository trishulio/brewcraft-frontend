import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { findIndex, get } from "lodash";
import { setBreadcrumbItems } from "../../store/actions";
import { NotMinusoneNun } from "../../helpers/textUtils";
import Commoninvoice from "../../component/Invoice/common-invoice";

/* Dummy Axios call Data */
const dummyInvoice = {
  vendor: 25,
  currency: 5,
  date: "2020-10-02T05:48",
  dueDate: "2020-10-02T05:48",
  po_so: "",
  bill: 2512,
  notes:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  item_list: [
    {
      id:2,
      item: 2,
      expence_cat: 12,
      description: "Coming soon!",
      qty: 2,
      price: 12,
      tax: 12,
      payment_date: "3-4-2020",
    },
  ],
};
/**
 * @author Anuj Gupta
 * @description InvoicesDetail access 3 store from redux invoicedata, invoices, purchaseItem, expenseCategory
 *  passing down to InvoicesForm component
 *
 */
export default function InvoicesDetail() {

  let { id } = useParams();

  const dispatch = useDispatch();

  const invoices = useSelector((state) => get(state, "Purchases"));

  const [hasInvoice, setHasInvoice] = useState();

  const [dataInvoice, setDataInvoice] = useState();

  // component did mount alternative for functional component

  useEffect(() => {
    dispatch(
      setBreadcrumbItems(
        "Invoice: " + invoices["invoices"][id].number, [
        { title: "Purchase Invoices", link: "/Purchases" },
        { title: invoices["invoices"][id].vendor, link: "/suppliers" }
      ])
    );

    /*   find invoices from redux store  */
    const invoiceData = findIndex(get(invoices, "invoices"), function (o) {
      return o.id == id;
    });
    setHasInvoice(invoiceData);
    setDataInvoice(dummyInvoice);

  }, []);

  return (
    <Fragment>
      <NotMinusoneNun value={hasInvoice}>
        <Commoninvoice data={dataInvoice} type="edit" />
      </NotMinusoneNun>
    </Fragment>
  );
}
