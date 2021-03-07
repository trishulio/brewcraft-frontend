import React,{useCallback,useEffect} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialCategories  } from "../../../store/Materials/actions";
export default function MaterialsTable({editFn, data}) {

  const tabledata = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 300,
    },
    {
      label: "Category",
      field: "categoryName",
      sort: "asc"
    },
    {
      label: "Description",
      field: "description",
      sort: "asc"
    },
    {
      label: "Unit",
      field: "baseQuantityUnit",
      sort: "asc"
    },
    {
      label: "Available",
      field: "quantity",
      sort: "asc"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(data, (row) => {

      row.categoryName= row.category.name
      return {
        ...row,
        cName: (
          <span onClick={() => editFn(row.id)} className="btnParent">
              {row.cName}
         </span>
        )
      };
    });
  }, [data]);
  return (
    <MDBDataTable
      responsive
      bordered
      data={{
        columns: tabledata,
        rows: rowEvent(),
      }}
    />
  );
}
