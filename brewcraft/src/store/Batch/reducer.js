import {
    FETCH_BATCH,
    CREATE_BATCH,
    DELETE_BATCH,
    UPDATE_BATCH,
    SET_BATCH_DETAILS
} from './actionTypes';

const initialState = {
    data: {
        id: "",
        title: "",
        description: "",
        parentId: null,
        productId: null,
        created: null,
        createdBy: null,
        updated: null,
        updatedBy: null,
        version: null,
        files: [],
        abvPercent: null,
        materials: [],
        batchStart: null,
        batchEnd: null,
        batchStatus: 0,
        fermentVolumeInHl: null,
        fermentTimeIn: null,
        fermentTimeIn: null,
        fermentEquipmentId: null,
        transfers: [],
        packaged: [],
    },
    invalidName: false,
    invalidDescription: false,
    loading: true,
    error: null
};

const Batch = (state = initialState, { type, payload }) => {
    switch(type){
        case SET_BATCH_DETAILS:
        return {
            ...state,
            id: payload.id,
            title: payload.title,
            description: payload.description,
            parentId: payload.parentId,
            productId: payload.productId,
            created: payload.created,
            createdBy: payload.createdBy,
            updated: payload.updated,
            updatedBy: payload.updatedBy,
            version: payload.version,
            files: payload.files,
            abvPercent: payload.abvPercent,
            materials: payload.materials,
            batchStart: payload.batchStart,
            batchEnd: payload.batchEnd,
            batchStatus: payload.batchStatus,
            fermentVolumeInHl: payload.fermentVolumeInHl,
            fermentTimeIn: payload.fermentTimeIn,
            fermentTimeOut: payload.fermentTimeOut,
            fermentEquipmentId: payload.fermentEquipmentId,
            transfers: payload.transfers,
            packaged: payload.packaged
        };

        case FETCH_BATCH:
        case CREATE_BATCH:
        case UPDATE_BATCH:
        case DELETE_BATCH:
        default:
        return {
            ...state,
            loading: false
        };
    }
}

export default Batch;