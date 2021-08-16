import user1 from "../../assets/images/users/user-4.jpg";
import user2 from "../../assets/images/users/user-6.jpg";
// import noImage from "../../assets/images/no-image.jpg";

async function fetchFinishedGoods(params) {
    // const data = {
    //     params: {
    //         page: params.pageIndex || 0,
    //         size: params.pageSize || 500,
    //     }
    // };

    return Promise.resolve({
        data: {
            content: [
                { sku: "78332073", imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", package: "330ml x 6 Cans", packaged : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", available: 5, reserved: 100 },
                { sku: "78332073", imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", package: "330ml x 6 Cans", packaged : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", available: 15 },
                { sku: "52140300", imgUrl : user1, id : "85214796", name : "Fantastic Lager", processor: "Martin", package: "330ml x 1 Can", packaged : "5/12/2016 2:10 PM", updated : "5/12/2016 2:30 PM", available: 8 },
                { sku: "52140300", imgUrl : user1, id : "52140300", name : "Fantastic Lager", processor: "Martin", package: "330ml x 6 Can", packaged : "5/12/2016 1:47 PM", updated : "5/12/2016 2:01 PM", available: 80 },
                { sku: "22367593", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "325ml x 12 Bottles", packaged : "5/10/2016 8:10 AM", updated : "5/10/2016 1:27 PM", available: 34, reserved: 20 },
                { sku: "22789432", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "325ml x 1 Bottle", packaged : "5/09/2016 4:10 PM", updated : "5/10/2016 1:27 PM", available: 40 },
                { sku: "22367593", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "Half-Barrel Keg", packaged : "5/10/2016 7:20 AM", updated : "5/10/2016 1:20 PM", available: 7, reserved: 80 },
                { sku: "22367593", imgUrl : user2, id : "52140300", name : "Fantastic Lager", processor: "Robert", package : "Quarter-Barrel Keg", packaged : "5/10/2016 6:10 AM", updated : "5/10/2016 12:03 PM", available: 5, reserved: 45 }
            ],
            totalElements: 8,
            totalPages: 1,
            pageIndex: 0,
            pageSize: 20
        }
    })
}

export const api = {
    fetchFinishedGoods
};
