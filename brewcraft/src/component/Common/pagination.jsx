import React, { useEffect, useState } from "react";
import { min } from "lodash";
import {
    Row,
    Col,
    Input,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

export default function PageWrapper({ items, fetchItems, totalElements, totalPages, pageIndex, setPageIndex, pageSize, setPageSize, children }) {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const pages = [];
        let offset = -2;
        if (pageIndex === totalPages - 1) {
            offset -= 2;
        } else if (pageIndex === totalPages - 2) {
            offset -= 1;
        }
        const max = Math.min(5, totalPages);
        for (let i = pageIndex + offset; pages.length < max; i++) {
            if (i >= 0) {
                pages.push({
                    active: i === pageIndex,
                    value: i + 1
                });
            }
            if (i + 1 === totalPages) {
                break;
            }
        }
        setPages(pages);

    }, [items]);

    useEffect(() => {
        fetchItems(({pageIndex, pageSize}));
        setPageIndex(0);

    }, [pageSize]);

    useEffect(() => {
        fetchItems(({pageIndex, pageSize}));

    }, [pageIndex]);

    function onChangePageSize(e) {
        setPageSize(parseInt(e.target.value));
    }

    function onPagnationItemClick(e) {
        switch (e.target.tabIndex) {
            case -1:
                if (pageIndex - 1 >= 0) {
                    setPageIndex(pageIndex - 1);
                }
                break;
            case -2:
                setPageIndex(pageIndex + 1);
                break;
            default:
                setPageIndex(e.target.tabIndex - 1);
                break;
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <Input
                        type="select"
                        size="sm"
                        className="waves-effect float-left mr-2 my-2"
                        style={{ width: 60 }}
                        onChange={onChangePageSize}
                    >
                        <option>10</option>
                        <option>25</option>
                        <option>100</option>
                    </Input>
                </Col>
            </Row>

                {children}

            <Row>
                <Col sm={6}>
                    <span className="font-size-12 float-left mt-3">{
                    totalElements ?
                        `${pageIndex * pageSize + 1} to ${min([pageIndex * pageSize + pageSize, totalElements])} of ${totalElements} results ..`
                        : "Showing 0 results .."
                    }
                    </span>
                </Col>
                <Col sm={6}>
                    <Pagination className="float-right mt-3">
                        <PaginationItem
                            disabled={!pageIndex}
                            key="-1"
                        >
                            <PaginationLink
                                tabIndex="-1"
                                onClick={onPagnationItemClick}
                            >
                                Previous
                            </PaginationLink>
                        </PaginationItem>
                        {
                            pages.map(page =>
                                <PaginationItem
                                    active={page.active}
                                    key={page.value}
                                >
                                    <PaginationLink
                                        tabIndex={page.value}
                                        onClick={onPagnationItemClick}
                                    >
                                        {page.value} {page.active && <span className="sr-only">(current)</span>}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        }
                        <PaginationItem
                            disabled={pageIndex * pageSize + pageSize >= totalElements}
                            key="-2"
                        >
                            <PaginationLink
                                tabIndex="-2"
                                onClick={onPagnationItemClick}
                            >
                                Next
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Col>
            </Row>
        </React.Fragment>
    );
}