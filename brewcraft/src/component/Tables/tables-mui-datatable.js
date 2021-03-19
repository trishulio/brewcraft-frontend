import React, { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {IconButton, Tooltip, TextField} from '@material-ui/core';
import {Add, Edit, Delete, Refresh} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";

export default function DataTable(props) {

  const[searchText,setSearchText]=useState("");

  const {
    tableName,
    columns,
    data,
    editAction,
    deleteAction,
    addAction,
    refreshAction
  }=props;

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
            "& > span, & > button, & input": {
              order: 0
            },
            // // target the custom toolbar icon
            "& > span:last-child, & > button:last-child": {
              order: 99
            },
            // // target any icon
            "& > button:nth-child(5), & > button:nth-child(5)": {
              order: -1
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
          },
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
            padding:8
          }
        },
        MuiInputBase: {
          input: {
            height:'1.3em',
            fontSize: '0.71094rem',
          },
        }
      },
      typography: {
        "fontFamily": 'Poppins',
      },
    }
    );
  };

  const refreshButtonOnClick=()=>{
   setSearchText("");
   refreshAction();
  }

  const customToolbarButton = () => (
    <>
      <Tooltip disableFocusListener title={`Add ${tableName}`}>
        <IconButton onClick={() =>addAction()}>
          <Add  />
      </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Refresh">
        <IconButton onClick={() =>refreshButtonOnClick()}>
          <Refresh  />
        </IconButton>
      </Tooltip>
      <TextField
          id="datatable-search"
          placeholder="Search"
          type="search"
          variant="outlined"
          onChange={(e)=>setSearchText(e.target.value)}
        value={searchText}/>
      </>
  );

  const customToolbarSelectButton = (rowsSelected) => {
    const isShowEditButton=rowsSelected?.data?.length>1 ? false: true;

  return(
    <div>
  { isShowEditButton && <Tooltip disableFocusListener title={`Edit ${tableName}`}>
      <IconButton onClick={() =>editAction(rowsSelected)}>
        <Edit  />
      </IconButton>
    </Tooltip>}
        <Tooltip disableFocusListener title={`Delete ${tableName}`}>
        <IconButton onClick={() =>deleteAction(rowsSelected)}>
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
        data={data}
        options={{
          filter: true,
          filterType: "checkbox",
          search: false,
          searchText,
          customToolbar:customToolbarButton,
          customToolbarSelect:customToolbarSelectButton
        }}
      />
    </MuiThemeProvider>
  )
}