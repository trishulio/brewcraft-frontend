import React, {useCallback, useEffect, useMemo} from 'react';
import {Modal} from '../../component/Modal/modal';
import {batch, useDispatch, useSelector} from "react-redux";
import {openModal} from "../../store/Modal/actions";
import {setBreadcrumbItems} from "../../store/Breadcrumb/actions";
import {getSuppliersData, startGetSuppliersWatcher} from "../../store/Suppliers/actions";
import Select from "react-select";
import {Card, CardBody} from "reactstrap";
import {MDBDataTable} from "mdbreact";
import {CreateModal} from "./components/createModal";
import {DeleteModal} from "./components/deleteModal";
import {UpdateModal} from "./components/updateModal";

export const Suppliers = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.Suppliers);

  const vendors = useMemo(() => tableData.rows.map(row => ({label: row.name, value: row.id, ...row})), [tableData])


  const handleCreateOpen = useCallback(() => {
    dispatch(openModal(<CreateModal/>));
  }, []);

  const handleDeleteOpen = useCallback(() => {
    dispatch(openModal(<DeleteModal vendors={vendors}/>));
  }, [vendors, dispatch]);

  const handleUpdateOpen = useCallback(() => {
    dispatch(openModal(<UpdateModal vendors={vendors}/>))
  }, [vendors, dispatch]);

  useEffect(() => {
    batch(() => {
      dispatch(setBreadcrumbItems("Suppliers", [
        {title: "Dashboard", link: "#"},
        {title: "Suppliers", link: "#"}
      ]))
    })
    dispatch(startGetSuppliersWatcher())
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
    <Modal/>
  </>;
}
