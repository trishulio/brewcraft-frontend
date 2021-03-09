import React, { useState, useCallback } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {IconButton, Tooltip,Typography,Button} from '@material-ui/core';
import {AddCircle, Edit,Delete} from '@material-ui/icons';
import MUIDataTable, { TableFilterList, TableToolbarSelect } from "mui-datatables";
import Chip from '@material-ui/core/Chip';
import { map } from "lodash";

export default function ContactsTable({data, editCompany, editContact, deleteContact, addContact}) {
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

  const theme = () => {
    return createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none"
          },
        },
        MUIDataTableToolbar: {
          actions: {
            display: "flex",
            flex: "initial",
            // move all icons to the right
            "& > span, & > button": {
              order: 99
            },
            // target the custom toolbar icon
            "& > span:last-child, & > button:last-child": {
              order: 1
            },
            // target any icon
            "& > span:nth-child(1), & > button:nth-child(1)": {
              order: 2
            }
          },
          icon: {
            '&:hover': {
                 color: "#7a6fbe"
             }
         },
        },
      MuiIconButton: {
        root: {
          '&:hover': {
            color: "#7a6fbe"
        }
        }
      },
      MuiCheckbox: {
        root: {
          "&$checked$checked": {
              color:"#7a6fbe"
          }
        }
      }
      }
    });
  };

  const deleteButtonOnClick=(rowsDeleted)=>{
    const idsToDelete = rowsDeleted.data.map(d => data[d.dataIndex].id); // array of all ids to to be deleted
    idsToDelete.map((id)=>deleteContact(id));
  }

  const addContactButton = () => (
    <Tooltip disableFocusListener title="Add Contact">
      <IconButton onClick={() =>addContact()}>
        <AddCircle  />
      </IconButton>
    </Tooltip>
  );

  const customToolbarSelectButton = (rowsSelected) => {
    const isShowEditButton=rowsSelected?.data?.length>1 ? false: true;
    let supplierId='';

    if(isShowEditButton && rowsSelected?.data?.length===1 ){
      supplierId=  rowsSelected.data[0].dataIndex ;
    }

  return(
    <div>
  { isShowEditButton && <Tooltip disableFocusListener title="Edit Contact">
      <IconButton onClick={() =>editContact(supplierId)}>
        <Edit  />
      </IconButton>
    </Tooltip>}
        <Tooltip disableFocusListener title="Delete Contact">
        <IconButton onClick={() =>deleteButtonOnClick(rowsSelected)}>
          <Delete  />
        </IconButton>
      </Tooltip>
      </div>
  );
}

  return(
    <MuiThemeProvider theme={theme()}>
      <MUIDataTable
        columns={columns}
        data={rowEvent()}
        options={{
          filter: true,
          filterType: "checkbox",
          search: true,
          customToolbar:addContactButton,
          customToolbarSelect:customToolbarSelectButton
          // tableBodyHeight: "400px"
        }}
      />
    </MuiThemeProvider>
  )
}
