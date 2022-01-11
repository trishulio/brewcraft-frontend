import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import MaterialCategoryDetails from "../../../../src/pages/MaterialCategory/components/details";

const initialState = {
    MaterialCategory: {
        data: {
            id: null,
            name: "dummy",
            parentCategoryId: null,
            version: null,
        },
        initial: {
            id: null,
            name: "",
            parentCategoryId: null,
            version: null,
        },
        invalidName: false,
        invalidParentCategory: false,
        loading: true,
        error: null
    },
    MaterialCategories: {
        content: [],
        all: [{
            id:2,
            parentCategoryId:null,
        }],
        loading: false,
        error: null,
        totalElements: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20
    }
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
}));

jest.mock("react-router", ()=> ({
    ...jest.requireActual("react-router"),
    useHistory: () => mockHistory
}));

describe("MaterialCategory -> Components -> <Details>", () => {
    describe("render()", () => {
        test("renders the Details component", () => {
            const MaterialCategoryDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategoryDetails
                            editable={false}
                            changed={false}
                            onSave={jest.fn()}
                        />
                    </BrowserRouter>
                </Provider>
            );
            expect(shallowToJson(MaterialCategoryDetailsComp)).toMatchSnapshot();
        });

        test("Dispatch materialCategoryName is getting on input change", () => {
            const MaterialCategoryDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategoryDetails
                            editable={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            MaterialCategoryDetailsComp.find('input[name="materialCategoryName"]').simulate("change",  { target: { value: 'test@example.com', name: 'materialCategoryName' } });

            expect(shallowToJson(MaterialCategoryDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
               "payload": {"invalidName": false},
               "type": "INVALID_MATERIAL_CATEGORY_NAME"
             });
            expect(mockDispatch).toHaveBeenCalledWith({
                   "payload": {
                     "data": {
                       "id": null,
                       "name": "test@example.com",
                       "parentCategoryId": null,
                       "version": null,
                     },
                   },
                   "type": "SET_MATERIAL_CATEGORY_DETAILS",
            });

        });

        test("Dispatch materialCategoryParentCategory is getting on input change", () => {
            const MaterialCategoryDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategoryDetails
                            editable={true}
                            changed={true}
                            onSave={jest.fn()}
                        />
                    </BrowserRouter>
                </Provider>
            );

            MaterialCategoryDetailsComp.find('Input[name="materialCategoryParentCategory"]').simulate("change",  { target: { value: '1', name: 'materialCategoryParentCategory' } });

            expect(shallowToJson(MaterialCategoryDetailsComp)).toMatchSnapshot();
            expect(mockDispatch).toHaveBeenCalledWith({
                "payload": { "invalidParentCategory": false },
                "type": "INVALID_MATERIAL_CATEGORY_PARENT_CATEGORY"
            });
        });

        test("Dispatch nothing on input change", () => {
            const MaterialCategoryDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategoryDetails
                            editable={true}
                            changed={true}
                            onSave={jest.fn()}
                        />
                    </BrowserRouter>
                </Provider>
            );

            MaterialCategoryDetailsComp.find('Input[name="materialCategoryParentCategory"]').simulate("change",  { target: { value: '1', name: 'dummy' } });

            expect(shallowToJson(MaterialCategoryDetailsComp)).toMatchSnapshot();
        });

        test("Dispatch materialCategoryName is getting on key up", () => {
            const MaterialCategoryDetailsComp = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <MaterialCategoryDetails
                            editable={true}
                            changed={true}
                        />
                    </BrowserRouter>
                </Provider>
            );

            MaterialCategoryDetailsComp.find('input[name="materialCategoryName"]').simulate("keyup");

            expect(shallowToJson(MaterialCategoryDetailsComp)).toMatchSnapshot();
        });
    });
});
