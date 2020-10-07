import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ContextMenu from "./context-menu";
export default function ExpanTable({
  invoicelist,
  send,
  sendReminder,
  recordPayment,
  viewInvoice,
}) {
  const columns = [
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "due",
      text: "Due",
    },
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "number",
      text: "Number",
    },
    {
      dataField: "customer",
      text: "Customer",
    },
    {
      dataField: "amount_due",
      text: "Amount Due",
    },
    {
      dataField: "delivery_date",
      text: "Delivery Date",
    },
    {
      dataField: "payment_date",
      text: "Payment Date",
    },
  ];
  const expandRow = {
    showExpandColumn: true,
    expandColumnPosition: "right",
    renderer: (row) => (
      <ContextMenu
        row={row}
        fnlist={{
          send,
          sendReminder,
          recordPayment,
          viewInvoice,
        }}
      />
    ),
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      return;
    },
    expandColumnRenderer: ({ expanded }) => {
      return expanded ? (
        <i className="ti-arrow-down" />
      ) : (
        <i className="ti-angle-right" />
      );
    },
  };

  return (
    <BootstrapTable
      keyField="id"
      data={invoicelist}
      columns={columns}
      expandRow={expandRow}
    />
  );
}
