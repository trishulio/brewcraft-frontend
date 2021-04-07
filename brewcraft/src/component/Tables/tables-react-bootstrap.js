import React, { useState } from "react";
import { createMuiTheme, MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip, Select, MenuItem, FormControl, Menu, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Add, Edit, Delete, Refresh, ViewColumn } from '@material-ui/icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

function ReactBootstrapTable(props) {

  const [selectedRows, setSelectedRows] = useState({});
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);
  const [colToggles, setColToggles] = useState(null);
  const handleViewColumnClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const handleViewColumnClose = () => {
    setColumnAnchorEl(null);
  };

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
  } = props;

  const editButtonOnClick = async (checkedRows) => {
    await editAction(checkedRows);
    setSelectedRows({});
  }

  const deleteButtonOnClick = async (checkedRows) => {
    await deleteAction(checkedRows);
    setSelectedRows({});
  }

  const CustomToggleList = ({
    columns,
    onColumnToggle,
    toggles
  }) => {
    const onCheckBoxChange = (dataField) => {
      onColumnToggle(dataField);
      if(colToggles){
        setColToggles({ ...colToggles, [dataField]:!colToggles[dataField]});
      }else{
        setColToggles({ ...toggles, [dataField]:!toggles[dataField]});
      }
    }
    console.log(colToggles);
    return (
      <Menu
        anchorEl={columnAnchorEl}
        keepMounted
        open={Boolean(columnAnchorEl)}
        onClose={handleViewColumnClose}
      >
        <FormGroup>
          {columns
            .map(column => ({
              ...column,
              toggle: colToggles ? colToggles[column.dataField] : toggles[column.dataField]
            }))
            .map(column => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={column.toggle ? true : false}
                    key={column.dataField}
                    onChange={() => onCheckBoxChange(column.dataField)}
                  />}
                label={column.text}
              />
            ))
          }
        </FormGroup>
      </Menu>
    );
  }


  const customToolbarButton = (tableProps) => {
    const checkedRows = Object.keys(selectedRows).filter((s) => selectedRows[s]);

    const isDeleteButtonEnable = checkedRows?.length > 0 || false;
    const isEditButtonEnable = checkedRows?.length === 1 || false;
    return (
      <div className={classes.toolbar}>
        <Tooltip disableFocusListener title={`Add ${tableName}`}>
          <IconButton onClick={() => addAction()}>
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title="Refresh">
          <IconButton onClick={() => refreshAction()}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title={`Edit ${tableName}`}>
          <IconButton disabled={!isEditButtonEnable} onClick={() => editButtonOnClick(checkedRows)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title={`Delete ${tableName}`}>
          <IconButton disabled={!isDeleteButtonEnable} onClick={() => deleteButtonOnClick(checkedRows)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title={`View column`}>
          <IconButton onClick={(e) => handleViewColumnClick(e)}>
            <ViewColumn />
          </IconButton>
        </Tooltip>
        {CustomToggleList(tableProps.columnToggleProps)}
        <SearchBar {...tableProps.searchProps} />
      </div>
    );
  }

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
  }) => {
    return (<FormControl variant="outlined" >
      <Select
        id="sizePerPage"
        onChange={(e) => onSizePerPageChange(e.target.value)}
        value={currSizePerPage}
      >
        {options.map((option) => (
          <MenuItem value={option.page}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    )
  }
  const customTotal = (from, to, size) => (
    <span className={classes.customTotal}>
      Showing { from} to { to} of { size} entries
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: false, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    prePageText: 'Previous',
    nextPageText: 'Next',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageRenderer,
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
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedRows({ ...selectedRows, [rowIndex]: isSelect })
    },
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        let rowIndexes = {};
        rows?.map((i, index) => (
          rowIndexes = { ...rowIndexes, [index]: isSelect }
        ));
        setSelectedRows(rowIndexes);
      } else {
        setSelectedRows({})
      }
    }

  };
  return (
    <MuiThemeProvider theme={theme()}>
      <ToolkitProvider
        keyField="id"
        data={data}
        columns={columns}
        columnToggle
        search>
        {
          tableProps => (
            <div>
              {customToolbarButton(tableProps)}
              <BootstrapTable
                {...tableProps.baseProps}
                selectRow={selectRow}
                pagination={paginationFactory(options)}
              />
            </div>
          )
        }
      </ToolkitProvider>
    </MuiThemeProvider>
  )
}

const styles = () => ({
  toolbar: {
    textAlign: 'right',
    padding: '10px',
  },
  customTotal: {
    padding: '10px'
  },
});

const theme = () => {
  return createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          '&:hover': {
            color: "#7a6fbe"
          },
          borderRadius: '0%'
        }
      },
      MuiCheckbox: {
        root: {
          "&$checked$checked": {
            color: "#7a6fbe"
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
        },
        input: {
          padding: "7.5px ​14px"
        }
      },
      MuiSelect: {
        outlined: {
          paddingLeft: 10
        }
      },
      MuiFormControlLabel: {
        root: {
          marginLeft: 0
        }
      }
    },
    typography: {
      "fontFamily": 'Poppins',
    },
  }
  );
};

export default withStyles(styles)(ReactBootstrapTable);


