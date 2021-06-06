import React, { useEffect, useState, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { ColToggle, TableSearch } from "./col-toggle";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import propTypes from "prop-types";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { TableContext } from "./table-context";

const BootstrapTablec = () => {
  const { newMaterialOpen, column, data, tableName } = useContext(TableContext);

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
                      <div class="table_wrappwe">
                        <BootstrapTable
                          {...props.baseProps}
                          pagination={paginationFactory({
                            showTotal: true, // display pagination information
                            withFirstAndLast: false, // hide the going to first and last page button
                            alwaysShowAllBtns: true, // always show the next and previous page button
                            prePageText: "Prev", // the text of previous page button
                            nextPageText: "Next", // the text of next page button
                            hideSizePerPage: false, // hide the size per page dropdown
                            hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
                          })}
                          filter={filterFactory()}
                          filterPosition="inline"
                          classes="remove_border table-centered table-vertical table-nowrap mb-1"
                          wrapperClasses="table-responsive table-striped table-sm"
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

export default React.memo(BootstrapTablec);
