import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Modal, ModalBody, ModalFooter } from "../Common/modal";
import {
    fetchAllProductCategories,
    createProductCategory,
    setProductDetails,
    resetProductCategory,
} from "../../store/actions";

export default function ProductCategoriesModal({
    show,
    setShow,
    type,
    parentCategoryId,
}) {
    const { error } = useSelector((state) => state.ProductCategory);

    const dispatch = useDispatch();

    function close() {
        setShow(false);
        dispatch(resetProductCategory());
    }

    function onFormSubmit(e, values) {
        dispatch(
            createProductCategory({
                data: {
                    name: values.name,
                },
                categoryId: parentCategoryId,
                success: (category) => {
                    let payload;
                    if (type === "class") {
                        payload = {
                            productClass: category,
                            type: null,
                            style: null,
                        };
                    } else if (type === "type") {
                        payload = {
                            type: category,
                            style: null,
                        };
                    } else {
                        payload = {
                            style: category,
                        };
                    }
                    dispatch(
                        fetchAllProductCategories({
                            success: () => {
                                dispatch(setProductDetails(payload));
                                close();
                            },
                        })
                    );
                },
            })
        );
    }

    function formatTitle(type) {
        switch (type) {
            case "class":
                return "Product Class";
            case "type":
                return "Product Type";
            case "style":
                return "Product Style";
            default:
                break;
        }
    }

    return (
        <Modal
            size="sm"
            show={show}
            onValidSubmit={onFormSubmit}
            close={close}
            title={formatTitle(type)}
            onError={error}
        >
            <ModalBody>
                <AvForm
                    id={`product-${type}-modal-form`}
                    onValidSubmit={onFormSubmit}
                >
                    <AvField
                        name="name"
                        type="text"
                        label="Category Title"
                        errorMessage={`Enter a valid title.`}
                        validate={{ required: { value: true } }}
                    />
                </AvForm>
                {error && (
                    <Alert color="info" className="mt-2 mb-4">
                        <strong>Oh snap!</strong> Change a few things up and try
                        submitting again.
                    </Alert>
                )}
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    type="submit"
                    form={`product-${type}-modal-form`}
                >
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
}
