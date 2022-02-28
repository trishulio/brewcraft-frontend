import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter, useParams } from "react-router-dom";
import { useQuery } from "../../../src/helpers/utils";
import Suppliers from "../../../src/pages/Suppliers/index";

const initialState = {
    Suppliers: {
        content: [],
        all: [],
        loading: true,
        error: null,
        totalItems: 0,
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
}));

describe("Suppliers -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Suppliers />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    });
});
