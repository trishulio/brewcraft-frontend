import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setUsersPageIndex,
    setUsersPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function UsersPagination({ children }) {

    const dispatch = useDispatch();

    const users = useSelector(state => {
        return state.Users.content;
    });

    const { totalElements, totalPages, pageIndex, pageSize } = useSelector(state => {
        return state.Users;
    });

    const pageProps = {
        items: users,
        totalElements,
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