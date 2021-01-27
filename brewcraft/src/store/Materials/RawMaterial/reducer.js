import {
    SET_RAW_MATERIAL
} from './actionTypes';

const initialState = {
    data: { 

    },
    loading: false,
    error: null,
    formLoading: {
      loading: false,
      error: false,
      message: "",
    },
  };

const RawMaterial = (state=initialState, { type, payload }) => {
    switch(type) {
        case SET_RAW_MATERIAL: {
            return {
                ...state,
                raw_material: {
                    ...state.raw_material,
                    payload
                }
            }
        }
        default:
            return state;
    };
};

export default RawMaterial;