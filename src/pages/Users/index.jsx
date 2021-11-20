import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUsers,
    setBreadcrumbItems
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import UsersInner from "./contacts";

export default function Users() {
    const dispatch = useDispatch();
    const query = useQuery();
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Users;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Users", [
                { title: "Main", link: "#" },
                { title: "Users", link: "#" }
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, sort, order
        };
        dispatch(fetchUsers({ ...props }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, order]);

    return (
        <UsersInner />
    );
}