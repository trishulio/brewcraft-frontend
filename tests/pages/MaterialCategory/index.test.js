import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter, useParams } from "react-router-dom";
import MaterialCategory from "../../../src/pages/MaterialCategory/index";
import { useQuery, useKeyPress } from "../../../src/helpers/utils";

const initialState = {
    MaterialCategory: {
        data: {
            id: null,
            name: "",
            parentCategoryId: null,
            parentCategory: {
                id: null,
            },
            version: null,
        },
        initial: {
            id: null,
            name: "",
            parentCategoryId: null,
            parentCategory: {
                id: null,
            },
            version: null,
        },
        invalidName: false,
        invalidParentCategory: false,
        loading: true,
        error: null,
        all: [],
    },
    MaterialCategories: {
        content: [],
        all: [],
        loading: false,
        error: null,
        totalElements: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20,
    },
};

const middlewares = [];

const mockStore = configureStore(middlewares);

const store = mockStore(initialState);
const mockDispatch = jest.fn();

const mockHistory = {
    replace: jest.fn(),
};

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({
        id: "",
    }),
    useHistory: () => mockHistory,
}));

jest.mock("../../../src/helpers/utils", () => ({
    ...jest.requireActual("../../../src/helpers/utils"),
    useQuery: jest.fn().mockReturnValue({
        get: () => {
            return false;
        },
    }),
    useKeyPress: jest.fn().mockReturnValue(false),
}));

