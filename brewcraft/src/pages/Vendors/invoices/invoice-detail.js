import React, { Fragment, useEffect, useState } from "react";
import { setBreadcrumbItems } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import InvoicesForm from "./invoice-form";
import { findIndex, get } from "lodash";
import { AvForm} from "availity-reactstrap-validation";
import {ItemExpenseProvider}   from './item-expense-context';
/* Dummy Axios call Data */
const dummyInvoice = {
    vendor:25,
    currency:5,
    date:"2020-10-02T05:48",
    dueDate:"2020-10-02T05:48",
    po_so:'',
    bill:2512,
    notes:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    item_list:[
        {
            item:12,
            expence_cat:12,
            description:"Coming soon!",
            qty:2,
            price:12,
            tax:12,
            payment_date:'3-4-2020'
            
        }
    ]
}
export default function InvoicesDetail() {
  // dispatch action
  let { id } = useParams();
  const [isInvoice, setIsInvoice] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => get(state, "Purchases"));

  // component did mount alternative for functional component
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Purchases", [
        { title: "Purchases", link: "/Purchases" },
        { title: "vendors", link: "/vendors" },
        { title: `Invoices ${id}`, link: "/Invoices" },
      ])
    );

    /*   find invoices from redux store  */
    const invoice = findIndex(invoices, function (o) {
      return o.id == id;
    });

    /*   ajax request send to fetch  */
    if(invoice !== -1){
        setInvoiceData(dummyInvoice)
    }

    /*   ajax request send to fetch end */
    setIsInvoice(invoice);
    
    /*   set form data  */
  }, []);

 /**
 * Form Submit 
 */
const handleValidSubmit = (event, values) =>{
  console.log(values);
}
/**
 * Form Submit end 
 */

  return (
    <Fragment>
      {isInvoice == -1 ? (
        <div>not found</div>
      ) : (
        invoiceData && <AvForm onValidSubmit={handleValidSubmit}>
          <ItemExpenseProvider values={[{first:"wroking"}]}>
            <InvoicesForm detail={invoiceData}/>
          </ItemExpenseProvider>
          </AvForm>
      )}
    </Fragment>
  );
}
