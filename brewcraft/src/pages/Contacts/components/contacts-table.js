import React, { useCallback } from "react";
import {Button} from '@material-ui/core';
import { map } from "lodash";
import ReactBootstrapTable from '../../../component/Tables/tables-react-boostrap';

export default function ContactsTable({data, editContact, deleteContact, addContact, refreshTable}) {

  const columns = [{
    text: "First Name",
    dataField: "contactName",
    options: {
      filter: true,
      sort: true
    }
  }, {
    text: "Last Name",
    dataField: "lastName",
    options: {
      filter: true,
      sort: true
    }
  }, {
    text: "Company",
    dataField: "companyName",
    options: {
      filter: true,
      sort: true
    }
  }, {
    text: "Position",
    dataField: "position",
    options: {
      filter: true,
      sort: false,
      display: false
    }
  }, {
    text: "Phone",
    dataField: "phoneNumber",
    options: {
      filter: false,
      sort: false
    }
  }, {
    text: "Email",
    dataField: "email",
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
      <ReactBootstrapTable
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
