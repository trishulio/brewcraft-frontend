import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setBreadcrumbItems,
    setBatchesDetails
} from "../../store/actions";

import fantasticLager from "../../assets/images/products/fantastic-lager.jpg";
import deliciousIpa from "../../assets/images/products/delicous-ipa.jpg";
import specialAle from "../../assets/images/products/special-ale.jpg";
import warmStout from "../../assets/images/products/warm-stout.jpg";
import noImage from "../../assets/images/no-image.jpg";

import BatchesInner from "./batches";

export default function Batches() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Batches", [
                { title: "Main", link: "#" },
                { title: "Batches", link: "#" },
            ])
        );
        dispatch(setBatchesDetails({
            content: [
                { imgUrl : fantasticLager, id : "85214796", name : "Fantastic Lager", processor: "Martin", status : "Complete", equipment: "FT-4", started : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", color : "info" },
                { imgUrl : fantasticLager, id : "52140300", name : "Fantastic Lager", processor: "Martin", status : "Complete", equipment: "FT-7", started : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", color : "info" },
                { imgUrl : specialAle, id : "96254137", name : "Special Ale", processor: "Robert", status : "Complete", equipment: "CT-4", started : "5/12/2016 11:49 AM", updated : "5/12/2016 1:20 PM", color : "info" },
                { imgUrl : warmStout, id : "12365474", name : "Warm Stout", processor: "Robert", status : "Complete", equipment: "CT-5", started : "5/12/2016 9:10 AM", updated: "5/12/2016 10:02 AM", color : "info" },
                { imgUrl : deliciousIpa, id : "12354781", name : "Delicious IPA", processor: "Robert", status : "Complete", equipment: "BT-1", amount : "584", started : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", color : "info" },
                { imgUrl : deliciousIpa, id : "12344345", name : "Delicious IPA", processor: "Robert", status : "Failed", amount : "0", started : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", completed : "5/09/2016 8:01 PM", color : "danger" }
            ],
            totalElements: 6,
            totalPages: 1,
            pageIndex: 0,
            pageSize: 10
        }));
    }, []);

    return (
        <BatchesInner />
    );
}