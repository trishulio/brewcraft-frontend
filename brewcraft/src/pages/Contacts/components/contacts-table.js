import React, { useCallback } from "react";
import {Button} from '@material-ui/core';
import { map } from "lodash";
import DataTable from '../../../component/Tables/tables-mui-datatable';

export default function ContactsTable({data, editContact, deleteContact, addContact, refreshTable}) {

  const columns = [{
    label: "First Name",
    name: "contactName",
    options: {
      filter: true,
      sort: true
    }
  }, {
    label: "Last Name",
    name: "lastName",
    options: {
      filter: true,
      sort: true
    }
  }, {
    label: "Company",
    name: "companyName",
    options: {
      filter: true,
      sort: true
    }
  }, {
    label: "Position",
    name: "position",
    options: {
      filter: true,
      sort: false,
      display: false
    }
  }, {
    label: "Phone",
    name: "phoneNumber",
    options: {
      filter: false,
      sort: false
    }
  }, {
    label: "Email",
    name: "email",
    options: {
      filter: false,
      sort: false
    }
  }];

  const onDelete=(rowsSelected)=>{
    const idsToDelete = rowsSelected.data.map(d => data[d.dataIndex].id); // array of all ids to to be deleted
    idsToDelete.map((id)=>deleteContact(id));
  }

  const onEdit=(rowsSelected)=>{
    const idToEdit = data[rowsSelected?.data[0].dataIndex].id;
    editContact(idToEdit);
  }

  const rowEvent = useCallback(() => {
    return map(data, (row) => {
      return {
        ...row,
        contactName: row.firstName,
        companyName: row.supplier.name,
        edit: (
          <Button onClick={() => editContact(row.id)}>Edit</Button>
        ),
        delete: (
          <Button onClick={() => deleteContact(row.id)}>Delete</Button>
        )
      };
    });

  }, [data]);

  return(
      <DataTable
        columns={columns}
        data={rowEvent()}
        tableName="Supplier"
        editAction={onEdit}
        deleteAction={onDelete}
        addAction={addContact}
        refreshAction={refreshTable}
      />
  )
}
