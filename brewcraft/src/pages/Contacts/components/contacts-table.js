import React, { useState, useCallback } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable, { TableFilterList, TableToolbarSelect } from "mui-datatables";
import Chip from '@material-ui/core/Chip';
import { map } from "lodash";

export default function ContactsTable({data, editCompany, editContact, deleteContact}) {
  const columns = [{
    name: "First Name",
    options: {
      filter: true,
      sort: true
    }
  }, {
    name: "Last Name",
    options: {
      filter: true,
      sort: true
    }
  }, {
    name: "Company",
    options: {
      filter: true,
      sort: true
    }
  }, {
    name: "Position",
    options: {
      filter: true,
      sort: false,
      display: false
    }
  }, {
    name: "Phone",
    options: {
      filter: false,
      sort: false
    }
  }, {
    name: "Email",
    options: {
      filter: false,
      sort: false
    }
  }];
  const rowEvent = useCallback(() => {
    return map(data, (row) => {
      return [
        row.firstName,
        row.lastName,
        row.supplier.name,
        row.position,
        row.phoneNumber,
        row.email
      ];
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
      }
    });
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
          // tableBodyHeight: "400px"
        }}
      />
    </MuiThemeProvider>
  )
}
