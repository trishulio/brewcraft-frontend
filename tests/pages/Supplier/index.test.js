import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Supplier from "../../../src/pages/Supplier/index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "../../../src/helpers/utils";

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

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../../../src/helpers/utils", () => ({
    ...jest.requireActual("../../../src/helpers/utils"),
    useQuery: jest.fn().mockReturnValue({
        get: () => {
            return false;
        },
    }),
}));

describe("<Supplier />", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Supplier />
                    </BrowserRouter>
                </Provider>
            );
            expect(wrapper).toMatchSnapshot();
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
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        test("On Save isValid Name is true and supplierid is not empty", () => {
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
            wrapper.find({ children: "Cancel" }).at(1).simulate("click");

            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    });
});
