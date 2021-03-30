import React from "react";
import { createMuiTheme, MuiThemeProvider ,withStyles} from "@material-ui/core/styles";
import {IconButton, Tooltip} from '@material-ui/core';
import {Add, Edit, Delete, Refresh} from '@material-ui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

 function ReactBootstrapTable(props) {

  const { SearchBar } = Search;

  const {
    classes,
    tableName,
    columns,
    data,
    editAction,
    deleteAction,
    addAction,
    refreshAction
  }=props;

  const customToolbarButton = (tableProps) => (
    <div className={classes.toolbar}>
      <Tooltip disableFocusListener title={`Add ${tableName}`}>
        <IconButton onClick={() =>addAction()}>
          <Add  />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Refresh">
        <IconButton onClick={() =>refreshAction()}>
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
    </div>
  );

  const customTotal = (from, to, size) => (
    <span className={classes.customTotal}>
      Showing { from } to { to } of { size } entries
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Previous',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: data.length
    }]
  };

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  // onselect: (row, isSelect, rowIndex, e) => {

  // }
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

const styles = () => ({
  toolbar:{
    textAlign:'right',
    padding:'10px',
  },
  customTotal:{
    padding: '10px'
  }
});

const theme = () => {
  return createMuiTheme({
    overrides: {
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
    },
    typography: {
      "fontFamily": 'Poppins',
    },
  }
  );
};

export default withStyles(styles)(ReactBootstrapTable);


