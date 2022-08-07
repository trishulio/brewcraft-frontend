import React, { useEffect, useState } from "react";
import { min } from "lodash";
import {
    Row,
    Col,
    Input,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";
import { FilterBarIcon } from "../Layout/VerticalLayout/FilterBar";

export default function PageWrapper({
    items,
    totalElements,
    totalPages,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    children,
}) {
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
                    value: i + 1,
                });
            }
            if (i + 1 === totalPages) {
                break;
            }
        }
        setPages(pages);
    }, [items, pageIndex, pageSize, totalPages]);

    function onChangePageSize(e) {
        setPageIndex(0);
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
                        className="waves-effect float-left mr-2 my-2"
                        style={{ width: "4rem", fontSize: "0.875rem" }}
                        value={pageSize}
                        onChange={onChangePageSize}
                    >
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </Input>
                    <FilterBarIcon />
                </Col>
            </Row>

            {children}

            <Row>
                <Col sm={6}>
                    <span
                        className="float-left mt-3"
                        style={{ fontSize: "0.875rem" }}
                    >
                        {totalElements
                            ? `${pageIndex * pageSize + 1} to ${min([
                                  pageIndex * pageSize + pageSize,
                                  totalElements,
                              ])} of ${totalElements} results`
                            : "Showing 0 results"}
                    </span>
                </Col>
                <Col sm={6}>
                    <Pagination className="float-right mt-3">
                        <PaginationItem disabled={!pageIndex} key="-1">
                            <PaginationLink
                                tabIndex="-1"
                                style={{ fontSize: "0.875rem" }}
                                onClick={onPagnationItemClick}
                            >
                                Previous
                            </PaginationLink>
                        </PaginationItem>
                        {pages.map((page) => (
                            <PaginationItem
                                active={page.active}
                                key={page.value}
                            >
                                <PaginationLink
                                    tabIndex={page.value}
                                    onClick={onPagnationItemClick}
                                    data-testid="paginationLink"
                                    style={{ fontSize: "0.875rem" }}
                                >
                                    {page.value}{" "}
                                    {page.active && (
                                        <span className="sr-only">
                                            (current)
                                        </span>
                                    )}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem
                            disabled={
                                pageIndex * pageSize + pageSize >= totalElements
                            }
                            key="-2"
                        >
                            <PaginationLink
                                tabIndex="-2"
                                style={{ fontSize: "0.875rem" }}
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
