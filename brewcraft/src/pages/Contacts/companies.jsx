import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import {
  fetchCompanies,
  fetchCompany,
  createCompany,
  updateCompany,
  deleteCompany
} from "../../store/Companies/actions";
import { Modal } from "../../component/Common/modal";
import CompanyModal from "./components/company-modal";
import CompaniesTable from "./components/companies-table";

export default function VendorList() {
  const [isOpenCompanyDialog, setIsOpenCompanyDialog] = useState(false);
  const [company, setCompany] = useState(null);
  const { companies } = useSelector(
    (state) => {
      return state.Companies
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Companies", [
        { title: "Suppliers", link: "#" },
        { title: "Contacts", link: "#" }
      ]));
    dispatch(fetchCompanies());
  }, []);

  const onAddCompany = () => {
    setCompany(null);
    setIsOpenCompanyDialog(true);
  };

  const onEditCompany = (companyId) => {
    dispatch(
      fetchCompany({
        id: companyId,
        success: company => {
          setCompany(company);
          setIsOpenCompanyDialog(true);
        }
      }));
  };

  const onDeleteCompany = (companyId) => {
    dispatch(
      deleteCompany({
        id: companyId,
        success: () => {
          dispatch(fetchCompanies());
        }
      })
    );
  };

  const onRefreshCompanyTable=()=>{
    dispatch(
      fetchCompanies()
    );
  }
  const onCompanyDialogClose = (isSave, data) => {
    if (isSave) {
      if (company) {
        // update company
        dispatch(
          updateCompany({
            ...company,
            ...data,
            success: () => {
              dispatch(fetchCompanies());
              setIsOpenCompanyDialog(false);
            }
          }));
      } else {
        // create company
        dispatch(
          createCompany({
            ...data,
            success: () => {
              dispatch(fetchCompanies());
              setIsOpenCompanyDialog(false);
            }
          }));
      }
    } else {
      setIsOpenCompanyDialog(false);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <CompaniesTable
              data={companies}
              editCompany={onEditCompany}
              deleteCompany={onDeleteCompany}
              addCompany={onAddCompany}
              refreshTable={onRefreshCompanyTable}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpenCompanyDialog && (
        <Modal
        show={isOpenCompanyDialog}
        close={onCompanyDialogClose}
        title={company ? "Edit Company" : "Add Company"}
        >
          <CompanyModal
            company={company}
            close={onCompanyDialogClose}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}
