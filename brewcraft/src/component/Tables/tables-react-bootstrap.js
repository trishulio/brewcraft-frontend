import React, { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {IconButton, Tooltip, TextField} from '@material-ui/core';
import {Add, Edit, Delete, Refresh} from '@material-ui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export default function ReactBootstrapTable(props) {

  const { SearchBar } = Search;

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
   refreshAction();
  }

  const customToolbarButton = (tableProps) => (
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
      <Tooltip disableFocusListener title={`Edit ${tableName}`}>
       <IconButton onClick={() =>editAction()}>
         <Edit  />
       </IconButton>
     </Tooltip>
         <Tooltip disableFocusListener title={`Delete ${tableName}`}>
         <IconButton onClick={() =>deleteAction()}>
           <Delete  />
       </IconButton>
       </Tooltip>
      <SearchBar { ...tableProps.searchProps } />
      </>
  );

const options = {
  onSizePerPageChange: (sizePerPage, page) => {
    console.log('Size per page change!!!');
    console.log('Newest size per page:' + sizePerPage);
    console.log('Newest page:' + page);
  },
  onPageChange: (page, sizePerPage) => {
    console.log('Page change!!!');
    console.log('Newest size per page:' + sizePerPage);
    console.log('Newest page:' + page);
  }
};

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

  return(
    <MuiThemeProvider theme={theme()}>
      <ToolkitProvider
        keyField="id"
        data={ data }
        columns={ columns }
        search>
        {
          tableProps => (
            <div>
              {customToolbarButton(tableProps)}
              <BootstrapTable
                { ...tableProps.baseProps }
                selectRow={ selectRow }
                pagination={ paginationFactory(options) }
              />
            </div>
            )
        }
      </ToolkitProvider>
    </MuiThemeProvider>
  )
}


