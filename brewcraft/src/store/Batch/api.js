import AxiosInstance from "../../helpers/axiosInstance";


async function fetchBrew() {
    // TODO
    // return await AxiosInstance.get(`/brews/${id}`)
    // .then((r) => r);
    return Promise.resolve({
        id: "10",
        title: "Fantastic Lager Brew #23391",
        description: "",
        parentId: null,
        productId: {
            id: 1,
            title: "Fantastic Lager"
        },
        created: Date.now(),
        createdBy: {
            id: 1,
            displayName: "Ken Burns"
        },
        updated: Date.now(),
        updatedBy: {
            id: 1,
            displayName: "Ken Burns"
        },
        version: 1,
        files: [],
        abvPercent: 5.0,
        materials: [{
            id: 1,
            name: "Pale Ale malt",
            quantityKg: 200.0
        }, {
            id: 1,
            name: "Irish Hops",
            quantityKg: 120.0
        }],
        brewStart: Date.now(),
        brewEnd: Date.now(),
        brewStatus: 0,
        fermentVolumeInHl: 98.2,
        fermentTimeIn: Date.now(),
        fermentTimeIn: Date.now(),
        fermentEquipmentId: {

        },
        transfers: [{
            timeIn: Date.now(),
            equipmentId: [{
                id: 12,
                name: "Condition Tank 1",
                volumeInHl: 179.9
            }, {
                id: 13,
                name: "Condition Tank 2",
                volumeInHl: 180.8
            }]
        }, {
            timeIn: Date.now(),
            equipmentId: [{
                id: 12,
                name: "Brite Tank 1",
                volumeInHl: 320.0,
            }]
        }],
        packaged: [{
            packageId: 1,   // 355 ml cans
            quantity: 100,
            volumeL: 0.355,
            name: "355 ml Cans"
        }, {
            packageId: 10,   // keg
            quantity: 14,
            volumeMl: 5.0,
            name: "Mini keg"
        }],
        comments: [{
            userId: 2,
            name: "Robert D.",
            content: "Awesome brew boys well done!",
            time: Date.now()
        }]
    });
}

async function createBrew(data) {
    return await AxiosInstance.post("/brews", data)
    .then((r) => r);
}
async function updateBrew(id, data) {
    return await AxiosInstance.patch(`/brews/${id}`, data)
    .then((r) => r);
}

async function deleteBrew(id) {
    return await AxiosInstance.delete(`/brews/${id}`)
}

export const api = {
    fetchBrew,
    createBrew,
    updateBrew,
    deleteBrew
};
