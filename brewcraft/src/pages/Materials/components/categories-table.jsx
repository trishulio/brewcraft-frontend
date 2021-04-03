import React, { useCallback } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { map } from "lodash"
import { useHistory } from 'react-router-dom';

export default function MaterialsTable({ data, viewFn }) {
  const history = useHistory();
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
      field: "view"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(data.length && data.filter(item=>item.parentCategoryId!==null), (row) => {
      row.parentCategory=data.find(item=>{
        return item.id===row.parentCategoryId
      }).name

      return {
        ...row,
        view: (
          <MDBBtn color="secondary" size="sm" onClick={() => history.push("/materials/categories/" + row.id)}>View</MDBBtn>
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