describe("MaterialCategory -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategory />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        test("history.replace should happen on id is new", () => {
            useParams.mockReturnValueOnce({
                id: "new",
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategory />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();

            expect(mockDispatch).toHaveBeenCalledWith({
                type: "RESET_MATERIAL_CATEGORY_DETAILS",
                payload: null,
            });
            expect(mockHistory.replace).toHaveBeenCalledWith(
                "/materials/categories/new?edit=true"
            );
        });

        test("setBreadcrumbItems when material caterogy id exists", () => {
            initialState.MaterialCategory.data.id = 1;
            initialState.MaterialCategory.data.name = "dummy";

            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategory />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();

            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_BREADCRUMB_ITEMS",
                payload: {
                    title: "dummy",
                    items: [
                        { title: "Main", link: "#" },
                        { title: "Material Categories", link: "#" },
                    ],
                    backButton: false,
                },
            });
        });

        // test("setBreadcrumbItems when material id exists", () => {
        //     initialState.MaterialCategory.data.id = 1;
        //     initialState.MaterialCategory.data.name = "dumy";

        //     useParams.mockReturnValueOnce({
        //         id: "new",
        //     });

        //     const store = mockStore(initialState);

        //     const wrapper = mount(
        //         <Provider store={store}>
        //             <BrowserRouter>
        //                 <MaterialCategory />
        //             </BrowserRouter>
        //         </Provider>
        //     );
        //     expect(shallowToJson(wrapper)).toMatchSnapshot();
        // });

        // test("setEditMode should set editable to true", () => {
        //     initialState.MaterialCategory.data.id = 1;
        //     initialState.MaterialCategory.data.name = "dumy";

        //     useParams.mockReturnValueOnce({
        //         id: "new",
        //     });

        //     useQuery.mockReturnValue({
        //         get: () => {
        //             return true;
        //         },
        //     });

        //     const store = mockStore(initialState);

        //     const wrapper = mount(
        //         <Provider store={store}>
        //             <BrowserRouter>
        //                 <MaterialCategory />
        //             </BrowserRouter>
        //         </Provider>
        //     );
        //     expect(shallowToJson(wrapper)).toMatchSnapshot();
        // });

        // test("Should dispatch setInvalidMaterialCategoryName on onSave", () => {
        //     initialState.MaterialCategory.data.id = 1;
        //     initialState.MaterialCategory.data.name = "dumy";

        //     useKeyPress.mockReturnValue(true);
        //     useParams.mockReturnValueOnce({
        //         id: "new",
        //     });
        //     useQuery.mockReturnValue({
        //         get: () => {
        //             return true;
        //         },
        //     });

        //     const store = mockStore(initialState);

        //     const wrapper = mount(
        //         <Provider store={store}>
        //             <BrowserRouter>
        //                 <MaterialCategory />
        //             </BrowserRouter>
        //         </Provider>
        //     );

        //     expect(shallowToJson(wrapper)).toMatchSnapshot();

        //     wrapper
        //         .find('input[name="materialCategoryName"]')
        //         .simulate("keyup");

        //     expect(mockDispatch).toHaveBeenCalledWith({
        //         type: "INVALID_MATERIAL_CATEGORY_NAME",
        //         payload: {
        //             invalidName: false,
        //         },
        //     });
        //     expect(mockDispatch).toHaveBeenCalledWith({
        //         type: "INVALID_MATERIAL_CATEGORY_PARENT_CATEGORY",
        //         payload: {
        //             invalidParentCategory: true,
        //         },
        //     });
        // });

        // test("dispatch editMaterialCategory on click of onSave", () => {
        //     const initialState = {
        //         MaterialCategory: {
        //             data: {
        //                 id: 1,
        //                 name: "dummy",
        //                 parentCategoryId: null,
        //                 parentCategory: {
        //                     id: 1,
        //                 },
        //                 version: null,
        //             },
        //             initial: {
        //                 id: null,
        //                 name: "",
        //                 parentCategoryId: null,
        //                 parentCategory: {
        //                     id: null,
        //                 },
        //                 version: null,
        //             },
        //             invalidName: false,
        //             invalidParentCategory: false,
        //             loading: true,
        //             error: null,
        //             all: [],
        //         },
        //         MaterialCategories: {
        //             content: [],
        //             all: [],
        //             loading: false,
        //             error: null,
        //             totalElements: 0,
        //             totalPages: 0,
        //             pageIndex: 0,
        //             pageSize: 20,
        //         },
        //     };

        //     const store = mockStore(initialState);

        //     useKeyPress.mockReturnValue(true);
        //     useParams.mockReturnValueOnce({
        //         id: "new",
        //     });
        //     useQuery.mockReturnValue({
        //         get: () => {
        //             return true;
        //         },
        //     });

        //     const wrapper = mount(
        //         <Provider store={store}>
        //             <BrowserRouter>
        //                 <MaterialCategory />
        //             </BrowserRouter>
        //         </Provider>
        //     );

        //     expect(shallowToJson(wrapper)).toMatchSnapshot();

        //     wrapper
        //         .find('input[name="materialCategoryName"]')
        //         .simulate("keyup");
        // });

        // test("dispatch saveMaterialCategory on click of onSave", () => {
        //     const initialState = {
        //         MaterialCategory: {
        //             data: {
        //                 id: null,
        //                 name: "dummy",
        //                 parentCategoryId: null,
        //                 parentCategory: {
        //                     id: 1,
        //                 },
        //                 version: null,
        //             },
        //             initial: {
        //                 id: null,
        //                 name: "",
        //                 parentCategoryId: null,
        //                 parentCategory: {
        //                     id: null,
        //                 },
        //                 version: null,
        //             },
        //             invalidName: false,
        //             invalidParentCategory: false,
        //             loading: true,
        //             error: null,
        //             all: [],
        //         },
        //         MaterialCategories: {
        //             content: [],
        //             all: [],
        //             loading: false,
        //             error: null,
        //             totalElements: 0,
        //             totalPages: 0,
        //             pageIndex: 0,
        //             pageSize: 20,
        //         },
        //     };

        //     const store = mockStore(initialState);

        //     useKeyPress.mockReturnValue(true);
        //     useParams.mockReturnValueOnce({
        //         id: "new",
        //     });
        //     useQuery.mockReturnValue({
        //         get: () => {
        //             return true;
        //         },
        //     });

        //     const wrapper = mount(
        //         <Provider store={store}>
        //             <BrowserRouter>
        //                 <MaterialCategory />
        //             </BrowserRouter>
        //         </Provider>
        //     );

        //     expect(shallowToJson(wrapper)).toMatchSnapshot();

        //     wrapper
        //         .find('input[name="materialCategoryName"]')
        //         .simulate("keyup");
        // });
    });
});
