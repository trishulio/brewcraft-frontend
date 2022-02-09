import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { BrowserRouter, useParams } from "react-router-dom";
import { Provider } from "react-redux";
import PurchaseInvoice from "../../../src/pages/PurchaseInvoice";
import { useQuery } from "../../../src/helpers/utils";

const initialState = {
    Procurement: {
        data: {
            purchaseOrder: {
                orderNumber: "",
                supplier: "",
            },
            invoice: {
                id: "",
                invoiceNumber: "",
                description: "",
                freight: {
                    amount: {
                        currency: "",
                        amount: 0,
                    },
                },
                generatedOn: "",
                receivedOn: "",
                paymentDueDate: "",
                invoiceStatus: null,
                version: null,
            },
            shipment: {
                id: "",
                shipmentNumber: "",
                description: "",
                shipmentStatus: "",
                deliveryDueDate: "",
                deliveredDate: "",
                version: null,
            },
            procurementItems: [
                {
                    invoiceItem: {
                        id: "",
                        description: "",
                        quantity: {
                            symbol: "",
                            value: 0,
                        },
                        price: {
                            currency: "",
                            amount: 0,
                        },
                        tax: {
                            amount: {
                                currency: "",
                                amount: 0,
                            },
                        },
                        material: "",
                        version: null,
                    },
                    materialLot: {
                        id: "",
                        lotNumber: "",
                        // storage: undefined,
                        quantity: {
                            symbol: "",
                            value: 0,
                        },
                        version: null,
                    },
                },
            ],
        },
        initial: {
            purchaseOrder: {
                orderNumber: "",
                supplier: "",
            },
            invoice: {
                id: "",
                invoiceNumber: "",
                description: "",
                freight: {
                    amount: {
                        currency: "",
                        amount: 0,
                    },
                },
                generatedOn: "",
                receivedOn: "",
                paymentDueDate: "",
                invoiceStatus: null,
                version: null,
            },
            shipment: {
                id: "",
                shipmentNumber: "",
                description: "",
                shipmentStatus: "",
                deliveryDueDate: "",
                deliveredDate: "",
                version: null,
            },
            procurementItems: [
                {
                    invoiceItem: {
                        id: "",
                        description: "",
                        quantity: {
                            symbol: "",
                            value: 0,
                        },
                        price: {
                            currency: "",
                            amount: 0,
                        },
                        tax: {
                            amount: {
                                currency: "",
                                amount: 0,
                            },
                        },
                        material: "",
                        version: null,
                    },
                    materialLot: {
                        id: "",
                        lotNumber: "",
                        // storage: undefined,
                        quantity: {
                            symbol: "",
                            value: 0,
                        },
                        version: null,
                    },
                },
            ],
        },
        invalidName: false,
        invalidInvoiceNumber: false,
        invalidPurchaseOrderId: false,
        invalidDescription: false,
        invalidFreight: false,
        invalidGeneratedOn: false,
        invalidReceivedOn: false,
        invalidPaymentDueDate: false,
        invalidStatusId: false,
        invalidItems: false,
        loading: true,
        error: null,
    },
    Ingredients: {
        content: [],
        all: [],
        loading: false,
        error: null,
        totalElements: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20,
    },
    Packaging: {
        content: [],
        all: [],
        loading: false,
        error: null,
        totalElements: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20,
    },
    Suppliers: {
        content: [],
        all: [],
        loading: false,
        error: null,
        totalItems: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20,
    },
    Materials: {
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
    push: jest.fn(),
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
describe("PurchaseInvoice -> <Index>", () => {
    describe("render()", () => {
        test("renders the component", () => {
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <PurchaseInvoice />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        });
        test("should call history.replace when params shipmentId is not empty, invoiceId is empty", () => {
            useParams.mockReturnValueOnce({
                shipmentId: "shipmentId",
                invoiceId: "",
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <PurchaseInvoice />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockHistory.replace).toHaveBeenCalledWith(
                "/purchases/invoices/new?edit=true"
            );
        });
        test("should dispatch action fetchProcuementByShipmentIdAndInvoiceId when params shipmentId & invoiceId is not empty, editMode = true", () => {
            useParams.mockReturnValueOnce({
                shipmentId: "shipmentId",
                invoiceId: "invoiceId",
            });
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <PurchaseInvoice />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "FETCH_PROCUREMENT_BY_SHIPMENT_ID_AND_INVOICE_ID",
                payload: { shipmentId: "shipmentId", invoiceId: "invoiceId" },
            });
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "FETCH_ALL_MATERIAL_CATEGORIES_REQUEST",
            });
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "FETCH_ALL_SUPPLIERS_REQUEST",
            });
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "FETCH_ALL_MATERIALS_REQUEST",
            });
        });
        test("should dispatch action setBreadcrumbItems correctly when invoice.id is truthy", () => {
            initialState.Procurement.data.invoice.id = "id";
            initialState.Procurement.data.invoice.invoiceNumber = "1";

            const store = mockStore(initialState);
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <PurchaseInvoice />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenNthCalledWith(14, {
                type: "SET_BREADCRUMB_ITEMS",
                payload: {
                    title: "Invoice: 1",
                    items: [
                        { link: "#", title: "Main" },
                        { link: "#", title: "Purchases" },
                    ],
                    backButton: false,
                },
            });
        });
        test("should call action _savePurchaseOrder & _saveProcurement when click button Save after change data", () => {
            initialState.Procurement.data.invoice.invoiceStatus = {};
            initialState.Procurement.data.purchaseOrder = {
                id: "1",
                supplier: "name",
            };
            const store = mockStore(initialState);

            useParams.mockReturnValueOnce({
                shipmentId: "shipmentId",
                invoiceId: "invoiceId",
            });
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <PurchaseInvoice />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(22, {
                type: "UPDATE_PURCHASE_ORDER",
                payload: {
                    id: "1",
                    orderNumber: undefined,
                    supplierId: undefined,
                    version: undefined,
                },
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(23, {
                type: "UPDATE_PROCUREMENT",
                payload: {
                    invoice: {
                        id: "id",
                        invoiceNumber: "1",
                        description: "",
                        freight: {
                            amount: {
                                currency: "CAD",
                                amount: 0,
                            },
                        },
                        generatedOn: "T00:00:00.001Z",
                        receivedOn: "T00:00:00.001Z",
                        paymentDueDate: "T00:00:00.001Z",
                        invoiceStatusId: undefined,
                        version: null,
                    },
                    purchaseOrder: {
                        id: "1",
                        supplier: "name",
                    },
                    shipment: {
                        id: undefined,
                        shipmentNumber: "",
                        description: "",
                        shipmentStatusId: undefined, // delivered
                        deliveryDueDate: "",
                        deliveredDate: "",
                        version: undefined,
                    },
                    procurementItems: [
                        {
                            invoiceItem: {
                                id: undefined,
                                description: "",
                                quantity: {
                                    symbol: undefined,
                                    value: 0,
                                },
                                price: {
                                    currency: "CAD",
                                    amount: 0,
                                },
                                tax: {
                                    amount: {
                                        currency: "CAD",
                                        amount: "0",
                                    },
                                },
                                materialId: undefined,
                                version: undefined,
                            },
                            materialLot: {
                                id: "",
                                lotNumber: "",
                                storageId: undefined,
                                quantity: {
                                    symbol: undefined,
                                    value: 0,
                                },
                                version: undefined,
                            },
                        },
                    ],
                },
            });
        });
        test("should call action _savePurchaseOrder & _saveProcurement when click button Save after change data, dispatch action createProcurement when invoice does not have id", () => {
            initialState.Procurement.data.invoice.invoiceStatus = {};
            initialState.Procurement.data.invoice.id = undefined;
            initialState.Procurement.data.purchaseOrder = {
                id: "1",
                supplier: "name",
            };
            initialState.Procurement.data.shipment = {
                id: "id",
            };
            initialState.Procurement.data.procurementItems = [
                {
                    invoiceItem: {
                        id: "id",
                        quantity: {},
                        price: {
                            amount: 0,
                        },
                        tax: {
                            amount: {
                                amount: 0,
                            },
                        },
                        material: {},
                    },
                    materialLot: {
                        id: "id",
                    },
                },
            ];
            const store = mockStore(initialState);

            useParams.mockReturnValueOnce({
                shipmentId: "shipmentId",
                invoiceId: "invoiceId",
            });
            useQuery.mockReturnValueOnce({
                get: () => {
                    return true;
                },
            });
            const wrapper = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <PurchaseInvoice />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(wrapper)).toMatchSnapshot();
            wrapper.find({ children: "Save" }).at(1).simulate("click");
            expect(mockDispatch).toHaveBeenNthCalledWith(31, {
                type: "UPDATE_PURCHASE_ORDER",
                payload: {
                    id: "1",
                    orderNumber: undefined,
                    supplierId: undefined,
                    version: undefined,
                },
            });
            expect(mockDispatch).toHaveBeenNthCalledWith(32, {
                type: "CREATE_PROCUREMENT",
                payload: {
                    invoice: {
                        id: undefined,
                        invoiceNumber: "1",
                        description: "",
                        freight: {
                            amount: {
                                currency: "CAD",
                                amount: 0,
                            },
                        },
                        generatedOn: "T00:00:00.001Z",
                        receivedOn: "T00:00:00.001Z",
                        paymentDueDate: "T00:00:00.001Z",
                        invoiceStatusId: undefined,
                        version: undefined,
                    },
                    purchaseOrder: {
                        id: "1",
                        supplier: "name",
                    },
                    shipment: {
                        id: "id",
                        deliveredDate: undefined,
                        deliveryDueDate: undefined,
                        description: undefined,
                        shipmentNumber: undefined,
                        shipmentStatusId: undefined,
                        version: undefined,
                    },
                    procurementItems: [
                        {
                            invoiceItem: {
                                id: "id",
                                description: undefined,
                                quantity: {
                                    value: NaN,
                                },
                                price: {
                                    currency: "CAD",
                                    amount: 0,
                                },
                                tax: {
                                    amount: {
                                        currency: "CAD",
                                        amount: "0",
                                    },
                                },
                                materialId: undefined,
                                version: undefined,
                            },
                            materialLot: {
                                id: "id",
                                quantity: {
                                    value: NaN,
                                    symbol: undefined,
                                },
                                version: undefined,
                                lotNumber: undefined,
                                storageId: undefined,
                            },
                        },
                    ],
                },
            });
        });
    });
});
