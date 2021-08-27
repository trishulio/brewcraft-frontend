import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setUsersPageIndex,
    setUsersPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function UsersPagination({ children }) {

    const dispatch = useDispatch();

    const { totalItems, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.Users;
    });

    const pageProps = {
        items: content,
        totalElements: totalItems,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: index => {
            dispatch(setUsersPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setUsersPageSize(size));
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