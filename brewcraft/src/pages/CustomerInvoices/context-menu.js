import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { get, attempt, map } from "lodash";

export default function ContextMenu({ row, fnlist }) {
  const sendB = () => attempt(get(fnlist, "send"), row);
  const sendReminderB = () => attempt(get(fnlist, "sendReminder"), row);
  const recordPaymentB = () => attempt(get(fnlist, "recordPayment"), row);
  const viewInvoiceB = () => attempt(get(fnlist, "viewInvoice"), row);
  const btnList = [
    {
      title: "Send",
      eventFn: sendB,
    },
    // {
    //   title: "Send reminder",
    //   eventFn: sendReminderB,
    // },
    {
      title: "Record payment",
      eventFn: recordPaymentB,
    },
    {
      title: "View invoice",
      eventFn: viewInvoiceB,
    },
  ];

  return (
    <Fragment>
      {map(btnList, (value, index) => (
        <Button
          key={index}
          color="primary"
          className="mr-2"
          onClick={get(value, "eventFn")}
        >
          {get(value, "title")}
        </Button>
      ))}
    </Fragment>
  );
}
