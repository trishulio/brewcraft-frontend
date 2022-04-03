import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setEquipmentPageIndex,
    setEquipmentPageSize,
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function EquipmentPagination({ fetchPage, children }) {
    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize, content } =
        useSelector((state) => {
            return state.Equipment;
        });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: (index) => {
            dispatch(setEquipmentPageIndex(index));
        },
        setPageSize: (size) => {
            dispatch(setEquipmentPageSize(size));
        },
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>{children}</Pagination>
        </React.Fragment>
    );
}
