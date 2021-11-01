const state = {
    data: {
        id: "",
        parentMixtureId: "",
        quantity: {
            symbol: "",
            value: 0
        },
        equipment: {},
        brewStage: {},
        version: null
    },
    initial: {
        id: "",
        parentMixtureId: "",
        quantity: {
            symbol: "",
            value: 0
        },
        equipment: {},
        brewStage: {},
        version: null
    },
    loading: true,
    error: null
};

export {
    state as initialState
};