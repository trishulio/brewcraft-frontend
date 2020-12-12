import { get,map } from "lodash";
import React, { useEffect, Fragment, useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { fetchVendor } from "../../store/Vendor/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Modalcall } from "../../component/Common/Modalcall";
import { fetchCompany, saveCompany } from "../../store/Company/actions";
import { createVendorAction } from "../../store/Vendor/actions";
import AddCompany from "./AddCompany";
import AddContact from "./AddContact";

export default function VendorList() {
  const [isCompanyDialog, setIsCompanyDialog] = useState(false);
  const [isContactDialog, setIsContactDialog] = useState(false);

  // dispatch action
  const { data, loading, error } = useSelector((state) => {
    return get(state, "Vendor");
  });

  const dispatch = useDispatch();
  //   table header defination
  const tabledata = [
    {
      label: "Company Name",
      field: "cname",
      sort: "asc",
      width: 150,
    },
    {
      label: "Contact",
      field: "contact",
      sort: "asc",
      width: 270,
    },
    {
      label: "Phone",
      field: "phone",
      sort: "asc",
      width: 200,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200,
    },
  ];

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Vendors", [
        { title: "List all vendors", link: "/vendors" },
      ])
    );
    dispatch(fetchVendor());
    dispatch(fetchCompany());
  }, []);

  const rowEvent = useCallback(() =>{
    return map(data, (row)=>{
      return {...row,
        cname:<span onClick={()=>editCompanyDailog(row.c_id)} >{row.cname}</span>,
        contact:<span onClick={()=>editContactDailog(row.id)} >{row.contact}</span>
      }
    })
    
  },[data])
  // if (loading) {
  //     return <div>Loading...</div>;
  //   }

  // somthing wrong first time
  if (error) {
    return <div>Error</div>;
  }

  // unconditional error occur
  if (!data) {
    return null;
  }
/**
 * @description open cloase dialogs
 */
  const addCompanyDailog = () => setIsCompanyDialog(!isCompanyDialog);
  const addContactDailog = () => setIsContactDialog(!isContactDialog);

  const editCompanyDailog = (copanyId) =>{
    console.log(copanyId);
  }
  const editContactDailog = (contactId) =>{
    console.log(contactId);
  }   
  /**
   *
   * @param {event} sytenthic event
   * @param {formData} form fields list
   * @description creat new company
   */

  const companySubmit = (event, formData) =>
    dispatch(saveCompany({ form: formData, successFn: addCompanyDailog }));

  /**
   *
   * @param {event} sytenthic event
   * @param {formData} form fields list
   * @description creat new vendor
   */
  const createVendor = (event, formData) =>
    dispatch(
      createVendorAction({ form: formData, successFn: addContactDailog })
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
              <MDBDataTable
                responsive
                bordered
                data={{ 
                   columns: tabledata, rows:rowEvent(),
              }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modalcall
        show={isCompanyDialog}
        handlerClose={addCompanyDailog}
        title="Add Company"
      >
        <AddCompany
          companySubmit={companySubmit}
          close={addCompanyDailog}
        />
      </Modalcall>
      <Modalcall
        show={isContactDialog}
        handlerClose={addContactDailog}
        title="Add Contact"
      >
        <AddContact
          companyContact={createVendor}
          close={addContactDailog}
        />
      </Modalcall>
    </Fragment>
  );
}
