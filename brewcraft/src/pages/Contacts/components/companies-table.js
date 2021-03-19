import React, { useState, useCallback } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {IconButton, Tooltip,Button,TextField} from '@material-ui/core';
import {Add, Edit,Delete, Refresh} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";
import { map } from "lodash";

export default function CompaniesTable({data, editCompany, deleteCompany,addCompany,refreshTable}) {

  const[searchText,setSearchText]=useState("");

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

const deleteButtonOnClick=(rowsDeleted)=>{
    const idsToDelete = rowsDeleted.data.map(d => data[d.dataIndex].id); // array of all ids to to be deleted
    idsToDelete.map((id)=>deleteCompany(id));
  }

  const editButtonOnClick=(rowsSelected)=>{
    const idToEdit = data[rowsSelected?.data[0].dataIndex].id;
    editCompany(idToEdit);
  }

  const refreshButtonOnClick=()=>{
   setSearchText("");
   refreshTable();
  }

  const customToolbarButton = () => (
    <>
      <Tooltip disableFocusListener title="Add Company">
        <IconButton onClick={() =>addCompany()}>
          <Add  />
      </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Refresh">
        <IconButton onClick={() =>refreshButtonOnClick()}>
          <Refresh  />
        </IconButton>
      </Tooltip>
      <TextField
          id="companies-search"
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
  { isShowEditButton && <Tooltip disableFocusListener title="Edit Company">
      <IconButton onClick={() =>editButtonOnClick(rowsSelected)}>
        <Edit  />
      </IconButton>
    </Tooltip>}
        <Tooltip disableFocusListener title="Delete Company">
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