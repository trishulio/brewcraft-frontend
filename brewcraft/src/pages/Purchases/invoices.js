import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import InvoicesTable from "../../component/Invoice/invoices-table";

const Invoices = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbItems(
        "Invoices",
        { title: "Purchases", link: "/purchase" },
        { title: "Invoices", link: "#" })
    );
  });

  return (
      <InvoicesTable />
  );
};

export default Invoices;
