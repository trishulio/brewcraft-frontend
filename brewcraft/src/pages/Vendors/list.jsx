import { get, map, pick, reduce, set } from "lodash";
import React, { useEffect, Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
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
import AddContact from "./components/contact-modal";
import VendorListTable from "./components/vendor-list-table";

export default function VendorList() {
  const [isCompanyDialog, setIsCompanyDialog] = useState(false);
  const [isContactDialog, setIsContactDialog] = useState(false);
  const [contactUpdate, setContactUpdate] = useState();
  const [companyUpdate, setCompanyUpdate] = useState();
  const dispatch = useDispatch();
  // dispatch action
  const {
    data: data1,
    loading: loading1,
    error: error1,
    supplier,
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
    return { data, loading, error, supplier: supplierInner };
  });

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Vendors", [
        { title: "List all vendors", link: "/vendors" },
      ])
    );
    dispatch(fetchVendor());
  }, []);

  const companyOptionsList = useCallback(
    () =>
      map(get(data1, "suppliers"), (value, index) => (
        <option value={value.id} key={index}>
          {value.name}
        </option>
      )),
    [data1]
  );
  // something wrong first time
  if (error1) {
    return <div>Error</div>;
  }
  // unconditional error occur
  if (!data1) {
    return null;
  }
  /**
   * @description open close dialogs
   */
  const addCompanyDialog = () => setIsCompanyDialog(!isCompanyDialog);
  const addContactDialog = () => setIsContactDialog(!isContactDialog);

  const editCompanyDialog = (companyId) => {
    debugger;
    setCompanyUpdate(companyId)
  };
  const editContactDialog = (contactId) => {
    setContactUpdate(contactId)
  };
  /**
   *
   * @param {event} sytenthic event
   * @param {formData} form fields list
   * @description creat new company
   */

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
    dispatch(addVendor({ form: formCompose, successFn: addCompanyDialog }));
  };

  /**
   *
   * @param {event} sytenthic event
   * @param {formData} form fields list
   * @description create new vendor
   */

  const createContact = (event, formData) =>
    dispatch(
      addVendorContact({
        form: { ...formData, position: "" },
        successFn: addContactDialog,
      })
    );

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={addCompanyDialog}>
              Add Company
            </Button>
            <Button color="link" onClick={addContactDialog}>
              Add Contact
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <VendorListTable
                suppliers={supplier}
                editCompany={editCompanyDialog}
                editContact={editContactDialog}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isCompanyDialog && (
        <Modalcall
          show={isCompanyDialog}
          handlerClose={addCompanyDialog}
          title="Add Company"
        >
          <AddCompany companySubmit={companySubmit} close={addCompanyDialog} />
        </Modalcall>
      )}
      {!!isContactDialog && (
        <Modalcall
          show={isContactDialog}
          handlerClose={addContactDialog}
          title="Add Contact"
        >
          <AddContact
            companyContact={createContact}
            close={addContactDialog}
            optionsList={companyOptionsList()}
          />
        </Modalcall>
      )}
    </React.Fragment>
  );
}
