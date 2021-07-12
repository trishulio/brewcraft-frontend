import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button
} from "reactstrap";
import { AvField } from "availity-reactstrap-validation";
import { Modal } from "../Common/modal";
import {
    fetchAllProductCategories,
    createProductCategory,
    setProductDetails
} from "../../store/actions"


export default function ProductCategoriesModal({ show, setShow, type, parentCategoryId }) {
    const dispatch = useDispatch();

    const categories = useSelector(state => {
        return state.ProductCategories.data;
    });

    function close() {
        setShow(false);
    }

    function onFormSubmit(e, values) {
        dispatch(
            createProductCategory({
                data: {
                    name: values.name
                },
                categoryId: parentCategoryId,
                success: (category) => {
                    let payload;
                    if (type === "class") {
                        payload = {
                            productClass: category,
                            type: null,
                            style: null
                        };
                    } else if (type === "type") {
                        payload = {
                            type: category,
                            style: null
                        };
                    } else {
                        payload = {
                            style: category
                        };
                    }
                    dispatch(fetchAllProductCategories({
                        success: () => {
                            dispatch(setProductDetails(payload));
                            close();
                        }
                    }));
                }
            })
        );
    }

    return (
        <Modal
            size="sm"
            show={show}
            onValidSubmit={onFormSubmit}
            close={close}
            title={
                type === "type" && "Product Type"
                || type === "style" && "Product Style"
                || type === "class" && "Product Class"
            }
            footer={(
                <Button color="primary" type="submit">Save</Button>
            )}
        >
            <AvField
                name="name"
                type="text"
                label="Category Title"
                errorMessage={`Enter a valid title.`}
                validate={{ required: { value: true } }}
            />
        </Modal>
    );
};