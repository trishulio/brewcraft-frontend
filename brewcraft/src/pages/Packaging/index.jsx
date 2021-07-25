import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPackaging,
    setBreadcrumbItems,
    fetchAllMaterialCategories
} from "../../store/actions";
import PackagingInner from "./packaging";

export default function Packaging() {
    const dispatch = useDispatch();

    const packaging = useSelector(state => {
        return state.Packaging.content;
    });

    const { pageIndex, pageSize, selectedCategory } = useSelector(state => {
        return state.Packaging;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Packaging", [
                { title: "Main", link: "#" },
                { title: "Materials", link: "#" }
            ])
        );
        fetchPage();
    }, []);

    useEffect(() => {
        dispatch(fetchAllMaterialCategories());

    }, [packaging]);

    useEffect(() => {
        fetchPage();

    }, [selectedCategory]);

    function fetchPage() {
        const props = {
            pageIndex, pageSize, parentCategoryId: selectedCategory.id
        };
        dispatch(fetchPackaging({ ...props }));
    }

    return (
        <PackagingInner
            packaging={packaging} fetchPage={fetchPage}
        />
    );
}