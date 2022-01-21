import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter, useParams } from "react-router-dom";
import { useQuery } from "../../../src/helpers/utils";
import SupplierContact from "../../../src/pages/SupplierContact/index";

const initialState = {
    SupplierContact: {
        data: {
            id: "",
            firstName: "",
            lastName: "",
            supplier: "",
            position: "",
            email: "",
            phoneNumber: "",
            version: null,
        },
        initial: {
            id: "",
            firstName: "",
            lastName: "",
            supplier: "",
            position: "",
            email: "",
            phoneNumber: "",
            version: null,
        },
        invalidFirstName: false,
        invalidLastName: false,
        invalidPosition: false,
        invalidEmail: false,
        invalidPhoneNumber: false,
        invalidCompany: false,
        loading: true,
        error: null,
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
    }),
}));

describe("SupplierContact -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });

        test("history.replace, resetSupplierContactDetails, setBreadcrumbItems should be called on id is new", () => {
            useParams.mockReturnValue({
                id: "new",
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "RESET_SUPPLIER_CONTACT_DETAILS",
                payload: null,
            });
            expect(mockHistory.replace).toHaveBeenCalledWith(
                "/suppliers/contacts/new?edit=true"
            );
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_BREADCRUMB_ITEMS",
                payload: {
                    title: "New Contact",
                    items: [
                        { title: "Main", link: "#" },
                        { title: "Suppliers", link: "#" },
                        { title: "Contacts", link: "#" },
                    ],
                    backButton: false,
                },
            });
        });

        test("Dispatch fetchAllSuppliers on editMode true", () => {
            useQuery.mockReturnValue({
                get: () => {
                    return true;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            const saveButton = wrapper.findWhere((node) => {
                return node.type() === "button" && node.text().includes("Save");
            });
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "FETCH_ALL_SUPPLIERS_REQUEST",
            });
            expect(saveButton.props().hidden).toBeFalsy();
        });

        test("Error Alert should be show on error", () => {
            initialState.SupplierContact.error = true;
            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );

            const alertComponent = wrapper.find("Alert");

            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(alertComponent.props().color).toBe("info");
        });

        test("Error Alert should be show on error", () => {
            initialState.SupplierContact.initial.id = 1;
            initialState.SupplierContact.initial.firstName = "FirstName";
            initialState.SupplierContact.initial.lastName = "LastName";

            const store = mockStore(initialState);

            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_BREADCRUMB_ITEMS",
                payload: {
                    title: "FirstName LastName",
                    items: [
                        { title: "Main", link: "#" },
                        { title: "Suppliers", link: "#" },
                        { title: "Contacts", link: "#" },
                    ],
                    backButton: false,
                },
            });
        });

        test("Dispatch setSupplierContactDetails on Save", () => {
            initialState.SupplierContact.data.id = 1;
            initialState.SupplierContact.initial.id = 2;
            const store = mockStore(initialState);
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );

            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" && node.text().includes("Save")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_SUPPLIER_CONTACT_DETAILS",
                payload: {
                    error: true,
                },
            });
        });

        test("Dispatch saveSupplierContact on Save when contact id is empty", () => {
            initialState.SupplierContact.initial.id = 2;
            initialState.SupplierContact.data = {
                id: null,
                firstName: "FirstName",
                lastName: "LastName",
                supplier: {
                    id: 1,
                },
                position: "",
                email: "email@email.com",
                phoneNumber: "123-456-7890",
                version: null,
            };
            const store = mockStore(initialState);
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );

            // const mockSaveSupplierContact = jest.fn();

            // saveSupplierContact.mockReturnValue(mockSaveSupplierContact);

            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" && node.text().includes("Save")
                    );
                })
                .at(0)
                .simulate("click");
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "ADD_SUPPLIER_CONTACT_REQUEST",
                payload: {
                    supplierId: 1,
                    form: {
                        firstName: "FirstName",
                        lastName: "LastName",
                        position: "",
                        email: "email@email.com",
                        phoneNumber: "123-456-7890",
                    },
                },
            });
        });

        // test("Dispatch editSupplierContact on Save", () => {
        //     const initialState = {
        //         SupplierContact: {
        //             data: {
        //                 id: 1,
        //                 firstName: "FirstName",
        //                 lastName: "LastName",
        //                 supplier: {
        //                     id: 1,
        //                 },
        //                 position: "",
        //                 email: "email@email.com",
        //                 phoneNumber: "123-456-7890",
        //                 version: null,
        //             },
        //             initial: {
        //                 id: 2,
        //                 firstName: "",
        //                 lastName: "",
        //                 supplier: "",
        //                 position: "",
        //                 email: "",
        //                 phoneNumber: "",
        //                 version: null,
        //             },
        //             invalidFirstName: false,
        //             invalidLastName: false,
        //             invalidPosition: false,
        //             invalidEmail: false,
        //             invalidPhoneNumber: false,
        //             invalidCompany: false,
        //             loading: true,
        //             error: null,
        //         },
        //         Suppliers: {
        //             content: [],
        //             all: [],
        //             loading: true,
        //             error: null,
        //             totalItems: 0,
        //             totalPages: 0,
        //             pageIndex: 0,
        //             pageSize: 20,
        //         },
        //     };

        //     const store = mockStore(initialState);
        //     const wrapper = mount(
        //         <Provider store={store}>
        //             <BrowserRouter>
        //                 <SupplierContact />
        //             </BrowserRouter>
        //         </Provider>
        //     );

        //     expect(shallowToJson(wrapper)).toMatchSnapshot();
        //     wrapper
        //         .findWhere((node) => {
        //             return (
        //                 node.type() === "button" && node.text().includes("Save")
        //             );
        //         })
        //         .at(0)
        //         .simulate("click");
        //     expect(mockDispatch).toHaveBeenCalledWith({
        //         type: "EDIT_SUPPLIER_CONTACT_REQUEST",
        //         payload: {
        //             id: 1,
        //             supplierId: 1,
        //             form: {
        //                 firstName: "FirstName",
        //                 lastName: "LastName",
        //                 position: "",
        //                 email: "email@email.com",
        //                 phoneNumber: "123-456-7890",
        //                 version: null,
        //             },
        //         },
        //     });
        // });
    });

    describe("Toobar Component", () => {
        test("History.goBack should get called on cancel click", () => {
            useQuery.mockReturnValue({
                get: () => {
                    return true;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Cancel")
                    );
                })
                .at(0)
                .simulate("click");

            expect(mockHistory.goBack).toHaveBeenCalled();
        });

        test("History.push should get called on Edit Contact click", () => {
            useQuery.mockReturnValue({
                get: () => {
                    return false;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Edit Contact")
                    );
                })
                .at(0)
                .simulate("click");

            expect(mockHistory.push).toHaveBeenCalledWith({
                pathname: "/suppliers/contacts/null",
                search: "?edit=true",
            });
        });

        test("History.push should get called on New Contact click", () => {
            useQuery.mockReturnValue({
                get: () => {
                    return false;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("New Contact")
                    );
                })
                .at(0)
                .simulate("click");

            expect(mockHistory.push).toHaveBeenCalledWith({
                pathname: "/suppliers/contacts/new",
                search: "?edit=true",
            });
        });

        test("History.push should get called on Contacts click", () => {
            useQuery.mockReturnValue({
                get: () => {
                    return false;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierContact />
                    </BrowserRouter>
                </Provider>
            );
            wrapper
                .findWhere((node) => {
                    return (
                        node.type() === "button" &&
                        node.text().includes("Contacts")
                    );
                })
                .at(0)
                .simulate("click");

            expect(mockHistory.push).toHaveBeenCalledWith(
                "/suppliers/contacts"
            );
        });
    });
});
