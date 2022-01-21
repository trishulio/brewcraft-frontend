import * as React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import MaterialCategories from "../../../src/pages/MaterialCategories/index";
import { useQuery } from "../../../src/helpers/utils";

const initialState = {
    MaterialCategories: {
        content: [],
        all: [
            {
                parentCategoryId: 1,
            },
            {
                parentCategoryId: null,
            },
        ],
        loading: false,
        error: null,
        totalElements: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20,
    },
    FilterBar: {
        visible: false,
    },
};

const middlewares = [];

const mockStore = configureStore(middlewares);

const store = mockStore(initialState);
const mockDispatch = jest.fn();
const mockQueryDelete = jest.fn();

const mockHistory = {
    replace: jest.fn(),
    push: jest.fn(),
    location: {
        pathname: "/",
    },
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

jest.mock("../../../src/store/actions", () => ({
    ...jest.requireActual("../../../src/store/actions"),
    editMaterialCategory: jest.fn(),
    saveMaterialCategory: jest.fn(),
}));

describe("MaterialCategories -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        test("Dispatching setBreadcrumbItems,fetchAllMaterialCategories on component load", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_BREADCRUMB_ITEMS",
                payload: {
                    title: "Material Categories",
                    items: [
                        { title: "Main", link: "#" },
                        { title: "Materials", link: "#" },
                    ],
                    backButton: false,
                },
            });
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "FETCH_ALL_MATERIAL_CATEGORIES_REQUEST",
            });
        });
    });

    describe("ToolBar Component", () => {
        test("History.push should call on onClick of button NewCatergory", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("New Category")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockHistory.push).toHaveBeenCalledWith({
                pathname: "/materials/categories/new",
                search: "?edit=true",
            });
        });
    });

    describe("FilterBar Component", () => {
        test("History.push should call on onClick of button Apply Filters", () => {
            useQuery.mockReturnValue({
                get: () => {
                    return true;
                },
                delete: mockQueryDelete,
                append: jest.fn(),
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Apply Filters")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockHistory.push).toHaveBeenCalled();
            expect(mockQueryDelete).toHaveBeenCalled();
        });

        test("History.push should call on onClick of button clear", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Clear")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockHistory.push).toHaveBeenCalled();
            expect(mockHistory.push).toHaveBeenCalledWith("/");
        });
    });

    describe("Pagination Component", () => {
        test("Dispatch setMaterialCategoriesPageIndex on call of setPageIndex", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "select" && node.text().includes("20")
                    );
                })
                .at(0)
                .simulate("change", { target: { value: 1 } });

            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_MATERIAL_CATEGORIES_PAGE_SIZE",
                payload: {
                    pageSize: 1,
                },
            });

            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_MATERIAL_CATEGORIES_PAGE_INDEX",
                payload: {
                    pageIndex: 0,
                },
            });
        });
    });

    describe("Table Component", () => {
        test("Dispatch setMaterialCategoriesPageIndex on call of setPageIndex", () => {
            initialState.MaterialCategories.content = [
                {
                    id: 2,
                    parentCategoryId: 1,
                    name: "dummy",
                },
                {
                    id: 1,
                    parentCategoryId: null,
                    name: "dummy1",
                },
            ];

            const mockQueryAppend = jest.fn();
            const mockQueryDeleete = jest.fn();

            useQuery.mockReturnValue({
                get: () => {
                    return false;
                },
                delete: mockQueryDeleete,
                append: mockQueryAppend,
            });

            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategories />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "td" && node.text().includes("dummy")
                    );
                })
                .at(0)
                .simulate("click");

            expect(mockHistory.push).toHaveBeenCalledWith(
                "/materials/categories/2"
            );

            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "th" &&
                        node.text().includes("Parent Category")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockQueryAppend).toHaveBeenCalledWith(
                "sort",
                "parentCategory"
            );
            expect(mockQueryDeleete).toHaveBeenCalledWith("sort");
            expect(mockQueryDeleete).toHaveBeenCalledWith("order");

            wrapper
                .findWhere((node) => {
                    return node.type() === "th" && node.text().includes("Name");
                })
                .at(0)
                .simulate("click");

            expect(mockQueryAppend).toHaveBeenCalledWith("sort", "name");
        });
    });
});
