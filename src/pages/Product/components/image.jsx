import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Input,
    FormGroup,
    FormFeedback,
} from "reactstrap";
import noImage from "../../../assets/images/no-image_1x1.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
    setProductDetails,
    setProductInvalidImageFile,
} from "../../../store/actions";
import { isValidImageFile, createFileKey } from "../../../helpers/fileUtils";

export default function ProductImage({ editable }) {
    const dispatch = useDispatch();
    const [existingImageCleared, setExistingImageCleared] = useState(false);
    const [newImagePreview, setNewImagePreview] = useState(null);

    const product = useSelector((state) => {
        return state.Product.data;
    });

    const { invalidImageFile } = useSelector((state) => {
        return state.Product;
    });

    useEffect(() => {
        if (!editable) {
            setNewImagePreview(null);
            setExistingImageCleared(false);
        }
    }, [editable]);

    const handleChange = (e) => {
        if (e.target.files.length) {
            const selectedImage = e.target.files[0];
            if (!isValidImageFile(selectedImage)) {
                dispatch(
                    setProductInvalidImageFile({
                        invalidImageFile: true,
                        error: false,
                    })
                );
                clearSelectedImage();
            } else {
                if (invalidImageFile) {
                    dispatch(setProductInvalidImageFile(false));
                }
                //If this is the first image being saved for the product generate a a new file key,
                //otherwise we always use the existing file key to overwrite the old product image.
                const fileKey =
                    product.imageSrc || createFileKey(selectedImage.name);
                dispatch(
                    setProductDetails({
                        imageFile: selectedImage,
                        imageSrc: fileKey,
                    })
                );
                setNewImagePreview(URL.createObjectURL(selectedImage));
                setExistingImageCleared(true);
            }
        }
    };

    function openFileSelector() {
        document.getElementById("upload-input").click();
    }

    function clearSelectedImage() {
        dispatch(
            setProductDetails({
                imageFile: null,
                imageSrc: null,
            })
        );
        setNewImagePreview(null);
        setExistingImageCleared(true);
    }

    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Product Image</h4>
                <img
                    className="border d-block mr-2 mb-2 p-1"
                    style={{
                        objectFit: "contain",
                        width: "200px",
                        height: "200px",
                    }}
                    src={
                        newImagePreview ||
                        (!existingImageCleared &&
                            product?.objectStoreFile?.fileUrl) ||
                        noImage
                    }
                    alt="material"
                    width="200px"
                    height="200px"
                />
                <FormGroup hidden={!editable}>
                    <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        className="waves-effect mr-2"
                        onClick={openFileSelector}
                        disabled={!editable}
                    >
                        Upload
                    </Button>
                    <Button
                        type="button"
                        color="primary"
                        size="sm"
                        className="waves-effect mr-2"
                        onClick={clearSelectedImage}
                        disabled={!editable}
                    >
                        Clear
                    </Button>
                    <Input
                        type="file"
                        id="upload-input"
                        style={{ display: "none" }}
                        accept="image/*"
                        hidden={true}
                        invalid={invalidImageFile}
                        value={!editable || !this ? "" : this}
                        onChange={handleChange}
                    ></Input>
                    <FormFeedback>
                        Select a valid image with size less than 5MB.
                    </FormFeedback>
                </FormGroup>
            </CardBody>
        </Card>
    );
}
