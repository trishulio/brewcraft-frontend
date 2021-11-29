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
import { fetchAllMaterialCategories, saveMaterialCategory } from "../../store/actions";

export default function MaterialCategoriesModal({ show, setShow, type, parentCategoryId }) {
    const dispatch = useDispatch();

    function close() {
        setShow(false);
    }

    function onFormSubmit(e, values) {
        dispatch(
            saveMaterialCategory({
                form: {
                    name: values.name.trim(),
                    parentCategoryId: parentCategoryId
                },
                success: () => {
                    dispatch(fetchAllMaterialCategories());
                    close();
                }
            }),
        );
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
                <AvForm id="material-categories-modal-form" onValidSubmit={onFormSubmit}>
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
                <Button color="primary" type="submit" form="material-categories-modal-form">Save</Button>
            </ModalFooter>
        </Modal>
    );
};