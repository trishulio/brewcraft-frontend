import React, { useEffect, useState, useCallback } from "react";
import { get, map, pick, reduce, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
   } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import {
  fetchVendor,
  addVendor,
  editVendor,
  deleteVendor,
  addVendorContact,
  editVendorContact,
  deleteVendorContact,
} from "../../store/Vendor/actions";
import AddCompany from "./components/company-modal";
import ContactModal from "./components/contact-modal";
import ContactsTable from "./components/contacts-table";

export default function Suppliers() {
  const [isOpenCompanyDialog, setIsOpenCompanyDialog] = useState(false);
  const [isOpenSupplierDialog, setIsOpenSupplierDialog] = useState(false);
  const [supplier, setSupplier] = useState(null);

  const dispatch = useDispatch();
  // dispatch action
  const {
    data,
    loading: loading1,
    error: error1,
    suppliers,
  } = useSelector((state) => {
    const { data, loading, error } = state.Vendor;
    const supplierInner = reduce(
      get(data, "suppliers"),
      (old, current) => {
        return old.concat( map(get(current, "contacts"), (value) => {
          set(value, "cName", get(current, "name"));
          set(value, "cId", get(current, "id"));
          return value;
        }))
      },
      []
    );
    return { data, loading, error, suppliers: supplierInner };
  });

  // // something wrong first time
  // if (error1) {
  //   return <div>Error</div>;
  // }
  // // unconditional error occur
  // if (!data1) {
  //   return null;
  // }

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Suppliers", [
        { title: "Contacts", link: "#" },
        { title: "Suppliers", link: "#" }
      ])
    );
    setSupplier(null);
  }, []);

  const companyOptionsList = useCallback(
    () =>
      map(get(data, "suppliers"), (value, index) => (
        <option value={value.id} key={index}>
          {value.name}
        </option>
      )),
    [data]
  );

  const onNewSupplier = () => {
    setSupplier(null);
    setIsOpenSupplierDialog(true);
  }

  const onEditSupplier = (supplierId) => {
    if (!isOpenSupplierDialog) {
      dispatch(
        fetchVendor({
          id: supplierId,
          successFn: supplier => {
            if (!supplier) {
              // print snack
              setSupplier(null);
            } {
              setSupplier(supplier);
              setIsOpenSupplierDialog(!isOpenSupplierDialog);
            }
          },
        })
      )
    }
  }

  const onSupplierDialogClose = (isSave, supplier) => {
    debugger;
    if (isSave) {
      dispatch(
        addVendorContact({
          form: { ...supplier, position: "" },
          successFn: () => {
            suppliers = reduce(
              get(data, "suppliers"),
              (old, current) => {
                return old.concat( map(get(current, "contacts"), (value) => {
                  set(value, "cName", get(current, "name"));
                  set(value, "cId", get(current, "id"));
                  return value;
                }))
              },
              []
            );
            setIsOpenSupplierDialog(false);
          }
        })
      )
    } else {
      setSupplier(null);
      setIsOpenSupplierDialog(!isOpenSupplierDialog);
    }
  }

  const onCompanyDialogClose = (companyId) => {
    if (companyId) {
      _saveCompany(companyId).then(() => {
        // update companies state
        setIsOpenCompanyDialog(false);
      })
      .catch(error => {
        // shake
        // print snackbar
      });
    }
    setIsOpenCompanyDialog(false);
  };

  const _saveSupplier = (supplier) => {
    return Promise.resolve();
  };

  const _saveCompany = (company) => {
    return Promise.resolve();
  };

  const companySubmit = (event, formData) => {
    const formCompose = {
      contacts: [],
      name: get(formData, "firstName"),
      address: pick(formData, [
        "addressLine1",
        "addressLine2",
        "country",
        "province",
        "city",
        "postalCode",
      ]),
    };
    dispatch(addVendor({ form: formCompose, successFn: onCompanyDialogClose }));
  };

  const createContact = (event, formData) =>
    dispatch(
      addVendorContact({
        form: { ...formData, position: "" },
        successFn: onSupplierDialogClose,
      })
    );

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              Suppliers Table
            </CardHeader>
            <CardBody>
              <ContactsTable
                suppliers={suppliers}
                editContact={onEditSupplier}
              />
            </CardBody>
            <CardFooter>
              <Row>
                <Col xs="12">
                  <div className="float-left mt-1">
                      <Button color="secondary" className="waves-effect" onClick={onNewSupplier}>New Supplier</Button>
                  </div>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {!!isOpenSupplierDialog && (
        <Modal
          show={isOpenSupplierDialog}
          handlerClose={onSupplierDialogClose}
          title={!!supplier ? "Edit Supplier" : "New Supplier"}
        >
          <ContactModal
            contact={supplier}
            close={onSupplierDialogClose}
            optionsList={companyOptionsList()}
          />
        </Modal>
      )}
      {!!isOpenCompanyDialog && (
        <Modal
          show={isOpenCompanyDialog}
          handlerClose={onCompanyDialogClose}
          title="Add Company"
          data={this.state}
        >
          <AddCompany
            companySubmit={companySubmit}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}
