import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../component/Common/pagination";
import {
    setRawMaterialsPageIndex,
    setRawMaterialsPageSize
} from "../../../store/actions";

export default function RawMaterialsPagination({ children }) {

    const dispatch = useDispatch();

    const rawMaterials = useSelector(state => {
        return state.RawMaterials.content;
    });

    const { totalElements, totalPages, pageIndex, pageSize } = useSelector(state => {
        return state.RawMaterials;
    });

    const pageProps = {
        items: rawMaterials,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: index => {
            dispatch(setRawMaterialsPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setRawMaterialsPageSize(size));
        }
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>
                {children}
            </Pagination>
        </React.Fragment>
    );
}