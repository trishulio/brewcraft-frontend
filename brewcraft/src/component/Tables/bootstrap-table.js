import React, { useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { ColToggle, TableSearch } from "./col-toggle";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Button } from "reactstrap";
import propTypes from "prop-types";
const BootstrapTablec = ({
  column,
  data,
  tableName,
  addOnClick,
  editOnClick,
  deletOnClick,
}) => {

  const [selectRows, setSelectRows] = useState([]);

  useEffect(() => {
    setSelectRows([]);
  }, [data]);

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      const current = [...selectRows];
      current.push(row.id);
      setSelectRows(current);
    } else {
      const current = selectRows.filter((rowValue) => rowValue != row.id);
      setSelectRows(current);
    }
  };
  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.id);
    if (isSelect) {
      setSelectRows(ids);
    } else {
      setSelectRows([]);
    }
  };
  const selectd = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selectRows,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };
  const deletOnClickL = () => deletOnClick(selectRows);
  const editOnClickL = () => editOnClick(selectRows);

  return (
    <>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={column}
      columnToggle
      search
      bootstrap4
    >
      {(props) => (
        <div>
          <div className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-0 mt-2 pr-0 pt-1">
            <div>
              {editOnClick && (
                <Button
                  disabled={selectRows.length == 0 || selectRows.length > 1}
                  onClick={editOnClickL}
                  color="primary"
                  className="mr-2"
                  size="sm"
                >
                  {`Edit ${tableName}`}
                </Button>
              )}
              {deletOnClick && (
                <Button
                  disabled={selectRows.length == 0 || selectRows.length > 1}
                  onClick={deletOnClickL}
                  color="primary"
                  className="mr-2"
                  size="sm"
                >
                  {`Delete ${tableName}`}
                </Button>
              )}
              
            </div>
            <div>
              <div>
                <ColToggle {...props.columnToggleProps} />
                <TableSearch {...props.searchProps}  />
              </div>
            </div>
          </div>
          <BootstrapTable
            {...props.baseProps}
            pagination={paginationFactory()}
            selectRow={selectd}
            filter={filterFactory()}
            classes="remove_border"
          />
        </div>
      )}
    </ToolkitProvider>
    </>
  );
};

BootstrapTablec.propTypes = {
  column: propTypes.arrayOf(propTypes.object).isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
  tableName: propTypes.string.isRequired,
  editOnClick: propTypes.func,
  deletOnClick: propTypes.func,
};
export default React.memo(BootstrapTablec);
