import React, {useCallback, useEffect, useMemo} from 'react';
import {ModalContainer} from '../../component/Modal/Modal';
import {batch, useDispatch, useSelector} from "react-redux";
import {openModal} from "../../store/modal/modal-actions";
import {setBreadcrumbItems} from "../../store/Breadcrumb/actions";
import {getSuppliersData} from "../../store/suppliers/suppliers-actions";
import Select from "react-select";
import {Card, CardBody} from "reactstrap";
import {MDBDataTable} from "mdbreact";
import {CreateModalContainer} from "./components/CreateModal";
import {DeleteModalContainer} from "./components/DeleteModal";
import {UpdateModalContainer} from "./components/UpdateModal";

export const Suppliers = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.suppliers);

  const vendors = useMemo(() => tableData.rows.map(row => ({label: row.name, value: row.id, ...row})), [tableData])


  const handleCreateOpen = useCallback(() => {
    dispatch(openModal(<CreateModalContainer/>));
  }, []);

  const handleDeleteOpen = useCallback(() => {
    dispatch(openModal(<DeleteModalContainer vendors={vendors}/>));
  }, [vendors, dispatch]);

  const handleUpdateOpen = useCallback(() => {
    dispatch(openModal(<UpdateModalContainer vendors={vendors}/>))
  }, [vendors, dispatch]);

  useEffect(() => {
    batch(() => {
      dispatch(setBreadcrumbItems("Suppliers", [
        {title: "Dashboard", link: "#"},
        {title: "Suppliers", link: "#"}
      ]))
      dispatch(getSuppliersData());
    })
  }, []);

  const actions = useMemo(() => [
    {value: 'create', label: 'Create', onSelect: handleCreateOpen},
    {value: 'update', label: 'Update', onSelect: handleUpdateOpen},
    {value: 'delete', label: 'Delete', onSelect: handleDeleteOpen},
  ], [handleDeleteOpen, handleCreateOpen]);

  const handleSelectChange = e => {
    e.onSelect();
  }
  const data = tableData;

  return <>
    <Select
      options={actions}
      onChange={handleSelectChange}
      placeholder="Select Action..."
      className="ml-auto col-6"
    />
    <Card style={{marginTop: 10}}>
      <CardBody>
        <MDBDataTable
          responsive
          bordered
          data={data}
        />
      </CardBody>
    </Card>
    <ModalContainer/>
  </>;
}
