import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import SupplierDetails from "../../../../src/pages/Supplier/components/details";

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

const mockHistory = ({
    replace: jest.fn(),
    goBack: mockGoBack,
    push: mockPush
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
    useHistory: () => mockHistory.mockReturnValue({
        goBack: () => mockGoBack
    })
}))

jest.mock("react-router", ()=> ({
    ...jest.requireActual("react-router"),
    useHistory: () => mockHistory
}))

describe("Supplier -> Components -> <Details>", () => {
    describe("render()", () => {
        test("renders the Details component", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={false}
                        />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
        });
        test("Dispatch supplierName is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierName"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
        test("Dispatch supplierAddressLine1 is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierAddressLine1"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
        test("Dispatch supplierAddressLine2 is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierAddressLine2"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
        test("Dispatch supplierAddressCity is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierAddressCity"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
        test("Dispatch supplierAddressProvince is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierAddressProvince"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
        test("Dispatch supplierAddressPostalCode is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierAddressPostalCode"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
        test("Dispatch supplierAddressCountry is getting on input change", () => {
            const supplierDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <SupplierDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            supplierDetailsComp.find('input[name="supplierAddressCountry"]').simulate("change");

            expect(shallowToJson(supplierDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload":  {
                     "data":  {
                       "address":  {
                         "addressLine1": "",
                         "addressLine2": "",
                         "city": "",
                         "country": "",
                         "id": "",
                         "postalCode": "",
                         "province": "",
                       },
                       "id": "",
                       "name": "",
                       "version": null,
                     },
                     "invalidName": true,
                   },
                   "type": "SET_SUPPLIER_DETAILS"
             });
        });
    });
});
