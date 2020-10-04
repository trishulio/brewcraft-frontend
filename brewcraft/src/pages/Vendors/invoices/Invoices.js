import React from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../../store/actions";
import InvoicesTable from "./InvoicesTable";

const Invoices = () => {
  const dispatch = useDispatch();
  const breadcrumbItems = [
    { title: "Purchases", link: "/purchase" },
    { title: "Invoices", link: "#" },
  ];

  React.useEffect(() => {
    dispatch(setBreadcrumbItems("Invoices", breadcrumbItems));
  }, [dispatch]);

  return (
      <InvoicesTable />
  );
};

export default Invoices;
