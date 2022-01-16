import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import Toolbar from "../../../../src/pages/Supplier/components/toolbar";

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
const mockGoBack = jest.fn();
const mockPush = jest.fn();

const mockHistory = {
    replace: jest.fn(),
    goBack: mockGoBack,
    push: mockPush,
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
    useHistory: () =>
        mockHistory.mockReturnValue({
            goBack: () => mockGoBack,
        }),
}));

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => mockHistory,
}));

// configure({ adapter: new Adapter() });

describe("Supplier -> Components -> <Toolbar>", () => {
    describe("render()", () => {
        test("renders the toolbar component", () => {
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar
                            editable={false}
                            changed={false}
                            onSave={jest.fn()}
                            onDelete={jest.fn()}
                        />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
        test("History.goback button should be called on cancel", () => {
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={true} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent.find("Button").at(1).simulate("click");
            expect(mockGoBack).toHaveBeenCalled();
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
        test("History.push button should be called on edit", () => {
            initialState.Supplier.data.id = 1;
            const store = mockStore(initialState);
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={false} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Cancel")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockGoBack).toHaveBeenCalled();
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });

        test("History.push button should be called on Suppliers", () => {
            initialState.Supplier.data.id = 1;
            const store = mockStore(initialState);
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={false} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Suppliers")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockGoBack).toHaveBeenCalled();
            expect(mockPush).toHaveBeenCalledWith("/suppliers");
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
        test("History.push button should be called on new Supplier", () => {
            initialState.Supplier.data.id = 1;
            const store = mockStore(initialState);
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={false} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("New Supplier")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockGoBack).toHaveBeenCalled();
            expect(mockPush).toHaveBeenCalledWith({
                pathname: "/suppliers/new",
                search: "?edit=true",
            });
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
    });
});
