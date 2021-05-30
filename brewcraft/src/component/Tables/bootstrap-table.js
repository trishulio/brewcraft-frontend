import React, { useEffect, useState, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { ColToggle, TableSearch } from "./col-toggle";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import propTypes from "prop-types";
import { Row, Col, Card, CardBody, Button } from "reactstrap";

import { TableContext } from "./table-context";
const BootstrapTablec = ({ addOnClick, editOnClick, deletOnClick }) => {
  const [selectRows, setSelectRows] = useState([]);
  const { newMaterialOpen, column, data, tableName } = useContext(TableContext);

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
  if (!Array.isArray(data)) {
    return <div>please give only List</div>;
  }
  return (
    <>
      <ToolkitProvider
        keyField="id"
        data={data.flat()}
        columns={column}
        columnToggle
        search
        bootstrap4
      >
        {(props) => {
          return (
            <>
              <Row>
                <Col xs="12">
                  <div className="mb-0">
                    <Button color="primary mr-4" onClick={newMaterialOpen}>
                      Add Ingredient
                    </Button>
                    <TableSearch {...props.searchProps} />
                  </div>
                
                <Col>
                
                <Col md="12">
                <div className="mt-5 mb-4 headingName">
                  {tableName}
                </div>
                </Col>
                <Col md="12">
                  <div>
                    <div className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-0 mt-2 pr-0 pt-1">
                      <div>
                        {editOnClick && (
                          <Button
                            disabled={
                              selectRows.length == 0 || selectRows.length > 1
                            }
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
                            disabled={
                              selectRows.length == 0 || selectRows.length > 1
                            }
                            onClick={deletOnClickL}
                            color="primary"
                            className="mr-2"
                            size="sm"
                          >
                            {`Delete ${tableName}`}
                          </Button>
                        )}
                      </div>
                      {/* <div>
                            <div className="d-inline-flex">
                              <ColToggle {...props.columnToggleProps} />
                              <TableSearch {...props.searchProps} />
                            </div>
                          </div> */}
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory({
                          showTotal: true, // display pagination information
                          withFirstAndLast: false, // hide the going to first and last page button
                          alwaysShowAllBtns: true, // always show the next and previous page button
                          firstPageText: 'First', // the text of first page button
                          prePageText: 'Prev', // the text of previous page button
                          nextPageText: 'Next', // the text of next page button
                          lastPageText: 'Last', // the text of last page button
                          nextPageTitle: 'Go to next', // the title of next page button
                          prePageTitle: 'Go to previous', // the title of previous page button
                          firstPageTitle: 'Go to first', // the title of first page button
                          lastPageTitle: 'Go to last', // the title of last page button
                          hideSizePerPage: false, // hide the size per page dropdown
                          hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
                        })}
                      // selectRow={selectd}
                      filter={filterFactory()}
                      filterPosition="inline"
                      classes="remove_border"
                    />
                  </div>
                </Col>
              
                </Col>
                          </Col>
                </Row>
            </>
          );
        }}
      </ToolkitProvider>
    </>
  );
};

// BootstrapTablec.propTypes = {
//   column: propTypes.arrayOf(propTypes.object).isRequired,
//   data: propTypes.arrayOf(propTypes.object).isRequired,
//   tableName: propTypes.string.isRequired,
//   editOnClick: propTypes.func,
//   deletOnClick: propTypes.func,
// };
export default React.memo(BootstrapTablec);
