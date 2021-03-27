import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  ColumnToggle,
  Search,
} from "react-bootstrap-table2-toolkit";
import { MDBBtn } from "mdbreact";
import propTypes from "prop-types";

const BootstrapTablec = ({
  column,
  data,
  tableName,
  addOnClick,
  editOnClick,
  deletOnClick,
}) => {
  const { ToggleList } = ColumnToggle;
  const { SearchBar } = Search;
  const [selectRows, setSelectRows] = useState([]);

  useEffect(()=>{
    setSelectRows([]);
  },[data])

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      const current = [...selectRows];
      console.log(row);
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
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={column}
      columnToggle
      search
    >
      {(props) => (
        <div>
          <div className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-0 mt-2 pr-0 pt-1">
            <ToggleList {...props.columnToggleProps} />
            <div>
              <div>
                {addOnClick && (
                  <MDBBtn onClick={addOnClick}>
                    <i className="fas fa-plus mt-0 mr-1"></i>
                    {`Add ${tableName}`}
                  </MDBBtn>
                )}

                {editOnClick && (
                  <MDBBtn
                    disabled={selectRows.length == 0 || selectRows.length > 1}
                    onClick={editOnClickL}
                  >
                    <i className="fas fa-pencil-alt mt-0 mr-1"></i>
                    {`Edit ${tableName}`}
                  </MDBBtn>
                )}
                {deletOnClick && (
                  <MDBBtn
                    disabled={selectRows.length == 0 || selectRows.length > 1}
                    onClick={deletOnClickL}
                  >
                    <i className="fas fa-times mt-0 mr-1"></i>
                    {`Delete ${tableName}`}
                  </MDBBtn>
                )}
                <SearchBar {...props.searchProps} />
              </div>
            </div>
          </div>
          <BootstrapTable
            {...props.baseProps}
            pagination={paginationFactory()}
            selectRow={selectd}
            filter={filterFactory()}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

BootstrapTablec.propTypes = {
  column: propTypes.arrayOf(propTypes.object).isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
  tableName: propTypes.string.isRequired,
  addOnClick: propTypes.func.isRequired,
  editOnClick: propTypes.func,
  deletOnClick: propTypes.func,
};
export default BootstrapTablec;
