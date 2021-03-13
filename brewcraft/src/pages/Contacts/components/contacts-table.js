import React, { useState, useCallback } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {IconButton, Tooltip,Typography,Button,TextField} from '@material-ui/core';
import {Add, Edit,Delete, Refresh} from '@material-ui/icons';
import MUIDataTable, { TableFilterList, TableToolbarSelect, } from "mui-datatables";
import Chip from '@material-ui/core/Chip';
import { map } from "lodash";

export default function ContactsTable({data, editCompany, editContact, deleteContact, addContact,refreshTable}) {

  const[searchText,setSearchText]=useState("");

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
          root: {
            minHeight:'40px'
          },
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
        MUIDataTableFooter:{
          root:{
            marginTop:'25px'
          }
        },
        MuiTableRow: {
          root: {
              "&:last-child td": {
                  borderBottom: 0,
              },
          }
        },
        MuiIconButton: {
          root: {
            '&:hover': {
              color: "#7a6fbe"
          },
          borderRadius:'0%'
          }
        },
        MuiCheckbox: {
          root: {
            "&$checked$checked": {
                color:"#7a6fbe"
            }
          }
        },
        MuiOutlinedInput: {
          root: {
            "&:hover $notchedOutline": {
              borderColor: "#7a6fbe"
            },
            "&$focused $notchedOutline": {
              borderColor: "#7a6fbe"
            },
            "&&& $input": {
              padding: "6px"
            }
          }
        },
        MuiFormControl:{
          root:{
            padding:12
          }
        }

      },
      typography: {
        "fontFamily": 'Poppins',
      },
    }
    );
  };

  const deleteButtonOnClick=(rowsDeleted)=>{
    const idsToDelete = rowsDeleted.data.map(d => data[d.dataIndex].id); // array of all ids to to be deleted
    idsToDelete.map((id)=>deleteContact(id));
  }

  const editButtonOnClick=(rowsSelected)=>{
    const idToEdit = data[rowsSelected?.data[0].dataIndex].id;
    editContact(idToEdit);
  }

  const refreshButtonOnClick=()=>{
   setSearchText("");
   refreshTable();
  }

  const customToolbarButton = () => (
    <div>
      <TextField id="contacts-search" placeholder="Search" type="search" variant="outlined" onChange={(e)=>setSearchText(e.target.value)} value={searchText}/>
      <Tooltip disableFocusListener title="Add Contact">
        <IconButton onClick={() =>addContact()}>
          <Add  />
        </IconButton>
      </Tooltip>
          <Tooltip disableFocusListener title="Refresh">
          <IconButton onClick={() =>refreshButtonOnClick()}>
            <Refresh  />
          </IconButton>
        </Tooltip>
      </div>
  );

  const customToolbarSelectButton = (rowsSelected) => {
    const isShowEditButton=rowsSelected?.data?.length>1 ? false: true;

  return(
    <div>
  { isShowEditButton && <Tooltip disableFocusListener title="Edit Contact">
      <IconButton onClick={() =>editButtonOnClick(rowsSelected)}>
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
          search: false,
          searchText,
          customToolbar:customToolbarButton,
          customToolbarSelect:customToolbarSelectButton
          // tableBodyHeight: "400px"
        }}
      />
    </MuiThemeProvider>
  )
}
