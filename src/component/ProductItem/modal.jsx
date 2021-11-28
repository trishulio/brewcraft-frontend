import React from "react";
import { useDispatch } from "react-redux";
import {
    Button
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
    Modal,
    ModalBody,
    ModalFooter
} from "../Common/modal";
// import {
//     // fetchAllProductCategories,
//     // createProductCategory,
//     // setProductDetails
// } from "../../store/actions"

export default function PackageCategoriesModal({ show, setShow, type, parentCategoryId }) {
    const dispatch = useDispatch();

    function close() {
        setShow(false);
    }

    function onFormSubmit(e, values) {
        // TO DO API Integration
        console.log("Submit form", values)
    }

    function formatTitle(type) {
        switch(type) {
            case "category":
                return "Packaging Category";
            default:
                break
        }
    }

    return (
        <Modal
            size="sm"
            show={show}
            onValidSubmit={onFormSubmit}
            close={close}
            title={formatTitle(type)}
        >
            <ModalBody>
                <AvForm onValidSubmit={onFormSubmit}>
                    <AvField
                        name="name"
                        type="text"
                        label="Category Title"
                        errorMessage={`Enter a valid title.`}
                        validate={{ required: { value: true } }}
                    />
                </AvForm>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit">Save</Button>
            </ModalFooter>
        </Modal>
    );
};