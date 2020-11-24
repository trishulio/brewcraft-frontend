import { get } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {fetchVendor} from "../../store/Vendor/actions";


export default function VendorList() {
    // dispatch action
    const {data, loading, error} = useSelector(state=>{
        return get(state,'Vendor');
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Vendors", [
                { title: "List all vendors", link: "/vendors"  }
            ])
        );
        dispatch(fetchVendor());
    }, []);





    return <h1>Hello Vendors!</h1>;
}