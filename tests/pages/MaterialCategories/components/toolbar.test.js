import React from "react";
import { mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import Toolbar from "../../../../src/pages/MaterialCategory/components/toolbar";

const initialState = {
    MaterialCategory: {
        data: {
            id: null,
            name: "",
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
        error: null,
        all: [],
    },
    MaterialCategories: {
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

describe("MaterialCategory -> Components -> <Toolbar>", () => {
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
            toolBarComponent
                .find({ children: "Cancel" })
                .at(1)
                .simulate("click");
            expect(mockGoBack).toHaveBeenCalled();
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
        test("History.push button should be called on Edit Category", () => {
            initialState.MaterialCategory.data.id = 1;
            initialState.MaterialCategory.data.parentCategory = true;
            const store = mockStore(initialState);
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={false} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent
                .find({ children: "Edit Category" })
                .at(1)
                .simulate("click");
            expect(mockPush).toHaveBeenCalledWith({
                pathname: "/materials/categories/1",
                search: "?edit=true",
            });
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
        test("History.push button should be called on New Category", () => {
            initialState.MaterialCategory.data.id = 1;
            const store = mockStore(initialState);
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={false} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent
                .find({ children: "New Category" })
                .at(1)
                .simulate("click");
            expect(mockPush).toHaveBeenCalledWith({
                pathname: "/materials/categories/new",
                search: "?edit=true",
            });
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
        test("History.push button should be called on Material Categories", () => {
            initialState.MaterialCategory.data.id = 1;
            const store = mockStore(initialState);
            const toolBarComponent = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <Toolbar editable={false} />
                    </BrowserRouter>
                </Provider>
            );
            toolBarComponent
                .find({ children: "Material Categories" })
                .at(1)
                .simulate("click");
            expect(mockPush).toHaveBeenCalledWith("/materials/categories");
            expect(shallowToJson(toolBarComponent)).toMatchSnapshot();
        });
    });
});
