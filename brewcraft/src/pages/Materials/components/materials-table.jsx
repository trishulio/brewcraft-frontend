import React, { useCallback } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import {map} from "lodash"
import { useHistory } from 'react-router-dom';

export default function MaterialsTable({editFn, data}) {
  const history = useHistory();
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
      field: "view"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(data, (row) => {

      row.categoryName= row.category.name
      return {
        ...row,
        cName: (
          <span>
              {row.cName}
         </span>
        ),
        view: (
          <MDBBtn color="secondary" size="sm" onClick={() => history.push("/materials/" + row.id)}>View</MDBBtn>
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
