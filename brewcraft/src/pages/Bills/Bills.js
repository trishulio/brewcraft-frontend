import React from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import DatatableTables from "./BillsTable";

const Bills = () => {
  const dispatch = useDispatch();
  const breadcrumbItems = [
    { title: "Purchases", link: "/purchase" },
    { title: "Bills", link: "#" },
  ];

  React.useEffect(() => {
    dispatch(setBreadcrumbItems("Bills", breadcrumbItems));
  }, [dispatch]);

  return (
      <DatatableTables />
  );
};

export default Bills;
