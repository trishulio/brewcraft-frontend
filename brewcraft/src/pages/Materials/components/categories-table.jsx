import React,{useCallback} from "react";
import { MDBDataTable ,MDBBtn} from "mdbreact";
import {map} from "lodash"
export default function MaterialsTable({data, editFn,deleteFn}) {
  const tabledata = [
    {
      label: "Category",
      field: "name",
      sort: "asc",
      width: 300
    },
    {
      label: "Class",
      field: "parentCategory",
      sort: "asc",
      width: 300
    },
    {
      label: "# Materials",
      field: "categoryQuantity",
      sort: "asc",
      width: 50
    },
    {
      field: "edit"
    },
    {
      field: "delete"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(data.length && data.filter(item=>item.parentCategoryId!==null), (row) => {
      row.parentCategory=data.find(item=>{
        return item.id===row.parentCategoryId
      }).name

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
      data={{
        columns: tabledata,
        rows: rowEvent(),
      }}
    />
  );
}
