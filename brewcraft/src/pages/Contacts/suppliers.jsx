import React, { useEffect, useState, useCallback } from "react";
import { get, pick } from "lodash";
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
  fetchSupplier,
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../../store/Suppliers/actions";
import {
  fetchCompanies
} from "../../store/Companies/actions";
import AddCompany from "./components/company-modal";
import ContactModal from "./components/contact-modal";
import ContactsTable from "./components/contacts-table";

export default function Suppliers() {
  const [isOpenCompanyDialog, setIsOpenCompanyDialog] = useState(false);
  const [isOpenSupplierDialog, setIsOpenSupplierDialog] = useState(false);
  const [supplier, setSupplier] = useState(null);
  const { suppliers } = useSelector(
    (state) => {
      return state.Suppliers
    }
  );
  const { companies } = useSelector(
    (state) => {
      return state.Companies
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Suppliers", [
        { title: "Contacts", link: "#" },
        { title: "Suppliers", link: "#" }
      ])
    );
    dispatch(
      fetchSuppliers()
    );
  }, []);

  const onNewSupplier = () => {
    setSupplier(null);
    dispatch(fetchCompanies());
    setIsOpenSupplierDialog(true);
  };

  const onEditSupplier = (supplierId) => {
    if (!isOpenSupplierDialog) {
      dispatch(
        fetchSupplier({
          id: supplierId,
          success: (data) => {
              setSupplier(data);
              setIsOpenSupplierDialog(true);
          }
        }),
      )
      dispatch(fetchCompanies());
    }
  };

  const onDeleteSupplier = (supplierId) => {
    dispatch(
      deleteSupplier({
        id: supplierId,
        success: () => {
          dispatch(
            fetchSuppliers()
          );
          // print snack
        }
      })
    );
  };

  const onSupplierDialogClose = (isSave, data) => {
    if (isSave) {
      if (supplier) {
        // update supplier
        dispatch(
          updateSupplier({
            ...supplier,
            ...data,
            success: () => {
              dispatch(fetchSuppliers());
              setIsOpenSupplierDialog(false);
            }
          }));
      } else {
        // create supplier
        dispatch(
          createSupplier({
            ...data,
            success: () => {
              dispatch(fetchSuppliers());
              setIsOpenSupplierDialog(false);
            }
          }));
      }
    } else {
      setIsOpenSupplierDialog(false);
    }
  }

  const onCompanyDialogClose = (companyId) => {
    // TODO
    setIsOpenCompanyDialog(false);
  };

  const companySubmit = (event, formData) => {
    // TODO
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
    // dispatch(addVendor({ form: formCompose, successFn: onCompanyDialogClose }));
  };

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
                data={suppliers}
                editContact={onEditSupplier}
                deleteContact={onDeleteSupplier}
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
          close={onSupplierDialogClose}
          title={!!supplier ? "Edit Supplier" : "New Supplier"}
        >
          <ContactModal
            contact={supplier}
            companies={companies}
            close={onSupplierDialogClose}
            companiesDialog={() => setIsOpenCompanyDialog(true)}
          />
        </Modal>
      )}
      {!!isOpenCompanyDialog && (
        <Modal
          show={isOpenCompanyDialog}
          close={onCompanyDialogClose}
          title="Add Company"
          data={companies}
        >
          <AddCompany
            companySubmit={companySubmit}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}
