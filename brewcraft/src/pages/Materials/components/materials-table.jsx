import React,{useCallback,useEffect} from "react";
import { MDBDataTable , MDBBtn } from "mdbreact";
import {map} from "lodash"
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialCategories  } from "../../../store/Materials/actions";
export default function MaterialsTable({editFn,deleteFn, data}) {

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
    },
    {
      field: "edit"
    },
    {
      field: "delete"
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
        ),
        edit: (
          <MDBBtn color="dark" onClick={() => editFn(row.id)}>Edit</MDBBtn>
        ),
        delete: (
          <MDBBtn color="danger" onClick={() => deleteFn(row.id)}>Delete</MDBBtn>
        )
      };
    });
  }, [data]);
  return (
    <MDBDataTable
      responsive
      bordered
      hover
      data={{
        columns: tabledata,
        rows: rowEvent(),
      }}
    />
  );
}
