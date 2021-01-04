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
import AddCompany from "./AddCompany";
import AddContact from "./AddContact";
import VendorListTable from "./VendorList";

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
  /**
   *
   */
  const companyOptionsList = useCallback(
    () =>
      map(get(data1, "suppliers"), (value, index) => (
        <option value={value.id} key={index}>
          {value.name}
        </option>
      )),
    [data1]
  );
  if (loading1) {
    return <div>Loading...</div>;
  }
  // somthing wrong first time
  if (error1) {
    return <div>Error</div>;
  }
  // unconditional error occur
  if (!data1) {
    return null;
  }
  /**
   * @description open cloase dialogs
   */
  const addCompanyDailog = () => setIsCompanyDialog(!isCompanyDialog);
  const addContactDailog = () => setIsContactDialog(!isContactDialog);

  const editCompanyDailog = (copanyId) => {
    setCompanyUpdate(copanyId)
  };
  const editContactDailog = (contactId) => {
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
    dispatch(addVendor({ form: formCompose, successFn: addCompanyDailog }));
  };

  /**
   *
   * @param {event} sytenthic event
   * @param {formData} form fields list
   * @description creat new vendor
   */

  const createContact = (event, formData) =>
    dispatch(
      addVendorContact({
        form: { ...formData, position: "" },
        successFn: addContactDailog,
      })
    );

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={addCompanyDailog}>
              Add Company
            </Button>
            <Button color="link" onClick={addContactDailog}>
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
                editCompany={editCompanyDailog}
                editContact={editContactDailog}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isCompanyDialog && (
        <Modalcall
          show={isCompanyDialog}
          handlerClose={addCompanyDailog}
          title="Add Company"
        >
          <AddCompany companySubmit={companySubmit} close={addCompanyDailog} />
        </Modalcall>
      )}
      {!!isContactDialog && (
        <Modalcall
          show={isContactDialog}
          handlerClose={addContactDailog}
          title="Add Contact"
        >
          <AddContact
            companyContact={createContact}
            close={addContactDailog}
            optionsList={companyOptionsList()}
            
          />
        </Modalcall>
      )}
    </Fragment>
  );
}
