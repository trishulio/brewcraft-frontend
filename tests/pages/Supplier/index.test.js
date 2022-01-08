import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter,useParams } from "react-router-dom";
import { useQuery } from "../../../src/helpers/utils";
import Supplier from "../../../src/pages/Supplier/index";

const initialState = {
    Supplier: {
        data: {
            id: "",
            name: "",
            address: {
                id: "",
                addressLine1: "",
                addressLine2: "",
                country: "",
                province: "",
                city: "",
                postalCode: "",
            },
            version: null,
        },
        initial: {
            id: "",
            name: "",
            address: {
                id: "",
                addressLine1: "",
                addressLine2: "",
                country: "",
                province: "",
                city: "",
                postalCode: "",
            },
            version: null,
        },
        invalidName: false,
        invalidAddressLine1: false,
        invalidAddressLIne2: false,
        invalidCountry: false,
        invalidProvince: false,
        invalidCity: false,
        inalidPostalCode: false,
        loading: true,
        error: true,
    },
};
const middlewares = [];

const mockStore = configureStore(middlewares);

const store = mockStore(initialState);
const mockDispatch = jest.fn();

const mockHistory = ({
    replace: jest.fn()
})

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", ()=> ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({
        id: ""
    }),
    useHistory: () => mockHistory
}))

jest.mock("../../../src/helpers/utils", () => ({
    ...jest.requireActual("../../../src/helpers/utils"),
    useQuery: jest.fn().mockReturnValue({
        get: () => {
            return false;
        },
    }),
}));

describe("Supplier -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        test("On Save isValid Name is false", () => {
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            initialState.Supplier.data.id = "1";
            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );
            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(9, {
                type: "SET_SUPPLIER_DETAILS",
                payload: {
                    error: true,
                    invalidName: true,
                },
            });
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        test("On Save isValid Name is true and supplierid is not empty", () => {
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            initialState.Supplier.data.id = "1";
            initialState.Supplier.data.name = "dummy";

            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();

            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(15, {
                type: "EDIT_SUPPLIER_REQUEST",
                payload: {
                    form: {
                        address: {
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            country: "",
                            id: undefined,
                            postalCode: "",
                            province: "",
                        },
                        contacts: undefined,
                        name: "dummy",
                        version: null,
                    },
                    id: "1",
                },
            });
        });

        test("On Save isValid Name is true and supplierid is not empty and is changed is false", () => {
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            initialState.Supplier.data.id = "";
            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();

            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(21, {
                type: "ADD_SUPPLIER_REQUEST",
                payload: {
                    form: {
                        address: {
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            country: "",
                            postalCode: "",
                            province: "",
                        },
                        contacts: [],
                        name: "dummy",
                    },
                },
            });
        });

        test("On param id is new history.replace should be called", () => {
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            useParams.mockReturnValueOnce({
                id: "new"
            });
            initialState.Supplier.data.id = "";
            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();

            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(21, {
                type: "ADD_SUPPLIER_REQUEST",
                payload: {
                    form: {
                        address: {
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            country: "",
                            postalCode: "",
                            province: "",
                        },
                        contacts: [],
                        name: "dummy",
                    },
                },
            });
            expect(mockHistory.replace).toHaveBeenCalledWith("/suppliers/new?edit=true")
        });

        test("Whenever initial Supplier Id is having value setBreadcrumbItems should gets called with initial Supplier name", () => {
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            useParams.mockReturnValueOnce({
                id: "new"
            });
            initialState.Supplier.data.id = "";
            initialState.Supplier.initial.id = 1;
            initialState.Supplier.initial.name = "dummy";

            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );

            expect(shallowToJson(wrapper)).toMatchSnapshot();

            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(21, {
                type: "ADD_SUPPLIER_REQUEST",
                payload: {
                    form: {
                        address: {
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            country: "",
                            postalCode: "",
                            province: "",
                        },
                        contacts: [],
                        name: "dummy",
                    },
                },
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(28,{
                type: "SET_BREADCRUMB_ITEMS",
                payload: {
                    title: "dummy",
                    "backButton": false,
                    "items": [
                     {
                        "link": "#",
                        "title": "Main",
                      },
                     {
                        "link": "#",
                        "title": "Purchases",
                      },
                     {
                        "link": "#",
                        "title": "Suppliers",
                      },
                    ],
                },
            })
            expect(mockHistory.replace).toHaveBeenCalledWith("/suppliers/new?edit=true")
        });
    });
});

