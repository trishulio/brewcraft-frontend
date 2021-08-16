// import React, { useCallback } from "react";
// import { map } from "lodash";
// import DataTable from '../../../component/Tables/tables-mui-datatable';

// export default function CustomersTable({data, editCustomer, deleteCustomer, addCustomer, refreshTable}) {

//   const columns = [{
//     label: "Product ID",
//     name: "id",
//     options: {
//       filter: true,
//       sort: true
//     }
//   }, {
//     label: "Name",
//     name: "username",
//     options: {
//       filter: true,
//       sort: true
//     }
//   }, {
//     label: "Email",
//     name: "email",
//     options: {
//       filter: true,
//       sort: true
//     }
//   }, {
//     label: "Phone Number",
//     name: "phone_number",
//     options: {
//       filter: true,
//       sort: false,
//       display: false
//     }
//   }, {
//     label: "Contact Owner",
//     name: "Contact_owner",
//     options: {
//       filter: false,
//       sort: false
//     }
//   }, {
//     label: "Associated Company",
//     name: "associated_company",
//     options: {
//       filter: false,
//       sort: false
//     }
//   }, {
//     label: "Last Acitivity",
//     name: "last_acitivity",
//     options: {
//       filter: true,
//       sort: true
//     }
//   }, {
//     label: "Lead Status",
//     name: "lead_status",
//     options: {
//       filter: true,
//       sort: true
//     }
//   }, {
//     label: "Created Date (GMT+5:30)",
//     name: "create_date",
//     options: {
//       filter: true,
//       sort: true
//     }
//   }];

//   const onDelete=(rowsSelected)=>{
//     const idsToDelete = rowsSelected.data.map(d => data[d.dataIndex].id); // array of all ids to to be deleted
//     idsToDelete.map((id)=>deleteCustomer(id));
//   }

//   const onEdit=(rowsSelected)=>{
//     const idToEdit = data[rowsSelected?.data[0].dataIndex].id;
//     editCustomer(idToEdit);
//   }

//   const rowEvent = useCallback(() => {
//     return map(data, (row) => {
//       return {
//         ...row
//       };
//     });

//   }, [data]);

//   return(
//       <DataTable
//         columns={columns}
//         data={rowEvent()}
//         tableName="Customer"
//         editAction={onEdit}
//         deleteAction={onDelete}
//         addAction={addCustomer}
//         refreshAction={refreshTable}
//       />
//   )
// }

