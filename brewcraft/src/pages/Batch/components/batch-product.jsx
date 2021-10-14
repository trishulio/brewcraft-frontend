import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    FormFeedback
} from "reactstrap";
import fantasticLager from "../../../assets/images/products/fantastic-lager.jpg";
import {
    setBatchDetails,
    setBatchInvalidParentBrew,
    setBatchInvalidProduct
} from "../../../store/actions";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";

export default function BatchProduct(props) {

    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const { invalidProduct } = useSelector(state => {
        return state.Batch.details;
    });

    const products = useSelector(state => {
        return state.Products.all;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "batchParentBrew":
                if (batch.parentBrew?.id !== e.target.value) {
                    dispatch(setBatchInvalidParentBrew(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            parentBrew: { id: e.target.value }
                        }
                    }));
                }
                break;
            case "batchProduct":
                if (batch.product?.id !== e.target.value) {
                    dispatch(setBatchInvalidProduct(!e.target.value));
                    dispatch(setBatchDetails({
                        data: {
                            ...batch,
                            product: { id: e.target.value }
                        }
                    }));
                }
                break;
            default:
                break;
        }
    }

    return (
        <img style={{ maxWidth: "14rem" }} src={fantasticLager} alt="material" className="border d-block mr-2 mb-4 p-1" />
        // <React.Fragment>
        //     <img style={{ maxWidth: "14rem" }} src={fantasticLager} alt="material" className="border d-block mr-2 mb-2 p-1" />
        //     <FormGroup
        //         hidden={!props.editable}
        //     >
        //         <Input
        //             type="select"
        //             className="waves-effect"
        //             // bsSize="sm"
        //             name="batchProduct"
        //             style={{ width: "16rem" }}
        //             disabled={!props.editable}
        //             invalid={invalidProduct}
        //             value={batch.product?.id || ""}
        //             onChange={e => {
        //                 onFormInputChange(e);
        //             }}
        //         >
        //             <option value="">Select</option>
        //             {
        //                 map(products, (value, index) => (
        //                     <option value={value.id} key={index}>
        //                         {value.name}
        //                     </option>
        //                 ))
        //             }
        //         </Input>
        //         <FormFeedback>Enter a valid batch product.</FormFeedback>
        //     </FormGroup>
        //     <div hidden={props.editable}>
        //         {batch.product ? batch.product.name : "-"}
        //     </div>
        // </React.Fragment>
        // <Card>
        //     <CardHeader>
        //         Batch Product
        //     </CardHeader>
        //     <CardBody>
        //     <img style={{ maxWidth: "14rem" }} src={fantasticLager} alt="material" className="border d-block mr-2 mb-2 p-1" />
        //         {/* <Row>
        //             <Col xs="2">
        //                 <Label
        //                     for="batchParentBrew"
        //                     className="mb-3"
        //                 >
        //                     Parent
        //                 </Label>
        //             </Col>
        //             <Col xs="8">
        //                 <div hidden={false}>
        //                     {batch.parentBrew ? batch.parentBrew.name : "-"}
        //                 </div>
        //             </Col>
        //         </Row> */}
        //                 <FormGroup
        //                     hidden={!props.editable}
        //                 >
        //                     <Input
        //                         type="select"
        //                         className="waves-effect"
        //                         // bsSize="sm"
        //                         name="batchProduct"
        //                         style={{ width: "16rem" }}
        //                         disabled={!props.editable}
        //                         invalid={invalidProduct}
        //                         value={batch.product?.id || ""}
        //                         onChange={e => {
        //                             onFormInputChange(e);
        //                         }}
        //                     >
        //                         <option value="">Select</option>
        //                         {
        //                             map(products, (value, index) => (
        //                                 <option value={value.id} key={index}>
        //                                     {value.name}
        //                                 </option>
        //                             ))
        //                         }
        //                     </Input>
        //                     <FormFeedback>Enter a valid batch product.</FormFeedback>
        //                 </FormGroup>
        //                 <div hidden={props.editable}>
        //                     {batch.product ? batch.product.name : "-"}
        //                 </div>
        //     </CardBody>
        // </Card>
    );
}