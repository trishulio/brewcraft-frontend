const BaseUrl = "/api";
const BaseUrlV1 = "/api/v1";

const SUPPLIERS = `${BaseUrl}/suppliers`;
const FACILITIES = `${BaseUrlV1}/facilities`;
const EQUIPMENT = `${BaseUrlV1}/facilities/equipment`;
const MATERIALS = `${BaseUrlV1}/materials`;
const INVOICES = (purchaseOrderId)=> purchaseOrderId ? `${BaseUrlV1}/purchases/${purchaseOrderId}/invoices` : `${BaseUrlV1}/purchases/invoices`;


export {SUPPLIERS, FACILITIES, EQUIPMENT,MATERIALS,INVOICES}