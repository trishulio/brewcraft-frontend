import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import {
  fetchContacts,
  fetchContact,
  saveContact,
  editContact,
  deleteContact
} from "../../store/Customers/actions";
import { Modal } from "../../component/Common/modal";
import CustomersTable from "./components/customers-table";
import ContactModal from "./components/Contact";

export default function Customers() {
  const [isOpenCustomerDialog, setIsOpenCustomerDialog] = useState(false);
  const [customer, setCustomer] = useState(null);
  const customers = useSelector(
    (state) => {
      console.log(state.Customers);
      return state.Customers;
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Customers", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Customers", link: "#" },
      ])
    );
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddCustomer = () => {
    setCustomer(null);
    setIsOpenCustomerDialog(true);
  };

  const onEditCustomer = (customerId) => {
    dispatch(
      fetchContact({
        id: customerId,
        success: (data) => {
          setCustomer(data);
          setIsOpenCustomerDialog(true);
        }
      }));
  };

  const onDeleteCustomer = (customerId) => {
    dispatch(
      deleteContact({
        id: customerId,
        success: () => {
          dispatch(fetchContacts());
        }
      })
    );
  };

  const onRefreshCustomerTable=()=>{
    dispatch(
      fetchContacts()
    );
  }
  const onCustomerDialogClose = (isSave, data) => {
    if (isSave) {
      if (customer) {
        // update Customer
        dispatch(
          editContact({
            ...customer,
            ...data,
            success: () => {
              dispatch(fetchContacts());
              setIsOpenCustomerDialog(false);
            }
          }));
      } else {
        // create Customer
        dispatch(
          saveContact({
            ...data,
            success: () => {
              dispatch(fetchContacts());
              setIsOpenCustomerDialog(false);
            }
          }));
      }
    } else {
      setIsOpenCustomerDialog(false);
    }
  };

  // if form is invalid
  const handleInvalidSubmit = (event, values) => {
    // console.log(event, values);
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <CustomersTable
              data={customers?.data}
              editCustomer={onEditCustomer}
              deleteCustomer={onDeleteCustomer}
              addCustomer={onAddCustomer}
              refreshTable={onRefreshCustomerTable}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {isOpenCustomerDialog && (
        <Modal
        show={isOpenCustomerDialog}
        close={onCustomerDialogClose}
        title={customer ? "Edit Customer" : "Add Customer"}
        size="lg"
        >
        <ContactModal
          submit={onCustomerDialogClose}
          invalid={handleInvalidSubmit}
          forstatus={customers?.formLoading}
          customer={customer}
        />
        </Modal>
      )}
    </React.Fragment>
  );
}
