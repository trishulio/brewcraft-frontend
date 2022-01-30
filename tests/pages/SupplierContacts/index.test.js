import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "../../../src/helpers/utils";
import SupplierContacts from "../../../src/pages/SupplierContacts/index";

const initialState = {
    SupplierContacts: {
        content: [],
        all: [],
        loading: true,
        error: null,
        totalElements: 0,
        totalItems: 0,
        pageIndex: 0,
        pageSize: 20,
    },
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
        visible: {},
    },
};

const middlewares = [];

const mockStore = configureStore(middlewares);

const store = mockStore(initialState);
const mockDispatch = jest.fn();

const mockHistory = {
    replace: jest.fn(),
    push: jest.fn(),
    goBack: jest.fn(),
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

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => mockHistory,
}));

jest.mock("../../../src/helpers/utils", () => ({
    ...jest.requireActual("../../../src/helpers/utils"),
    useQuery: jest.fn().mockReturnValue({
        get: () => {
            return false;
        },
        delete: jest.fn(),
        append: jest.fn(),
    }),
}));

describe("SupplierContacts -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContacts />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
    });

    describe("<ToolBar/> Component", () => {
        test("Histroy.push should be called on new Contact button Click", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContacts />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("New Contact")
                    );
                })
                .simulate("click");
            expect(mockHistory.push).toHaveBeenCalledWith({
                pathname: "/suppliers/contacts/new",
                search: "?edit=true",
            });
        });
        test("Histroy.push should be called on suppliers button click", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContacts />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Suppliers")
                    );
                })
                .simulate("click");
            expect(mockHistory.push).toHaveBeenCalledWith("/suppliers");
        });
    });

    describe("<Pagination/> Component", () => {
        test("Should dispatch setSupplierContactsPageIndex", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContacts />
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
                type: "SET_SUPPLIER_CONTACTS_PAGE_INDEX",
                payload: { pageIndex: 0 },
            });

            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_SUPPLIER_CONTACTS_PAGE_SIZE",
                payload: { pageSize: 1 },
            });
        });
    });

    describe("<FilterBar/> Component", () => {
        test("Should dispatch setSupplierContactsPageIndex", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContacts />
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
        });
    });

    describe("<Table/> Component", () => {
        test("Should call history.push, query.append on click of tr", () => {
            const mockAppend = jest.fn();
            useQuery.mockReturnValue({
                get: () => {
                    return false;
                },
                delete: jest.fn(),
                append: mockAppend,
            });
            initialState.SupplierContacts.content = [
                {
                    id: 1,
                    firstName: "firstName",
                    lastName: "lastName",
                    email: "email",
                    phoneNumber: "phone",
                    supplier: {
                        id: 1,
                        name: "name",
                    },
                },
            ];
            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContacts />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "tr" &&
                        node.text().includes("firstName")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockHistory.push).toHaveBeenCalledWith({
                pathname: "/suppliers/contacts/1",
            });

            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "th" &&
                        node.text().includes("First Name")
                    );
                })
                .at(0)
                .simulate("click", {
                    target: {
                        getAttribute: () => {
                            return "supplierContactFirstName";
                        },
                    },
                });

            expect(mockAppend).toHaveBeenCalledWith("sort", "firstName");

            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "th" &&
                        node.text().includes("Last Name")
                    );
                })
                .at(0)
                .simulate("click", {
                    target: {
                        getAttribute: () => {
                            return "supplierContactLastName";
                        },
                    },
                });
            expect(mockAppend).toHaveBeenCalledWith("sort", "lastName");

            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "th" && node.text().includes("Supplier")
                    );
                })
                .at(0)
                .simulate("click", {
                    target: {
                        getAttribute: () => {
                            return "supplierContactSupplierName";
                        },
                    },
                });
            expect(mockAppend).toHaveBeenCalledWith("sort", "supplierName");
        });
    });
});
