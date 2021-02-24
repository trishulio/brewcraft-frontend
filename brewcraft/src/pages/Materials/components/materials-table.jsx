import React,{useCallback,useEffect} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialCategories  } from "../../../store/Materials/actions";
export default function MaterialsTable({categories,editFn,data}) {

  const tabledata = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 300,
    },
    {
      label: "Category",
      field: "category",
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
      row.category= categories.data.find(item=>{
        return item.id===row.parentCategoryId
      }).name
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
