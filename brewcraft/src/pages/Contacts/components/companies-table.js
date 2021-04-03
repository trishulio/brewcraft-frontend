import React, { useCallback } from "react";
import {Button} from '@material-ui/core';
import { map } from "lodash";
import DataTable from '../../../component/Tables/tables-mui-datatable';

export default function CompaniesTable({data, editCompany, deleteCompany, addCompany, refreshTable}) {

  const columns = [{
      label: "Name",
      name: "name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: "Address",
      name: "address",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: "Country",
      name: "country",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: "Province",
      name: "province",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: "City",
      name: "city",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: "Postal Code",
      name: "postalCode",
      options: {
        filter: true,
        sort: true
      }
    }
  ];

  const rowEvent = useCallback(() => {
    return map(data, (row) => {
      const address = row.address || {};
      return {
        ...row,
        address: address.addressLine1 + (address.addressLine2 ? " " + address.addressLine2 : ""),
        country: address.country,
        city: address.city,
        province: address.province,
        postalCode: address.postalCode,
        edit: (
          <Button onClick={() => editCompany(row.id)}>Edit</Button>
        ),
        delete: (
          <Button onClick={() => deleteCompany(row.id)}>Delete</Button>
        )
      };
    });
  }, [data]);

  const onDelete=(rowsSelected)=>{
    const idsToDelete = rowsSelected.data.map(d => data[d.dataIndex].id); // array of all ids to to be deleted
    idsToDelete.map((id)=>deleteCompany(id));
  }

  const onEdit=(rowsSelected)=>{
    const idToEdit = data[rowsSelected?.data[0].dataIndex].id;
    editCompany(idToEdit);
  }

return(
  <DataTable
    columns={columns}
    data={rowEvent()}
    tableName="Company"
    editAction={onEdit}
    deleteAction={onDelete}
    addAction={addCompany}
    refreshAction={refreshTable}
  />
)
}